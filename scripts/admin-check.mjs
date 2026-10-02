#!/usr/bin/env node
/**
 * Comprueba si una clave coincide con un valor de ADMIN_PASSWORD_HASH.
 *
 *   npm run admin:check
 *
 * Pega el hash tal como lo pusiste en Vercel y escribe la clave. Ninguno de
 * los dos se muestra en pantalla ni se guarda. Formato compatible con
 * src/lib/security/password.ts.
 */
import crypto from "node:crypto";
import readline from "node:readline";

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

const crudo = await preguntarOculto("Pega el valor de ADMIN_PASSWORD_HASH: ");
const hash = crudo
  .trim()
  .replace(/^ADMIN_PASSWORD_HASH\s*=\s*/, "")
  .replace(/^["']|["']$/g, "")
  .trim();

if (hash !== crudo.trim()) {
  console.log("ℹ️  El valor tenía espacios, comillas o el nombre de la variable. El sitio ya los tolera.");
}

const partes = hash.split(":");
if (partes.length !== 6 || partes[0] !== "scrypt") {
  console.error(
    `❌ Formato inválido: se esperaban 6 partes separadas por ':' empezando con 'scrypt' (hay ${partes.length}). Genera uno nuevo con npm run admin:hash.`,
  );
  process.exit(1);
}
const [, n, r, p, saltB64, hashB64] = partes;
const salt = Buffer.from(saltB64, "base64url");
const esperado = Buffer.from(hashB64, "base64url");
if (esperado.length !== 64 || salt.length < 16) {
  console.error("❌ El hash parece cortado o incompleto. Cópialo de nuevo completo.");
  process.exit(1);
}

const clave = await preguntarOculto("Escribe la clave: ");
const derivada = crypto.scryptSync(clave.normalize("NFKC"), salt, 64, {
  N: Number(n),
  r: Number(r),
  p: Number(p),
  maxmem: 128 * 1024 * 1024,
});

if (crypto.timingSafeEqual(derivada, esperado)) {
  console.log("✅ La clave coincide con el hash.");
} else {
  console.log("❌ La clave NO coincide con este hash. Genera uno nuevo con npm run admin:hash.");
  process.exit(1);
}
