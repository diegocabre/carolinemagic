"use server";

import {
  createAdminSession,
  destroyAdminSession,
  hasValidAdminSession,
  verifyAdminCredentials,
} from "@/lib/adminAuth";
import {
  esUrlDeBlobConfiable,
  getDailyCard,
  saveDailyCard,
} from "@/lib/dailyCard";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Ingresa tu correo y tu clave." };
  }

  if (!verifyAdminCredentials(email, password)) {
    return { error: "Correo o clave incorrectos." };
  }

  await createAdminSession(email);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export interface DailyCardFormState {
  error?: string;
  success?: boolean;
}

/**
 * Recibe las URLs de las imágenes (ya subidas directo a Blob desde el
 * navegador, ver /api/admin/blob-upload) junto con el texto, y guarda el
 * registro del día. No procesa archivos: el cuerpo de esta acción es
 * siempre liviano.
 */
export async function saveDailyCardAction(
  _prevState: DailyCardFormState,
  formData: FormData,
): Promise<DailyCardFormState> {
  if (!(await hasValidAdminSession())) {
    return { error: "Tu sesión expiró. Vuelve a iniciar sesión." };
  }

  const interpretacion = formData.get("interpretacion");
  const titulo = formData.get("titulo");
  const imagenUrlInput = formData.get("imagenUrl");
  const portadaUrlInput = formData.get("portadaUrl");

  if (typeof interpretacion !== "string" || !interpretacion.trim()) {
    return { error: "Escribe la interpretación de hoy." };
  }

  try {
    const actual = await getDailyCard();

    const imagenUrl =
      typeof imagenUrlInput === "string" && imagenUrlInput
        ? imagenUrlInput
        : actual?.imagenUrl;
    const portadaUrl =
      typeof portadaUrlInput === "string" && portadaUrlInput
        ? portadaUrlInput
        : actual?.portadaUrl;

    if (!imagenUrl) {
      return { error: "Debes subir una foto para la sincronicidad de hoy." };
    }
    if (!esUrlDeBlobConfiable(imagenUrl) || (portadaUrl && !esUrlDeBlobConfiable(portadaUrl))) {
      return { error: "La imagen no se subió correctamente. Intenta de nuevo." };
    }

    await saveDailyCard({
      titulo:
        typeof titulo === "string" && titulo.trim()
          ? titulo.trim()
          : undefined,
      imagenUrl,
      portadaUrl,
      interpretacion: interpretacion.trim(),
      actualizadoEn: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[admin] Error guardando la sincronicidad del día:", error);
    return {
      error:
        "No se pudo guardar. Revisa que el store de Vercel Blob esté conectado al proyecto.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}
