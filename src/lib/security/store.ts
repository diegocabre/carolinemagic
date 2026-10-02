import { Redis } from "@upstash/redis";
import crypto from "node:crypto";

/**
 * Almacén clave-valor para datos de seguridad de vida corta (sesiones admin,
 * contadores de intentos y registro mínimo de solicitudes de derechos).
 *
 * - Con UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN → Upstash Redis.
 * - En desarrollo sin esas variables → memoria del proceso (con aviso).
 * - En producción sin esas variables → `null`: quien lo use debe fallar de
 *   forma segura (rechazar el login, no aceptar el formulario, etc.).
 */

let redisClient: Redis | null | undefined;
let avisoMostrado = false;

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  redisClient = url && token ? new Redis({ url, token }) : null;
  return redisClient;
}

/** `true` si se puede usar el respaldo en memoria (solo fuera de producción). */
export function puedeUsarMemoria(): boolean {
  if (isProduction()) return false;
  if (!avisoMostrado) {
    avisoMostrado = true;
    console.warn(
      "[seguridad] UPSTASH_REDIS_REST_URL/TOKEN no configurados: usando almacén en memoria (solo desarrollo).",
    );
  }
  return true;
}

export class StoreUnavailableError extends Error {
  constructor() {
    super(
      "Almacén de seguridad no configurado (faltan UPSTASH_REDIS_REST_URL/TOKEN).",
    );
    this.name = "StoreUnavailableError";
  }
}

interface EntradaMemoria {
  valor: string;
  expiraEn: number;
}

/**
 * Mapa compartido vía globalThis para que el proxy y las rutas de la app,
 * que en desarrollo pueden cargar módulos por separado, vean los mismos datos.
 */
const globalConMemoria = globalThis as typeof globalThis & {
  __cmMemoryStore?: Map<string, EntradaMemoria>;
};

function memoria(): Map<string, EntradaMemoria> {
  globalConMemoria.__cmMemoryStore ??= new Map();
  return globalConMemoria.__cmMemoryStore;
}

/** Guarda `valor` en `clave` con expiración en segundos. */
export async function kvSet(
  clave: string,
  valor: string,
  ttlSegundos: number,
): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(clave, valor, { ex: ttlSegundos });
    return;
  }
  if (!puedeUsarMemoria()) throw new StoreUnavailableError();
  memoria().set(clave, { valor, expiraEn: Date.now() + ttlSegundos * 1000 });
}

export async function kvGet(clave: string): Promise<string | null> {
  const redis = getRedis();
  if (redis) {
    const valor = await redis.get<string | number | object>(clave);
    if (valor === null || valor === undefined) return null;
    return typeof valor === "string" ? valor : JSON.stringify(valor);
  }
  if (!puedeUsarMemoria()) throw new StoreUnavailableError();
  const entrada = memoria().get(clave);
  if (!entrada) return null;
  if (entrada.expiraEn <= Date.now()) {
    memoria().delete(clave);
    return null;
  }
  return entrada.valor;
}

export async function kvDelete(clave: string): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.del(clave);
    return;
  }
  if (!puedeUsarMemoria()) throw new StoreUnavailableError();
  memoria().delete(clave);
}

/** Lista las claves con un prefijo (solo para volúmenes pequeños). */
export async function kvKeys(prefijo: string): Promise<string[]> {
  const redis = getRedis();
  if (redis) {
    const claves: string[] = [];
    let cursor: string | number = 0;
    do {
      const [siguiente, lote]: [string | number, string[]] = await redis.scan(
        cursor,
        { match: `${prefijo}*`, count: 200 },
      );
      claves.push(...lote);
      cursor = siguiente;
    } while (String(cursor) !== "0");
    return claves;
  }
  if (!puedeUsarMemoria()) throw new StoreUnavailableError();
  const ahora = Date.now();
  return [...memoria().entries()]
    .filter(([clave, e]) => clave.startsWith(prefijo) && e.expiraEn > ahora)
    .map(([clave]) => clave);
}

/**
 * Hash estable para usar IP o correo como parte de una clave sin guardar el
 * dato en claro (minimización).
 */
export function hashIdentificador(valor: string): string {
  return crypto
    .createHash("sha256")
    .update(`cm:${valor.trim().toLowerCase()}`)
    .digest("hex")
    .slice(0, 32);
}
