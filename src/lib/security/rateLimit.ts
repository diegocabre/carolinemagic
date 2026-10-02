import { Ratelimit } from "@upstash/ratelimit";
import {
  getRedis,
  hashIdentificador,
  KEY_PREFIX,
  puedeUsarMemoria,
} from "./store";

/**
 * Límites de intentos.
 *
 * - Upstash (@upstash/ratelimit, ventana deslizante) cuando está configurado.
 * - En desarrollo sin Upstash: ventana deslizante en memoria (con aviso).
 * - En producción sin Upstash: `no_disponible` → quien llama debe rechazar
 *   la operación (falla de forma segura).
 *
 * Los identificadores (IP, correo) se guardan como hash, nunca en claro.
 */

export const REGLAS = {
  /** Intentos fallidos de login por IP + correo: 5 cada 15 min → bloqueo. */
  loginFallido: { limite: 5, ventanaSegundos: 15 * 60 },
  /** Intentos fallidos de login por IP (cualquier correo): 20 por hora. */
  loginIp: { limite: 20, ventanaSegundos: 60 * 60 },
} as const;

export type NombreRegla = keyof typeof REGLAS;

export type EstadoLimite =
  | { estado: "ok" }
  | { estado: "bloqueado"; reintentarEnSegundos: number }
  | { estado: "no_disponible" };

const limitadores = new Map<NombreRegla, Ratelimit>();

function limitador(nombre: NombreRegla): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;
  let rl = limitadores.get(nombre);
  if (!rl) {
    const { limite, ventanaSegundos } = REGLAS[nombre];
    rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limite, `${ventanaSegundos} s`),
      prefix: `${KEY_PREFIX}rl:${nombre}`,
      analytics: false,
    });
    limitadores.set(nombre, rl);
  }
  return rl;
}

// --- Respaldo en memoria (solo desarrollo) ---------------------------------

const globalConMemoria = globalThis as typeof globalThis & {
  __cmRateLimit?: Map<string, number[]>;
};

function marcas(clave: string, ventanaSegundos: number): number[] {
  globalConMemoria.__cmRateLimit ??= new Map();
  const desde = Date.now() - ventanaSegundos * 1000;
  const vigentes = (globalConMemoria.__cmRateLimit.get(clave) ?? []).filter(
    (t) => t > desde,
  );
  globalConMemoria.__cmRateLimit.set(clave, vigentes);
  return vigentes;
}

function estadoMemoria(
  nombre: NombreRegla,
  clave: string,
  consumir: boolean,
): EstadoLimite {
  const { limite, ventanaSegundos } = REGLAS[nombre];
  const lista = marcas(`${nombre}:${clave}`, ventanaSegundos);
  if (lista.length >= limite) {
    const reintentar = Math.ceil(
      (lista[0] + ventanaSegundos * 1000 - Date.now()) / 1000,
    );
    return { estado: "bloqueado", reintentarEnSegundos: Math.max(reintentar, 1) };
  }
  if (consumir) lista.push(Date.now());
  return { estado: "ok" };
}

// --- API -------------------------------------------------------------------

/** Consulta si el identificador está bloqueado, sin consumir un intento. */
export async function consultarLimite(
  nombre: NombreRegla,
  identificador: string,
): Promise<EstadoLimite> {
  const clave = hashIdentificador(identificador);
  const rl = limitador(nombre);
  if (rl) {
    try {
      const { remaining, reset } = await rl.getRemaining(clave);
      return remaining > 0
        ? { estado: "ok" }
        : {
            estado: "bloqueado",
            reintentarEnSegundos: Math.max(Math.ceil((reset - Date.now()) / 1000), 1),
          };
    } catch (error) {
      console.error(`[rate-limit] Error consultando ${nombre}:`, error);
      return { estado: "no_disponible" };
    }
  }
  if (!puedeUsarMemoria()) return { estado: "no_disponible" };
  return estadoMemoria(nombre, clave, false);
}

/** Registra un intento (consume una unidad) y devuelve el estado resultante. */
export async function registrarIntento(
  nombre: NombreRegla,
  identificador: string,
): Promise<EstadoLimite> {
  const clave = hashIdentificador(identificador);
  const rl = limitador(nombre);
  if (rl) {
    try {
      const { success, reset } = await rl.limit(clave);
      return success
        ? { estado: "ok" }
        : {
            estado: "bloqueado",
            reintentarEnSegundos: Math.max(Math.ceil((reset - Date.now()) / 1000), 1),
          };
    } catch (error) {
      console.error(`[rate-limit] Error registrando ${nombre}:`, error);
      return { estado: "no_disponible" };
    }
  }
  if (!puedeUsarMemoria()) return { estado: "no_disponible" };
  return estadoMemoria(nombre, clave, true);
}

/** Limpia los intentos (p. ej. tras un login exitoso). */
export async function reiniciarLimite(
  nombre: NombreRegla,
  identificador: string,
): Promise<void> {
  const clave = hashIdentificador(identificador);
  const rl = limitador(nombre);
  if (rl) {
    await rl.resetUsedTokens(clave).catch(() => undefined);
    return;
  }
  globalConMemoria.__cmRateLimit?.delete(`${nombre}:${clave}`);
}

export function minutosParaReintentar(segundos: number): number {
  return Math.max(1, Math.ceil(segundos / 60));
}
