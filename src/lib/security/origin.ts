/**
 * Validación de Origin/Referer para server actions y rutas POST sensibles.
 *
 * Next.js ya compara Origin con Host en las server actions; esta verificación
 * explícita se suma como defensa en profundidad y cubre también las rutas
 * POST propias (/api/admin/*), que Next no protege automáticamente.
 */

function hostDeUrl(valor: string | null): string | null {
  if (!valor) return null;
  try {
    return new URL(valor).host.toLowerCase();
  } catch {
    return null;
  }
}

/** Hosts aceptados: el que atendió la petición (Host / X-Forwarded-Host). */
function hostsPermitidos(headers: Headers): Set<string> {
  const hosts = new Set<string>();
  const forwarded = headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = headers.get("host")?.trim();
  if (forwarded) hosts.add(forwarded.toLowerCase());
  if (host) hosts.add(host.toLowerCase());
  return hosts;
}

/**
 * `true` si la petición declara un Origin (o, en su defecto, un Referer) del
 * mismo host. Sin ninguno de los dos se rechaza: los navegadores modernos
 * siempre envían Origin en POST.
 */
export function isSameOrigin(headers: Headers): boolean {
  const permitidos = hostsPermitidos(headers);
  if (permitidos.size === 0) return false;

  const origin = headers.get("origin");
  if (origin && origin !== "null") {
    const host = hostDeUrl(origin);
    return host !== null && permitidos.has(host);
  }

  const refererHost = hostDeUrl(headers.get("referer"));
  return refererHost !== null && permitidos.has(refererHost);
}

/** IP del cliente según los encabezados de Vercel. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "desconocida"
  );
}
