/**
 * Content-Security-Policy del sitio, ajustada a lo que realmente carga
 * (ver INVENTARIO-DATOS.md):
 *
 * - Scripts: solo los del propio sitio, autorizados por nonce por petición
 *   + 'strict-dynamic' (los scripts que carga un script confiable heredan la
 *   confianza: así funciona Microsoft Clarity, que se inyecta solo tras
 *   consentimiento). Sin 'unsafe-inline' ni 'unsafe-eval' en producción.
 *   Los hosts de Clarity quedan como respaldo para navegadores sin CSP3.
 * - Estilos: 'unsafe-inline' JUSTIFICADO. framer-motion y React escriben
 *   atributos `style="..."` (animaciones, transformaciones 3D de la carta),
 *   y los nonces no cubren atributos de estilo. El riesgo residual (inyección
 *   de CSS) es bajo frente al de scripts, que sí quedan bloqueados.
 * - Imágenes: propias, data:/blob: (vista previa en el admin), Vercel Blob
 *   (sincronicidad del día) y los píxeles de Clarity.
 * - Fuentes: propias (next/font las descarga en el build; Google no recibe
 *   peticiones del visitante).
 * - connect-src: Vercel Blob API (subida desde el admin) y Clarity.
 * - Sin iframes propios ni de terceros; nadie puede enmarcar el sitio.
 */

const BLOB_PUBLIC = "https://*.public.blob.vercel-storage.com";
const CLARITY = ["https://www.clarity.ms", "https://*.clarity.ms", "https://c.bing.com"];

export function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";
  // Barra de comentarios de Vercel: solo en despliegues de preview.
  const isPreview = process.env.VERCEL_ENV === "preview";
  const vercelLive = isPreview ? ["https://vercel.live"] : [];

  const directivas: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDev ? ["'unsafe-eval'"] : []),
      "https://www.clarity.ms",
      "https://scripts.clarity.ms",
      ...vercelLive,
    ],
    "style-src": ["'self'", "'unsafe-inline'", ...vercelLive],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      BLOB_PUBLIC,
      ...CLARITY,
      ...(isPreview ? ["https://vercel.live", "https://vercel.com"] : []),
    ],
    "font-src": ["'self'", ...(isPreview ? ["https://vercel.live", "https://assets.vercel.com"] : [])],
    "media-src": ["'self'"],
    "connect-src": [
      "'self'",
      "https://vercel.com",
      BLOB_PUBLIC,
      ...CLARITY,
      ...(isDev ? ["ws:", "wss:"] : []),
      ...(isPreview ? ["https://vercel.live", "wss://ws-us3.pusher.com"] : []),
    ],
    "worker-src": ["'self'", "blob:"],
    "frame-src": isPreview ? ["https://vercel.live"] : ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "manifest-src": ["'self'"],
  };

  const politica = Object.entries(directivas)
    .map(([nombre, valores]) => `${nombre} ${valores.join(" ")}`)
    .join("; ");

  return isDev ? politica : `${politica}; upgrade-insecure-requests`;
}

export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64");
}
