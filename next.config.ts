import type { NextConfig } from "next";
import { pendingLegalFields } from "./src/config/legal";

// Aviso (no bloqueante) si quedan datos legales sin completar en
// src/config/legal.ts. Se muestra en `next dev` y en `next build`.
const pendientes = pendingLegalFields();
if (pendientes.length > 0) {
  console.warn(
    `\n⚠️  [legal] Faltan ${pendientes.length} datos del responsable en src/config/legal.ts: ${pendientes.join(", ")}.\n` +
      "    Las páginas legales mostrarán 'Pendiente de completar'. Complétalos y haz revisar los textos por un abogado antes de publicar.\n",
  );
}

/**
 * Cabeceras de seguridad para todas las respuestas. La Content-Security-Policy
 * se aplica en src/proxy.ts porque usa un nonce distinto por petición.
 */
const securityHeaders = [
  // Sin `preload`: inscribir el dominio en la lista de precarga es difícil de
  // revertir. Agrégalo solo cuando todos los subdominios funcionen por HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Redundante con `frame-ancestors 'none'` de la CSP; cubre navegadores antiguos.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const privateHeaders = [
  { key: "Cache-Control", value: "no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin", headers: privateHeaders },
      { source: "/admin/:path*", headers: privateHeaders },
      { source: "/api/:path*", headers: privateHeaders },
    ];
  },
};

export default nextConfig;
