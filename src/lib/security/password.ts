import crypto from "node:crypto";
import { promisify } from "node:util";

/**
 * Hash de la clave del admin con scrypt (node:crypto).
 *
 * Por qué scrypt y no argon2: argon2id es algo superior, pero en Node
 * requiere un binario nativo (`argon2`/node-gyp) que complica el build en
 * Vercel y en Windows. scrypt viene en Node, es "memory-hard" y, con los
 * parámetros de abajo (N=2^15, r=8, ~32 MB), está dentro de lo recomendado
 * por OWASP. Para una sola cuenta admin es una protección adecuada.
 *
 * Formato (sin "$" porque @next/env expande "$VAR" en los .env):
 *   scrypt:<N>:<r>:<p>:<salt base64url>:<hash base64url>
 *
 * Genera el valor con `npm run admin:hash` (scripts/admin-hash.mjs, que
 * usa el mismo formato).
 */

const scrypt = promisify(crypto.scrypt) as (
  password: crypto.BinaryLike,
  salt: crypto.BinaryLike,
  keylen: number,
  options: crypto.ScryptOptions,
) => Promise<Buffer>;

const KEY_LENGTH = 64;
const MAX_MEM = 128 * 1024 * 1024;

interface ParsedHash {
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  hash: Buffer;
}

function parseHash(stored: string): ParsedHash | null {
  const partes = stored.trim().split(":");
  if (partes.length !== 6 || partes[0] !== "scrypt") return null;
  const [, n, r, p, salt, hash] = partes;
  const N = Number(n);
  const R = Number(r);
  const P = Number(p);
  if (![N, R, P].every((x) => Number.isInteger(x) && x > 0)) return null;
  // N debe ser potencia de 2 y no absurdamente bajo.
  if (N < 2 ** 14 || (N & (N - 1)) !== 0) return null;
  const saltBuf = Buffer.from(salt, "base64url");
  const hashBuf = Buffer.from(hash, "base64url");
  if (saltBuf.length < 16 || hashBuf.length !== KEY_LENGTH) return null;
  return { N, r: R, p: P, salt: saltBuf, hash: hashBuf };
}

export function isValidPasswordHash(stored: string): boolean {
  return parseHash(stored) !== null;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parsed = parseHash(stored);
  if (!parsed) return false;
  const derivada = await scrypt(password.normalize("NFKC"), parsed.salt, KEY_LENGTH, {
    N: parsed.N,
    r: parsed.r,
    p: parsed.p,
    maxmem: MAX_MEM,
  });
  return crypto.timingSafeEqual(derivada, parsed.hash);
}

/** Hash ficticio para igualar tiempos cuando el correo no coincide. */
const DUMMY_HASH = `scrypt:32768:8:1:${Buffer.alloc(16).toString("base64url")}:${Buffer.alloc(KEY_LENGTH).toString("base64url")}`;

export async function burnPasswordCheck(password: string): Promise<void> {
  await verifyPassword(password, DUMMY_HASH);
}
