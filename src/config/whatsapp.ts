/**
 * ============================================================================
 * CONFIGURACIÓN DE INTEGRACIÓN CON WHATSAPP - CAROLINE MAGIC
 * ============================================================================
 *
 * NÚMERO OFICIAL: +56 9 5623 8360 (número directo, sin chatbot).
 *
 * La integración con el bot de WhatsApp/n8n queda en STAND-BY hasta cerrar
 * esa negociación. Mientras tanto, todos los botones de WhatsApp del sitio
 * apuntan directo a este número.
 *
 * Se puede sobrescribir con la variable de entorno NEXT_PUBLIC_WHATSAPP_NUMBER
 * (configúrala en Vercel → Settings → Environment Variables, o en .env.local
 * para desarrollo local) — por ejemplo, cuando el bot esté aprobado.
 *
 * Formato requerido: código de país + área + número local, solo dígitos.
 * Sin '+', espacios ni guiones.
 */

const DEFAULT_WHATSAPP_NUMBER = "56956238360";

const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const WHATSAPP_NUMBER: string = (
  rawNumber || DEFAULT_WHATSAPP_NUMBER
).replace(/[^0-9]/g, "");

/**
 * Mensajes predefinidos para los llamados a la acción (CTAs).
 * Cada botón del sitio usa un mensaje distinto según dónde vive.
 */
export const WHATSAPP_MESSAGES = {
  default: "Hola, me gustaría hacer una consulta con Caroline Magic.",
  booking:
    "Hola, vi la página de Caroline Magic y quiero agendar mi lectura.",
  carolineDirect:
    "Hola, quiero atención directa y confidencial con Caroline (Atelier Privé / mentoría).",
  academiaAviso:
    "Hola, quiero que me avisen cuando se abran las próximas formaciones de la Academia.",
  encuentrosAviso:
    "Hola, quiero que me avisen cuando se abran los próximos Encuentros Grupales.",
  ritualPersonalizado:
    "Hola, quiero diseñar un ritual o ceremonia personalizada con Caroline.",
  orientacionSesion:
    "Hola, no sé qué sesión de Caroline Magic elegir. Quiero contarles qué estoy viviendo para que me orienten.",
  service: (serviceTitle: string) =>
    `Hola, quiero ver precios y agendar la lectura: ${serviceTitle}`,
  sesion: (nombreSesion: string) =>
    `Hola, quiero reservar la sesión: ${nombreSesion}`,
  encuentro: (nombreEncuentro: string) =>
    `Hola, quiero reservar un cupo en el encuentro: ${nombreEncuentro}`,
  product: (productName: string) =>
    `Hola, me interesa consultar disponibilidad para adquirir: ${productName}`,
};

/**
 * Generador seguro de enlaces universales de WhatsApp (wa.me)
 */
export function getWhatsAppUrl(
  message: string = WHATSAPP_MESSAGES.default,
  phoneNumber: string = WHATSAPP_NUMBER,
): string {
  const sanitizedNumber = (phoneNumber || WHATSAPP_NUMBER).replace(
    /[^0-9]/g,
    "",
  );
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitizedNumber}?text=${encodedText}`;
}
