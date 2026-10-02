/**
 * Reglas de subida de imágenes del panel admin (Vercel Blob, subida directa
 * desde el navegador). El servidor nunca confía en el Content-Type ni en el
 * nombre que declara el cliente:
 *
 * 1. Al emitir el token se exige una ruta con forma fija y nombre aleatorio
 *    (`RUTA_SUBIDA_REGEX`), una lista blanca de tipos y un tamaño máximo.
 * 2. Antes de publicar, se descargan los primeros bytes del archivo subido y
 *    se verifica la firma real (magic bytes) de JPEG, PNG o WEBP. Si no
 *    coincide, el archivo se elimina.
 */

export const TIPOS_IMAGEN_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"] as const;
export type TipoImagen = (typeof TIPOS_IMAGEN_PERMITIDOS)[number];

export const EXTENSION_POR_TIPO: Record<TipoImagen, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const TAMANO_MAXIMO_BYTES = 8 * 1024 * 1024; // 8 MB

/** admin/<prefijo>-<uuid v4>.<jpg|png|webp> */
export const RUTA_SUBIDA_REGEX =
  /^admin\/(daily-card-image|portada-image)-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/;

export function esTipoImagenPermitido(tipo: string): tipo is TipoImagen {
  return (TIPOS_IMAGEN_PERMITIDOS as readonly string[]).includes(tipo);
}

/** Detecta el tipo real a partir de la firma binaria. */
export function detectarTipoImagen(bytes: Uint8Array): TipoImagen | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length >= 8 && png.every((b, i) => bytes[i] === b)) {
    return "image/png";
  }
  const ascii = (desde: number, hasta: number) =>
    String.fromCharCode(...bytes.slice(desde, hasta));
  if (bytes.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") {
    return "image/webp";
  }
  return null;
}

/**
 * Id del store de Blob de este proyecto, derivado del token
 * (`vercel_blob_rw_<storeId>_<secreto>`). Sirve para aceptar solo URLs de
 * NUESTRO store y no de cualquier store público de Vercel.
 */
function idStoreBlob(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? "";
  const partes = token.split("_");
  return partes.length >= 5 && partes[3] ? partes[3].toLowerCase() : null;
}

/** URL de un blob público de nuestro store, dentro de admin/. */
export function esUrlDeBlobPropia(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    if (!u.hostname.endsWith(".public.blob.vercel-storage.com")) return false;
    if (!u.pathname.startsWith("/admin/")) return false;
    const store = idStoreBlob();
    return store === null || u.hostname.startsWith(`${store}.`);
  } catch {
    return false;
  }
}

/** Descarga los primeros bytes del blob y comprueba que sea una imagen válida. */
export async function verificarImagenSubida(url: string): Promise<boolean> {
  try {
    const respuesta = await fetch(url, {
      headers: { Range: "bytes=0-31" },
      cache: "no-store",
    });
    if (!respuesta.ok) return false;
    const largo = Number(respuesta.headers.get("content-length") ?? "0");
    // Si el servidor ignoró el Range, el content-length es el total.
    if (respuesta.status === 200 && largo > TAMANO_MAXIMO_BYTES) return false;
    const buffer = new Uint8Array(await respuesta.arrayBuffer()).slice(0, 32);
    return detectarTipoImagen(buffer) !== null;
  } catch {
    return false;
  }
}
