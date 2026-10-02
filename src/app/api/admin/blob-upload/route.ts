import { hasValidAdminSession } from "@/lib/adminAuth";
import { isSameOrigin } from "@/lib/security/origin";
import {
  RUTA_SUBIDA_REGEX,
  TAMANO_MAXIMO_BYTES,
  TIPOS_IMAGEN_PERMITIDOS,
} from "@/lib/security/uploads";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 16 * 1024;

class NoAutorizadoError extends Error {}

function json(cuerpo: object, status: number) {
  return NextResponse.json(cuerpo, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function esCuerpoDeToken(valor: unknown): valor is HandleUploadBody {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as { type?: unknown; payload?: unknown };
  // Solo aceptamos la emisión de tokens: no usamos el webhook de "upload completed".
  return v.type === "blob.generate-client-token" && typeof v.payload === "object";
}

/**
 * Autoriza y emite el token para que el navegador suba la imagen DIRECTO a
 * Vercel Blob (sin pasar el archivo por esta función, porque Vercel rechaza
 * cuerpos de más de 4.5MB). Exige: mismo origen, sesión admin válida, ruta
 * con nombre aleatorio y extensión de imagen, tipos en lista blanca y
 * tamaño máximo. El contenido real se verifica después, al publicar
 * (ver saveDailyCardAction).
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request.headers)) {
    return json({ error: "Origen no permitido." }, 403);
  }
  if (!(await hasValidAdminSession())) {
    return json({ error: "No autorizado." }, 401);
  }

  const largo = Number(request.headers.get("content-length") ?? "0");
  if (largo > MAX_BODY_BYTES) {
    return json({ error: "Solicitud demasiado grande." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Solicitud inválida." }, 400);
  }
  if (!esCuerpoDeToken(body)) {
    return json({ error: "Solicitud inválida." }, 400);
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Se vuelve a comprobar aquí por si la sesión expiró entre medio.
        if (!(await hasValidAdminSession())) throw new NoAutorizadoError();
        if (!RUTA_SUBIDA_REGEX.test(pathname)) {
          throw new Error("Ruta de subida inválida.");
        }

        return {
          allowedContentTypes: [...TIPOS_IMAGEN_PERMITIDOS],
          maximumSizeInBytes: TAMANO_MAXIMO_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
          validUntil: Date.now() + 5 * 60 * 1000,
        };
      },
    });

    return json(jsonResponse, 200);
  } catch (error) {
    if (error instanceof NoAutorizadoError) {
      return json({ error: "No autorizado." }, 401);
    }
    console.error("[admin] Error emitiendo token de subida:", error);
    return json({ error: "No se pudo autorizar la subida." }, 400);
  }
}
