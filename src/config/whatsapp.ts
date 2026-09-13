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
 * Formato requerido: código de país + área + número local, solo dígitos.
 * Sin '+', espacios ni guiones. Ej: "56912345678"
 *
 * Si la variable no está seteada, el sitio usa el número de prueba de Meta
 * como fallback SOLO para que el desarrollo no se rompa — y avisa por consola
 * cada vez que esto pasa, para que sea imposible no darse cuenta.
 */

const TEST_WHATSAPP_NUMBER = "15556737463"; // Meta Test Number — nunca debe llegar a producción

const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const isUsingTestNumber = !rawNumber;

export const WHATSAPP_NUMBER: string = (
  rawNumber || TEST_WHATSAPP_NUMBER
).replace(/[^0-9]/g, "");

// Aviso imposible de ignorar: aparece en la consola del navegador (F12) y en logs de build/servidor.
if (isUsingTestNumber) {
  const warning =
    "[Caroline Magic] ⚠️ NEXT_PUBLIC_WHATSAPP_NUMBER no está configurada. " +
    "Usando el número de PRUEBA de Meta — los mensajes de WhatsApp NO le llegarán a Caroline. " +
    "Configúrala en Vercel (Settings → Environment Variables) antes de publicar.";

  console.warn(warning);

  // En build de producción, además lanza error y detiene el deploy —
  // así es imposible publicar por accidente con el número de test puesto.
  if (process.env.NODE_ENV === "production") {
    throw new Error(warning);
  }
}

/**
 * Mensajes predefinidos para los llamados a la acción (CTAs)
 */
export const WHATSAPP_MESSAGES = {
  // Saludo neutro inicial para activar el bot de n8n y su menú de opciones
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
 * Sanitiza el número y codifica en URI el mensaje de texto.
 * Ejemplo para default: https://wa.me/15556737463?text=Hola
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
