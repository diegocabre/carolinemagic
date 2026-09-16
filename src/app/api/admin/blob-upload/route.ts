import { hasValidAdminSession } from "@/lib/adminAuth";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

/**
 * Autoriza y emite el token para que el navegador suba la imagen DIRECTO a
 * Vercel Blob (sin pasar el archivo por esta función). Esto es necesario
 * porque las funciones de Vercel rechazan cualquier cuerpo mayor a 4.5MB,
 * un límite que una foto de celular normal supera fácilmente.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await hasValidAdminSession())) {
          throw new Error("No autorizado.");
        }
        if (!pathname.startsWith("admin/")) {
          throw new Error("Ruta de subida inválida.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 },
    );
  }
}
