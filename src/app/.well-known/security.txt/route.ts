import { LEGAL, valorLegal } from "@/config/legal";

/**
 * security.txt (RFC 9116). Se genera desde src/config/legal.ts para no
 * duplicar el correo de seguridad. Si aún no está completo, el contacto
 * apunta a la página /seguridad (siempre válida).
 */
export const dynamic = "force-static";

export function GET() {
  const correo = valorLegal(LEGAL.emailSeguridad);
  const lineas = [
    ...(correo ? [`Contact: mailto:${correo}`] : []),
    `Contact: ${LEGAL.sitioUrl}/seguridad`,
    `Expires: ${LEGAL.securityTxtExpira}`,
    "Preferred-Languages: es, en",
    `Canonical: ${LEGAL.sitioUrl}/.well-known/security.txt`,
    `Policy: ${LEGAL.sitioUrl}/seguridad`,
  ];

  return new Response(`${lineas.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
