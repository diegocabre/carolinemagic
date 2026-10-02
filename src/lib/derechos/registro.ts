import { PLAZO_PRORROGA_DIAS, PLAZO_RESPUESTA_DIAS } from "@/config/legal";
import { kvDelete, kvGet, kvKeys, kvSet } from "@/lib/security/store";
import crypto from "node:crypto";
import type { EstadoSolicitud, TipoSolicitud } from "./schema";

/**
 * Registro mínimo de solicitudes de derechos, para acreditar plazos de
 * respuesta. Por minimización NO guarda nombre, correo ni detalle: esos datos
 * viven solo en el correo enviado al responsable. Se guarda en el mismo
 * Upstash Redis que ya usa el rate limit (no se agrega otra base de datos).
 *
 * Conservación: 3 años (TTL). Ver docs/cumplimiento/POLITICA-RETENCION.md.
 */

const PREFIJO = "derechos:sol:";
const TTL_SEGUNDOS = 60 * 60 * 24 * 365 * 3;
const DIA_MS = 24 * 60 * 60 * 1000;

export interface RegistroSolicitud {
  id: string;
  tipo: TipoSolicitud;
  estado: EstadoSolicitud;
  recibidaEn: string;
  venceEn: string;
  actualizadaEn: string;
}

function nuevoId(fecha: Date): string {
  const yyyymmdd = fecha.toISOString().slice(0, 10).replaceAll("-", "");
  return `SOL-${yyyymmdd}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function crearRegistro(tipo: TipoSolicitud): Promise<RegistroSolicitud> {
  const ahora = new Date();
  const registro: RegistroSolicitud = {
    id: nuevoId(ahora),
    tipo,
    estado: "recibida",
    recibidaEn: ahora.toISOString(),
    venceEn: new Date(ahora.getTime() + PLAZO_RESPUESTA_DIAS * DIA_MS).toISOString(),
    actualizadaEn: ahora.toISOString(),
  };
  await kvSet(`${PREFIJO}${registro.id}`, JSON.stringify(registro), TTL_SEGUNDOS);
  return registro;
}

export async function eliminarRegistro(id: string): Promise<void> {
  await kvDelete(`${PREFIJO}${id}`);
}

export async function listarRegistros(): Promise<RegistroSolicitud[]> {
  const claves = await kvKeys(PREFIJO);
  const registros = await Promise.all(
    claves.map(async (clave) => {
      const valor = await kvGet(clave);
      if (!valor) return null;
      try {
        return JSON.parse(valor) as RegistroSolicitud;
      } catch {
        return null;
      }
    }),
  );
  return registros
    .filter((r): r is RegistroSolicitud => r !== null)
    .sort((a, b) => b.recibidaEn.localeCompare(a.recibidaEn));
}

export async function actualizarEstado(
  id: string,
  estado: EstadoSolicitud,
): Promise<RegistroSolicitud | null> {
  const valor = await kvGet(`${PREFIJO}${id}`);
  if (!valor) return null;
  const registro = JSON.parse(valor) as RegistroSolicitud;
  const actualizado: RegistroSolicitud = {
    ...registro,
    estado,
    actualizadaEn: new Date().toISOString(),
    // Una prórroga extiende el vencimiento una sola vez.
    venceEn:
      estado === "prorrogada" && registro.estado !== "prorrogada"
        ? new Date(new Date(registro.venceEn).getTime() + PLAZO_PRORROGA_DIAS * DIA_MS).toISOString()
        : registro.venceEn,
  };
  await kvSet(`${PREFIJO}${id}`, JSON.stringify(actualizado), TTL_SEGUNDOS);
  return actualizado;
}
