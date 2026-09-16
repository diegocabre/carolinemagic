import { cookies } from "next/headers";
import crypto from "node:crypto";

const SESSION_COOKIE_NAME = "cm_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 días

function getAuthSecret(): string {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "Falta configurar la variable de entorno ADMIN_AUTH_SECRET.",
    );
  }
  return secret;
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", getAuthSecret())
    .update(value)
    .digest("hex");
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

/** Compara las credenciales recibidas contra ADMIN_EMAIL / ADMIN_PASSWORD. */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminEmail || !adminPassword) return false;

  const emailOk = timingSafeEqualStrings(
    email.trim().toLowerCase(),
    adminEmail.trim().toLowerCase(),
  );
  const passwordOk = timingSafeEqualStrings(password, adminPassword);
  return emailOk && passwordOk;
}

export async function createAdminSession(email: string): Promise<void> {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  });
  const payloadBase64 = Buffer.from(payload).toString("base64url");
  const token = `${payloadBase64}.${sign(payloadBase64)}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function hasValidAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return false;
  if (!timingSafeEqualStrings(signature, sign(payloadBase64))) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8"),
    ) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
