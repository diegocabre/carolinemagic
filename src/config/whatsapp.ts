/**
 * ============================================================================
 * CONFIGURACIÓN DE INTEGRACIÓN CON WHATSAPP - CAROLINE MAGIC
 * ============================================================================
 * 
 * NOTA PARA PRODUCCIÓN:
 * Reemplaza el valor DEFAULT_WHATSAPP_NUMBER a continuación con el número oficial
 * de WhatsApp de Caroline Magic cuando esté listo para el despliegue final.
 * 
 * Formato requerido:
 * - Código de país + código de área + número local, solo dígitos numéricos.
 * - NO incluir signo '+' ni espacios ni guiones.
 * - Número de prueba actual (Meta Test Number): "15556737463"
 * 
 * También se puede sobreescribir sin tocar el código mediante la variable de entorno:
 * NEXT_PUBLIC_WHATSAPP_NUMBER en Vercel o en el archivo .env.local.
 */

export const DEFAULT_WHATSAPP_NUMBER = "15556737463";

export const WHATSAPP_NUMBER: string = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER
).replace(/[^0-9]/g, "");

/**
 * Mensajes predefinidos para los llamados a la acción (CTAs)
 */
export const WHATSAPP_MESSAGES = {
  // Saludo neutro inicial para activar el bot de n8n y su menú de opciones
  default: "Hola",

  // Consulta general de precios y agendamiento
  booking: "Hola, quiero ver precios y agendar",

  // Atención directa y personalizada con Caroline
  carolineDirect: "Hola, necesito atención con Caroline",

  // Consulta contextual por servicio específico de tarot / sesión
  service: (serviceTitle: string) =>
    `Hola, quiero ver precios y agendar la lectura: ${serviceTitle}`,

  // Consulta contextual por obra de arte o talismán
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
  phoneNumber: string = WHATSAPP_NUMBER
): string {
  const sanitizedNumber = (phoneNumber || WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitizedNumber}?text=${encodedText}`;
}
