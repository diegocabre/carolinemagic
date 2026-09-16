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
  uploadPortadaImage,
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
  const portada = formData.get("portada");

  if (typeof interpretacion !== "string" || !interpretacion.trim()) {
    return { error: "Escribe la interpretación de hoy." };
  }

  function validarImagen(file: File): string | null {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "La foto debe ser JPG, PNG o WEBP.";
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return "La foto no puede pesar más de 8MB.";
    }
    return null;
  }

  let imagenUrl: string | undefined;
  let portadaUrl: string | undefined;

  try {
    const actual = await getDailyCard();
    portadaUrl = actual?.portadaUrl;

    if (imagen instanceof File && imagen.size > 0) {
      const errorImagen = validarImagen(imagen);
      if (errorImagen) return { error: errorImagen };
      imagenUrl = await uploadDailyCardImage(imagen);
    } else {
      imagenUrl = actual?.imagenUrl;
    }

    if (!imagenUrl) {
      return { error: "Debes subir una foto para la sincronicidad de hoy." };
    }

    if (portada instanceof File && portada.size > 0) {
      const errorPortada = validarImagen(portada);
      if (errorPortada) return { error: errorPortada };
      portadaUrl = await uploadPortadaImage(portada);
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
        "No se pudo guardar. Revisa que BLOB_READ_WRITE_TOKEN esté configurado (Vercel → Storage → Blob).",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}
