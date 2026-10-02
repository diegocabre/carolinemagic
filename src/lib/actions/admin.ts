"use server";

import {
  createAdminSession,
  destroyAdminSession,
  hasValidAdminSession,
  verifyAdminCredentials,
} from "@/lib/adminAuth";
import { getDailyCard, saveDailyCard } from "@/lib/dailyCard";
import { actualizarEstado } from "@/lib/derechos/registro";
import { ESTADOS_SOLICITUD, type EstadoSolicitud } from "@/lib/derechos/schema";
import { clientIp, isSameOrigin } from "@/lib/security/origin";
import {
  consultarLimite,
  minutosParaReintentar,
  registrarIntento,
  reiniciarLimite,
} from "@/lib/security/rateLimit";
import {
  esUrlDeBlobPropia,
  verificarImagenSubida,
} from "@/lib/security/uploads";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface LoginState {
  error?: string;
}

const MAX_EMAIL = 254;
const MAX_PASSWORD = 256;
const MAX_TITULO = 120;
const MAX_INTERPRETACION = 5000;

const ERROR_ORIGEN = "Solicitud no válida. Recarga la página e inténtalo de nuevo.";

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const h = await headers();
  if (!isSameOrigin(h)) return { error: ERROR_ORIGEN };

  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");
  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const password = typeof passwordRaw === "string" ? passwordRaw : "";

  if (!email || !password) {
    return { error: "Ingresa tu correo y tu clave." };
  }
  if (email.length > MAX_EMAIL || password.length > MAX_PASSWORD) {
    return { error: "Correo o clave incorrectos." };
  }

  const ip = clientIp(h);
  const claveIpCorreo = `${ip}|${email}`;

  // 1. ¿Está bloqueado? (no consume intentos)
  const [porCorreo, porIp] = await Promise.all([
    consultarLimite("loginFallido", claveIpCorreo),
    consultarLimite("loginIp", ip),
  ]);
  if (porCorreo.estado === "no_disponible" || porIp.estado === "no_disponible") {
    console.error("[admin] Login rechazado: rate limit no disponible.");
    return { error: "El acceso está temporalmente deshabilitado. Intenta más tarde." };
  }
  const bloqueo = [porCorreo, porIp].find((e) => e.estado === "bloqueado");
  if (bloqueo && bloqueo.estado === "bloqueado") {
    return {
      error: `Demasiados intentos fallidos. Intenta de nuevo en ${minutosParaReintentar(bloqueo.reintentarEnSegundos)} min.`,
    };
  }

  // 2. Verificar credenciales
  if (!(await verifyAdminCredentials(email, password))) {
    await Promise.all([
      registrarIntento("loginFallido", claveIpCorreo),
      registrarIntento("loginIp", ip),
    ]);
    return { error: "Correo o clave incorrectos." };
  }

  // 3. Éxito: limpia contadores y emite una sesión nueva (rotación).
  await reiniciarLimite("loginFallido", claveIpCorreo);
  try {
    await createAdminSession(email);
  } catch (error) {
    console.error("[admin] No se pudo crear la sesión:", error);
    return { error: "El acceso está temporalmente deshabilitado. Intenta más tarde." };
  }
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  // El cierre de sesión siempre procede, pero solo desde el propio sitio.
  if (isSameOrigin(await headers())) {
    await destroyAdminSession();
  }
  redirect("/admin/login");
}

export interface DailyCardFormState {
  error?: string;
  success?: boolean;
}

async function descartarBlob(url: string): Promise<void> {
  await del(url).catch((error: unknown) => {
    console.error("[admin] No se pudo eliminar un archivo rechazado:", error);
  });
}

/**
 * Recibe las URLs de las imágenes (ya subidas directo a Blob desde el
 * navegador, ver /api/admin/blob-upload) junto con el texto, y guarda el
 * registro del día. Antes de publicar verifica que las imágenes nuevas sean
 * de nuestro store y que su contenido real sea JPEG, PNG o WEBP.
 */
export async function saveDailyCardAction(
  _prevState: DailyCardFormState,
  formData: FormData,
): Promise<DailyCardFormState> {
  if (!isSameOrigin(await headers())) return { error: ERROR_ORIGEN };
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
  if (interpretacion.length > MAX_INTERPRETACION) {
    return { error: `La interpretación no puede superar ${MAX_INTERPRETACION} caracteres.` };
  }
  if (typeof titulo === "string" && titulo.length > MAX_TITULO) {
    return { error: `El título no puede superar ${MAX_TITULO} caracteres.` };
  }

  const nuevas = [imagenUrlInput, portadaUrlInput].filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );

  for (const url of nuevas) {
    if (!esUrlDeBlobPropia(url)) {
      return { error: "La imagen no se subió correctamente. Intenta de nuevo." };
    }
  }
  for (const url of nuevas) {
    if (!(await verificarImagenSubida(url))) {
      await Promise.all(nuevas.map(descartarBlob));
      return { error: "El archivo no es una imagen JPG, PNG o WEBP válida." };
    }
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

/** Cambia el estado de una solicitud de derechos (registro mínimo, sin datos personales). */
export async function actualizarEstadoSolicitudAction(formData: FormData): Promise<void> {
  if (!isSameOrigin(await headers())) return;
  if (!(await hasValidAdminSession())) redirect("/admin/login");

  const id = formData.get("id");
  const estado = formData.get("estado");
  if (typeof id !== "string" || !/^SOL-\d{8}-[0-9A-F]{6}$/.test(id)) return;
  if (typeof estado !== "string" || !(estado in ESTADOS_SOLICITUD)) return;

  await actualizarEstado(id, estado as EstadoSolicitud);
  revalidatePath("/admin");
}
