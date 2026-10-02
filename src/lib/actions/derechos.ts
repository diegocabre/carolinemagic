"use server";

import { crearRegistro, eliminarRegistro } from "@/lib/derechos/registro";
import { enviarSolicitud } from "@/lib/derechos/email";
import { solicitudSchema } from "@/lib/derechos/schema";
import { clientIp, isSameOrigin } from "@/lib/security/origin";
import { minutosParaReintentar, registrarIntento } from "@/lib/security/rateLimit";
import { headers } from "next/headers";

export interface DerechosFormState {
  ok?: boolean;
  id?: string;
  error?: string;
  errores?: Partial<Record<string, string>>;
  /** Valores enviados, para no perderlos si hay errores (sin casillas). */
  valores?: Partial<Record<string, string>>;
}

const CAMPOS = [
  "tipo",
  "relacion",
  "nombre",
  "email",
  "telefono",
  "detalle",
  "aceptaPolitica",
  "declaraVeracidad",
  "sitioWeb",
] as const;

const ERROR_GENERAL =
  "No pudimos recibir tu solicitud en este momento. Inténtalo más tarde o escríbenos al correo de privacidad indicado en la Política de Privacidad.";

export async function enviarSolicitudDerechosAction(
  _prev: DerechosFormState,
  formData: FormData,
): Promise<DerechosFormState> {
  const h = await headers();
  if (!isSameOrigin(h)) {
    return { error: "Solicitud no válida. Recarga la página e inténtalo de nuevo." };
  }

  // Solo se leen los campos esperados; cualquier otro se ignora.
  const entrada: Record<string, string> = {};
  for (const campo of CAMPOS) {
    const valor = formData.get(campo);
    if (typeof valor === "string") entrada[campo] = valor;
  }

  const limite = await registrarIntento("derechos", clientIp(h));
  if (limite.estado === "no_disponible") {
    console.error("[derechos] Formulario rechazado: rate limit no disponible (revisa UPSTASH_REDIS_REST_URL/TOKEN).");
    return { error: ERROR_GENERAL };
  }
  if (limite.estado === "bloqueado") {
    return {
      error: `Recibimos varias solicitudes desde tu conexión. Inténtalo de nuevo en ${minutosParaReintentar(limite.reintentarEnSegundos)} min.`,
    };
  }

  const resultado = solicitudSchema.safeParse(entrada);
  if (!resultado.success) {
    const errores: Partial<Record<string, string>> = {};
    for (const issue of resultado.error.issues) {
      const campo = String(issue.path[0] ?? "general");
      errores[campo] ??= issue.message;
    }
    // Un bot que completó el campo trampa recibe una respuesta genérica.
    if (errores.sitioWeb) return { error: "No pudimos procesar el formulario." };
    const { tipo, relacion, nombre, email, telefono, detalle } = entrada;
    return {
      error: "Revisa los campos marcados.",
      errores,
      valores: { tipo, relacion, nombre, email, telefono, detalle },
    };
  }

  let registroId: string | null = null;
  try {
    const registro = await crearRegistro(resultado.data.tipo);
    registroId = registro.id;
    const envio = await enviarSolicitud(resultado.data, registro);
    if (envio === "error" || envio === "no_configurado") {
      await eliminarRegistro(registro.id).catch(() => undefined);
      return { error: ERROR_GENERAL };
    }
    return { ok: true, id: registro.id };
  } catch (error) {
    console.error(`[derechos] Error procesando la solicitud ${registroId ?? "(sin id)"}:`, error);
    if (registroId) await eliminarRegistro(registroId).catch(() => undefined);
    return { error: ERROR_GENERAL };
  }
}
