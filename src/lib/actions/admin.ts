"use server";

import {
  createAdminSession,
  destroyAdminSession,
  hasValidAdminSession,
  verifyAdminCredentials,
} from "@/lib/adminAuth";
import {
  getDailyCard,
  saveDailyCard,
  uploadDailyCardImage,
} from "@/lib/dailyCard";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

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

export async function saveDailyCardAction(
  _prevState: DailyCardFormState,
  formData: FormData,
): Promise<DailyCardFormState> {
  if (!(await hasValidAdminSession())) {
    return { error: "Tu sesión expiró. Vuelve a iniciar sesión." };
  }

  const interpretacion = formData.get("interpretacion");
  const titulo = formData.get("titulo");
  const imagen = formData.get("imagen");

  if (typeof interpretacion !== "string" || !interpretacion.trim()) {
    return { error: "Escribe la interpretación de hoy." };
  }

  let imagenUrl: string | undefined;

  try {
    if (imagen instanceof File && imagen.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(imagen.type)) {
        return { error: "La foto debe ser JPG, PNG o WEBP." };
      }
      if (imagen.size > MAX_IMAGE_SIZE_BYTES) {
        return { error: "La foto no puede pesar más de 8MB." };
      }
      imagenUrl = await uploadDailyCardImage(imagen);
    } else {
      imagenUrl = (await getDailyCard())?.imagenUrl;
    }

    if (!imagenUrl) {
      return { error: "Debes subir una foto para la sincronicidad de hoy." };
    }

    await saveDailyCard({
      titulo:
        typeof titulo === "string" && titulo.trim()
          ? titulo.trim()
          : undefined,
      imagenUrl,
      interpretacion: interpretacion.trim(),
      actualizadoEn: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[admin] Error guardando la sincronicidad del día:", error);
    return {
      error:
        "No se pudo guardar. Revisa que BLOB_READ_WRITE_TOKEN esté configurado (Vercel → Storage → Blob).",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}
