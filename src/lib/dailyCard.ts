import { head, put } from "@vercel/blob";

const DAILY_CARD_PATHNAME = "admin/daily-card.json";

export interface DailyCardData {
  titulo?: string;
  imagenUrl: string;
  interpretacion: string;
  actualizadoEn: string;
}

/** Lee la sincronicidad del día guardada por Caroline. `null` si aún no ha cargado ninguna. */
export async function getDailyCard(): Promise<DailyCardData | null> {
  try {
    const blob = await head(DAILY_CARD_PATHNAME);
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as DailyCardData;
  } catch {
    return null;
  }
}

export async function saveDailyCard(data: DailyCardData): Promise<void> {
  await put(DAILY_CARD_PATHNAME, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

/** Sube la foto de la sincronicidad de hoy y devuelve su URL pública. */
export async function uploadDailyCardImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const pathname = `admin/daily-card-image-${Date.now()}.${extension}`;
  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type || undefined,
    addRandomSuffix: true,
  });
  return blob.url;
}
