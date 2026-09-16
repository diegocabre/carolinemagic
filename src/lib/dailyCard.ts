import { head, put } from "@vercel/blob";

const DAILY_CARD_PATHNAME = "admin/daily-card.json";

export interface DailyCardData {
  titulo?: string;
  imagenUrl: string;
  interpretacion: string;
  actualizadoEn: string;
  /** Imagen del frente de la carta ("Toca para Revelar"). No cambia a diario. */
  portadaUrl?: string;
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

/** Host de los blobs públicos de nuestro store — usado para validar URLs recibidas del cliente. */
export function esUrlDeBlobConfiable(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
