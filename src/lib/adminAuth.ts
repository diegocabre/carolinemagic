import {
  issueSession,
  parseSessionToken,
  revokeSession,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  timingSafeEqualStrings,
  verifySessionToken,
} from "@/lib/security/adminSession";
import {
  burnPasswordCheck,
  isValidPasswordHash,
  verifyPassword,
} from "@/lib/security/password";
import { cookies } from "next/headers";

let avisoClavePlana = false;

/**
 * Compara las credenciales recibidas contra ADMIN_EMAIL y
 * ADMIN_PASSWORD_HASH (scrypt, ver `npm run admin:hash`).
 *
 * Compatibilidad temporal: si aún no existe ADMIN_PASSWORD_HASH se acepta
 * ADMIN_PASSWORD en texto plano, con un aviso en los logs.
 * TODO(diego): crear ADMIN_PASSWORD_HASH en Vercel y borrar ADMIN_PASSWORD.
 */
export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  const legacyPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminEmail) return false;

  const emailOk = timingSafeEqualStrings(email.trim().toLowerCase(), adminEmail);

  if (passwordHash) {
    if (!isValidPasswordHash(passwordHash)) {
      console.error(
        "[admin] ADMIN_PASSWORD_HASH tiene un formato inválido. Genera uno nuevo con `npm run admin:hash`.",
      );
      return false;
    }
    // Siempre se calcula el hash para no revelar por tiempos si el correo existe.
    const passwordOk = await verifyPassword(password, passwordHash);
    return emailOk && passwordOk;
  }

  if (legacyPassword) {
    if (!avisoClavePlana) {
      avisoClavePlana = true;
      console.warn(
        "[admin] AVISO: se está usando ADMIN_PASSWORD en texto plano (deprecado). Genera ADMIN_PASSWORD_HASH con `npm run admin:hash` y elimina ADMIN_PASSWORD.",
      );
    }
    await burnPasswordCheck(password);
    return emailOk && timingSafeEqualStrings(password, legacyPassword);
  }

  return false;
}

/**
 * Inicia sesión rotando el identificador: si había una sesión previa en este
 * navegador, se revoca antes de emitir la nueva.
 */
export async function createAdminSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  const previa = parseSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (previa) await revokeSession(previa.sid).catch(() => undefined);

  const { token, maxAge } = await issueSession(email.trim().toLowerCase());
  cookieStore.set(SESSION_COOKIE_NAME, token, sessionCookieOptions(maxAge));
}

/** Revoca la sesión en el servidor y borra la cookie del navegador. */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const actual = parseSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (actual) {
    await revokeSession(actual.sid).catch((error: unknown) => {
      console.error("[admin] No se pudo revocar la sesión:", error);
    });
  }
  cookieStore.set(SESSION_COOKIE_NAME, "", sessionCookieOptions(0));
}

export async function hasValidAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const payload = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE_NAME)?.value,
  );
  return payload !== null;
}
