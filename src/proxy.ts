import {
  renewSessionIfNeeded,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  verifySessionToken,
} from "@/lib/security/adminSession";
import { buildCsp, createNonce } from "@/lib/security/csp";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 1. Genera un nonce por petición y aplica la Content-Security-Policy
 *    (Next.js lo lee del encabezado y lo agrega a sus propios scripts).
 * 2. En /admin, renueva la sesión del panel si está por vencer
 *    (expiración deslizante de 12 h, máximo absoluto de 3 días).
 */
export async function proxy(request: NextRequest) {
  const nonce = createNonce();
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const payload = await verifySessionToken(token);
      const renovada = payload ? await renewSessionIfNeeded(payload).catch(() => null) : null;
      if (renovada) {
        response.cookies.set(
          SESSION_COOKIE_NAME,
          renovada.token,
          sessionCookieOptions(renovada.maxAge),
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Todas las rutas salvo:
     * - api (las rutas API no devuelven HTML)
     * - _next/static, _next/image (archivos estáticos)
     * - archivos con extensión servidos desde /public (imágenes, videos,
     *   favicon, robots.txt, sitemap.xml, security.txt...)
     * Se omiten también los prefetch de next/link.
     */
    {
      source:
        "/((?!api|_next/static|_next/image|.well-known|.*\\.(?:ico|png|jpg|jpeg|webp|gif|svg|mp4|webm|txt|xml|html|json)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
