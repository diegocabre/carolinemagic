import { PLAZO_PRORROGA_DIAS, PLAZO_RESPUESTA_DIAS } from "@/config/legal";
import { kvGet, kvKeys, kvSet } from "@/lib/security/store";
import crypto from "node:crypto";
import type { CanalSolicitud, EstadoSolicitud, TipoSolicitud } from "./schema";

/**
 * Registro mínimo de solicitudes de derechos, para acreditar plazos de
 * respuesta. Las solicitudes llegan por WhatsApp o correo y Caroline las
 * registra desde /admin. Por minimización NO guarda nombre, correo ni
 * detalle: esos datos quedan solo en la conversación original (se busca por
 * fecha y canal). Se guarda en el mismo Upstash Redis que usa el rate limit.
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
  canal: CanalSolicitud;
  recibidaEn: string;
  venceEn: string;
  actualizadaEn: string;
}

function nuevoId(fecha: Date): string {
  const yyyymmdd = fecha.toISOString().slice(0, 10).replaceAll("-", "");
  return `SOL-${yyyymmdd}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

/** El plazo corre desde que la solicitud se RECIBIÓ, no desde que se registra. */
export async function crearRegistro(
  tipo: TipoSolicitud,
  canal: CanalSolicitud,
  recibidaEn: Date,
): Promise<RegistroSolicitud> {
  const ahora = new Date();
  const registro: RegistroSolicitud = {
    id: nuevoId(recibidaEn),
    tipo,
    canal,
    estado: "recibida",
    recibidaEn: recibidaEn.toISOString(),
    venceEn: new Date(recibidaEn.getTime() + PLAZO_RESPUESTA_DIAS * DIA_MS).toISOString(),
    actualizadaEn: ahora.toISOString(),
  };
  await kvSet(`${PREFIJO}${registro.id}`, JSON.stringify(registro), TTL_SEGUNDOS);
  return registro;
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
