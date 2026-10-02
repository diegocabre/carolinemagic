import {
  LEGAL,
  PLAZO_RESPUESTA_DIAS,
  valorLegal,
} from "@/config/legal";
import { isProduction } from "@/lib/security/store";
import { Resend } from "resend";
import type { RegistroSolicitud } from "./registro";
import { RELACIONES, TIPOS_SOLICITUD, type SolicitudDerechos } from "./schema";

/**
 * Envío de correos del formulario de derechos con Resend.
 * - Al responsable: la solicitud completa.
 * - Al solicitante: acuse de recibo con número y plazo (sin repetir el detalle).
 *
 * En desarrollo sin RESEND_API_KEY no se envía nada y se registra solo el
 * número de solicitud (nunca datos personales) en la consola.
 */

export type ResultadoEnvio = "enviado" | "simulado" | "no_configurado" | "error";

function fechaCl(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  });
}

function configuracion() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEGAL_EMAIL_FROM;
  const destino = valorLegal(LEGAL.emailPrivacidad);
  return apiKey && from && destino ? { apiKey, from, destino } : null;
}

export async function enviarSolicitud(
  solicitud: SolicitudDerechos,
  registro: RegistroSolicitud,
): Promise<ResultadoEnvio> {
  const config = configuracion();
  if (!config) {
    if (isProduction()) {
      console.error(
        "[derechos] Falta RESEND_API_KEY, LEGAL_EMAIL_FROM o LEGAL.emailPrivacidad: no se puede enviar la solicitud.",
      );
      return "no_configurado";
    }
    console.warn(`[derechos] (dev) Correo simulado para la solicitud ${registro.id}.`);
    return "simulado";
  }

  const resend = new Resend(config.apiKey);

  const cuerpoResponsable = [
    `Nueva solicitud de derechos: ${registro.id}`,
    "",
    `Tipo: ${TIPOS_SOLICITUD[solicitud.tipo]}`,
    `Relación: ${RELACIONES[solicitud.relacion]}`,
    `Nombre: ${solicitud.nombre}`,
    `Correo: ${solicitud.email}`,
    `Teléfono: ${solicitud.telefono ?? "(no indicado)"}`,
    `Recibida: ${fechaCl(registro.recibidaEn)}`,
    `Responder a más tardar: ${fechaCl(registro.venceEn)} (${PLAZO_RESPUESTA_DIAS} días corridos)`,
    "",
    "Detalle:",
    solicitud.detalle,
    "",
    "---",
    "Antes de entregar o borrar datos, verifica la identidad de la persona (ver docs/cumplimiento).",
    "Actualiza el estado de la solicitud en /admin.",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: config.from,
      to: config.destino,
      replyTo: solicitud.email,
      subject: `[Derechos de datos] ${registro.id} · ${TIPOS_SOLICITUD[solicitud.tipo]}`,
      text: cuerpoResponsable,
    });
    if (error) {
      console.error(`[derechos] Resend rechazó el envío de ${registro.id}:`, error.name);
      return "error";
    }
  } catch (error) {
    console.error(`[derechos] Error enviando ${registro.id}:`, error);
    return "error";
  }

  // Acuse de recibo: si falla, la solicitud igual quedó registrada y enviada.
  const cuerpoAcuse = [
    `Hola ${solicitud.nombre}:`,
    "",
    `Recibimos tu solicitud sobre tus datos personales. Tu número de solicitud es ${registro.id}.`,
    "",
    `Tipo: ${TIPOS_SOLICITUD[solicitud.tipo]}`,
    `Fecha de recepción: ${fechaCl(registro.recibidaEn)}`,
    `Te responderemos a más tardar el ${fechaCl(registro.venceEn)}.`,
    "",
    "Es posible que te pidamos información adicional para confirmar tu identidad.",
    "Si no hiciste esta solicitud, responde a este correo para avisarnos.",
    "",
    `${LEGAL.nombreComercial}`,
    `${LEGAL.sitioUrl}/privacidad`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: config.from,
      to: solicitud.email,
      replyTo: config.destino,
      subject: `Recibimos tu solicitud ${registro.id} · ${LEGAL.nombreComercial}`,
      text: cuerpoAcuse,
    });
  } catch (error) {
    console.error(`[derechos] No se pudo enviar el acuse de ${registro.id}:`, error);
  }

  return "enviado";
}
