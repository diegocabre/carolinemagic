import { z } from "zod";

/** Tipos de solicitud (derechos del titular, Ley 19.628 / Ley 21.719). */
export const TIPOS_SOLICITUD = {
  acceso: "Acceso: saber qué datos míos tienen",
  rectificacion: "Rectificación: corregir datos",
  supresion: "Supresión: eliminar mis datos",
  oposicion: "Oposición: dejar de usar mis datos para un fin",
  portabilidad: "Portabilidad: recibir mis datos",
  bloqueo: "Bloqueo: suspender temporalmente el uso",
  consentimiento: "Retirar mi consentimiento",
  otra: "Otra consulta sobre mis datos",
} as const;

export type TipoSolicitud = keyof typeof TIPOS_SOLICITUD;

export const RELACIONES = {
  titular: "Soy la persona titular de los datos",
  representante: "Represento a la persona titular (madre, padre, tutor o apoderado)",
} as const;

const tipos = Object.keys(TIPOS_SOLICITUD) as [TipoSolicitud, ...TipoSolicitud[]];
const relaciones = Object.keys(RELACIONES) as [
  keyof typeof RELACIONES,
  ...(keyof typeof RELACIONES)[],
];

/** Elimina caracteres de control (salvo saltos de línea) y espacios sobrantes. */
const textoLimpio = (min: number, max: number, mensaje: string) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim())
    .pipe(z.string().min(min, mensaje).max(max, `Máximo ${max} caracteres.`));

export const solicitudSchema = z.object({
  tipo: z.enum(tipos, { error: "Elige el tipo de solicitud." }),
  relacion: z.enum(relaciones, { error: "Indica tu relación con los datos." }),
  nombre: textoLimpio(2, 120, "Escribe tu nombre."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Escribe un correo válido." }).max(254)),
  telefono: z
    .string()
    .trim()
    .regex(/^$|^\+?[0-9 ]{8,20}$/, "Escribe solo números (puedes incluir +56).")
    .optional()
    .transform((v) => v || undefined),
  detalle: textoLimpio(10, 3000, "Cuéntanos tu solicitud (mínimo 10 caracteres)."),
  aceptaPolitica: z.literal("on", { error: "Debes confirmar que leíste la Política de Privacidad." }),
  declaraVeracidad: z.literal("on", { error: "Debes confirmar que la información es verdadera." }),
  // Campo trampa para bots: debe llegar vacío.
  sitioWeb: z.string().max(0).optional(),
});

export type SolicitudDerechos = z.infer<typeof solicitudSchema>;

export const ESTADOS_SOLICITUD = {
  recibida: "Recibida",
  en_proceso: "En proceso",
  prorrogada: "Prorrogada",
  respondida: "Respondida",
  rechazada: "Rechazada (con fundamento)",
} as const;

export type EstadoSolicitud = keyof typeof ESTADOS_SOLICITUD;
