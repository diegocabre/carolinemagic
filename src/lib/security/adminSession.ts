import crypto from "node:crypto";
import { kvDelete, kvGet, kvSet } from "./store";

/**
 * Token de sesión del panel admin, independiente de `next/headers` para que
 * lo puedan usar tanto el proxy (renovación) como las rutas de la app.
 *
 * Formato: base64url(JSON payload) + "." + HMAC-SHA256(payload).
 * Además de la firma, el id de sesión (`sid`) debe existir en el almacén:
 * así el cierre de sesión invalida el token en el servidor, no solo en el
 * navegador.
 */

export const SESSION_COOKIE_NAME = "cm_admin_session";
/** Expiración por inactividad: 12 horas, renovable mientras se use. */
export const SESSION_IDLE_SECONDS = 60 * 60 * 12;
/** Vida máxima absoluta aunque se siga renovando: 3 días. */
export const SESSION_ABSOLUTE_SECONDS = 60 * 60 * 24 * 3;
/** Se renueva cuando queda menos de la mitad del tiempo de inactividad. */
export const SESSION_RENEW_THRESHOLD_SECONDS = SESSION_IDLE_SECONDS / 2;

export interface AdminSessionPayload {
  sub: string;
  sid: string;
  /** Emitido en (ms). */
  iat: number;
  /** Expira en (ms). */
  exp: number;
}

const SESSION_KEY_PREFIX = "admin:session:";
let avisoSecretoCorto = false;

function getAuthSecret(): string {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (!secret) {
    throw new Error("Falta configurar la variable de entorno ADMIN_AUTH_SECRET.");
  }
  if (secret.length < 32 && !avisoSecretoCorto) {
    avisoSecretoCorto = true;
    console.warn(
      "[admin] ADMIN_AUTH_SECRET tiene menos de 32 caracteres. Genera uno nuevo con: node -e \"console.log(require('crypto').randomBytes(48).toString('base64url'))\"",
    );
  }
  return secret;
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", getAuthSecret())
    .update(value)
    .digest("base64url");
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

export function serializeSession(payload: AdminSessionPayload): string {
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  return `${payloadBase64}.${sign(payloadBase64)}`;
}

function esPayload(valor: unknown): valor is AdminSessionPayload {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    typeof v.sub === "string" &&
    typeof v.sid === "string" &&
    typeof v.iat === "number" &&
    typeof v.exp === "number"
  );
}

/** Verifica firma y expiración. No consulta el almacén. */
export function parseSessionToken(
  token: string | undefined,
): AdminSessionPayload | null {
  if (!token) return null;
  const partes = token.split(".");
  if (partes.length !== 2) return null;
  const [payloadBase64, signature] = partes;
  if (!payloadBase64 || !signature) return null;

  try {
    if (!timingSafeEqualStrings(signature, sign(payloadBase64))) return null;
    const payload: unknown = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8"),
    );
    if (!esPayload(payload)) return null;
    const ahora = Date.now();
    if (payload.exp <= ahora) return null;
    if (payload.iat + SESSION_ABSOLUTE_SECONDS * 1000 <= ahora) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Firma válida + sesión activa en el almacén. Falla cerrado ante errores. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<AdminSessionPayload | null> {
  const payload = parseSessionToken(token);
  if (!payload) return null;
  try {
    const activa = await kvGet(`${SESSION_KEY_PREFIX}${payload.sid}`);
    return activa === payload.sub ? payload : null;
  } catch (error) {
    console.error("[admin] No se pudo validar la sesión:", error);
    return null;
  }
}

function segundosRestantesAbsolutos(iat: number): number {
  return Math.floor((iat + SESSION_ABSOLUTE_SECONDS * 1000 - Date.now()) / 1000);
}

/** Crea una sesión nueva (id aleatorio) y la registra en el almacén. */
export async function issueSession(
  email: string,
): Promise<{ token: string; maxAge: number }> {
  const ahora = Date.now();
  const payload: AdminSessionPayload = {
    sub: email,
    sid: crypto.randomBytes(32).toString("base64url"),
    iat: ahora,
    exp: ahora + SESSION_IDLE_SECONDS * 1000,
  };
  await kvSet(`${SESSION_KEY_PREFIX}${payload.sid}`, email, SESSION_IDLE_SECONDS);
  return { token: serializeSession(payload), maxAge: SESSION_IDLE_SECONDS };
}

/**
 * Extiende una sesión válida si está por vencer (expiración deslizante),
 * sin pasar la vida máxima absoluta. Devuelve `null` si no corresponde.
 */
export async function renewSessionIfNeeded(
  payload: AdminSessionPayload,
): Promise<{ token: string; maxAge: number } | null> {
  const restante = Math.floor((payload.exp - Date.now()) / 1000);
  if (restante > SESSION_RENEW_THRESHOLD_SECONDS) return null;

  const maxAge = Math.min(
    SESSION_IDLE_SECONDS,
    segundosRestantesAbsolutos(payload.iat),
  );
  if (maxAge <= 60) return null;

  const renovado: AdminSessionPayload = {
    ...payload,
    exp: Date.now() + maxAge * 1000,
  };
  await kvSet(`${SESSION_KEY_PREFIX}${payload.sid}`, payload.sub, maxAge);
  return { token: serializeSession(renovado), maxAge };
}

export async function revokeSession(sid: string): Promise<void> {
  await kvDelete(`${SESSION_KEY_PREFIX}${sid}`);
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    // `secure` siempre en producción; en `next dev` (http://localhost) el
    // navegador no guardaría la cookie si fuera `secure`.
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}
