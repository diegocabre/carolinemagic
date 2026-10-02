/**
 * Consentimiento de cookies (lado cliente).
 *
 * La elección se guarda en la cookie propia `cm_consent` (estrictamente
 * necesaria, 180 días) con el formato `v1.<0|1>.<timestamp>`. Si cambia la
 * versión (p. ej. se agrega un proveedor nuevo), se vuelve a preguntar.
 */

export const CONSENT_COOKIE = "cm_consent";
export const CONSENT_VERSION = "v1";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
/** Evento para reabrir el panel de preferencias desde cualquier botón. */
export const OPEN_PREFERENCES_EVENT = "cm:abrir-preferencias-cookies";

/** Rutas donde la analítica nunca se carga, aunque haya consentimiento. */
export const RUTAS_SIN_ANALITICA = ["/admin", "/derechos-datos"];

export interface ConsentState {
  analitica: boolean;
  fecha: number;
}

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const valor = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];
  if (!valor) return null;
  const [version, analitica, fecha] = decodeURIComponent(valor).split(".");
  if (version !== CONSENT_VERSION || (analitica !== "0" && analitica !== "1")) {
    return null;
  }
  return { analitica: analitica === "1", fecha: Number(fecha) || 0 };
}

export function writeConsent(analitica: boolean): ConsentState {
  const estado: ConsentState = { analitica, fecha: Date.now() };
  const valor = `${CONSENT_VERSION}.${analitica ? "1" : "0"}.${estado.fecha}`;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${valor}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  return estado;
}

/** Borra las cookies de Clarity de nuestro dominio (las de microsoft.com no son accesibles). */
export function borrarCookiesAnalitica(): void {
  const nombres = ["_clck", "_clsk"];
  const host = window.location.hostname;
  const partes = host.split(".");
  const dominios = ["", host, ...partes.map((_, i) => `.${partes.slice(i).join(".")}`)];
  for (const nombre of nombres) {
    for (const dominio of dominios) {
      const d = dominio ? `; Domain=${dominio}` : "";
      document.cookie = `${nombre}=; Max-Age=0; Path=/${d}`;
    }
  }
}

export function abrirPreferenciasCookies(): void {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
