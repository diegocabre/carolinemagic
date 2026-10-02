#!/usr/bin/env node
/**
 * Genera el valor de ADMIN_PASSWORD_HASH para el panel admin.
 *
 *   npm run admin:hash
 *
 * Pide la clave dos veces sin mostrarla en pantalla (no la pases como
 * argumento: quedaría en el historial de la terminal). Copia la línea
 * resultante en Vercel → Settings → Environment Variables y en .env.local.
 *
 * Formato compatible con src/lib/security/password.ts.
 */
import crypto from "node:crypto";
import readline from "node:readline";

const N = 2 ** 15;
const r = 8;
const p = 1;
const KEY_LENGTH = 64;
const MIN_LENGTH = 12;

function preguntarOculto(pregunta) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });
    let silenciar = false;
    const escribirOriginal = rl._writeToOutput?.bind(rl);
    rl._writeToOutput = (texto) => {
      if (!silenciar && escribirOriginal) escribirOriginal(texto);
    };
    rl.question(pregunta, (respuesta) => {
      rl.close();
      process.stdout.write("\n");
      resolve(respuesta);
    });
    silenciar = true;
  });
}

const clave = await preguntarOculto("Nueva clave del admin: ");
if (clave.length < MIN_LENGTH) {
  console.error(`La clave debe tener al menos ${MIN_LENGTH} caracteres.`);
  process.exit(1);
}
const confirmacion = await preguntarOculto("Repite la clave: ");
if (clave !== confirmacion) {
  console.error("Las claves no coinciden.");
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(clave.normalize("NFKC"), salt, KEY_LENGTH, {
  N,
  r,
  p,
  maxmem: 128 * 1024 * 1024,
});

console.log("\nAgrega esta variable (y elimina ADMIN_PASSWORD):\n");
console.log(
  `ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${hash.toString("base64url")}`,
);
