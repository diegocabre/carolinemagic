/**
 * ============================================================================
 * CONFIGURACIÓN DE INTEGRACIÓN CON WHATSAPP - CAROLINE MAGIC
 * ============================================================================
 *
 * NÚMERO OFICIAL:
 * Se obtiene desde la variable de entorno NEXT_PUBLIC_WHATSAPP_NUMBER
 * (configúrala en Vercel → Settings → Environment Variables, o en .env.local
 * para desarrollo local).
 *
 * ESTADO ACTUAL (recordatorio): seguimos con el número de PRUEBA de Meta
 * mientras se aprueba el bot de WhatsApp/n8n. Cuando el bot quede activo,
 * reemplaza NEXT_PUBLIC_WHATSAPP_NUMBER por el número real en Vercel.
 *
 * Formato requerido: código de país + área + número local, solo dígitos.
 * Sin '+', espacios ni guiones. Ej: "56912345678"
 */

const TEST_WHATSAPP_NUMBER = "15556737463"; // Meta Test Number

const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
export const IS_USING_TEST_WHATSAPP_NUMBER = !rawNumber;

export const WHATSAPP_NUMBER: string = (
  rawNumber || TEST_WHATSAPP_NUMBER
).replace(/[^0-9]/g, "");

// Aviso en consola (build y navegador) — visible pero ya NO bloquea el deploy.
if (IS_USING_TEST_WHATSAPP_NUMBER) {
  console.warn(
    "[Caroline Magic] ⚠️ NEXT_PUBLIC_WHATSAPP_NUMBER no está configurada. " +
      "Usando el número de PRUEBA de Meta a propósito mientras se aprueba el bot de WhatsApp. " +
      "Recuerda reemplazarlo en Vercel cuando el bot esté activo.",
  );
}

/**
 * Mensajes predefinidos para los llamados a la acción (CTAs)
 */
export const WHATSAPP_MESSAGES = {
  default: "Hola",
  booking: "Hola, quiero ver precios y agendar",
  carolineDirect: "Hola, necesito atención con Caroline",
  service: (serviceTitle: string) =>
    `Hola, quiero ver precios y agendar la lectura: ${serviceTitle}`,
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
