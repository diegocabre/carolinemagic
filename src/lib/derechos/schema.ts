/** Tipos de solicitud (derechos del titular, Ley 19.628 / Ley 21.719). */
export const TIPOS_SOLICITUD = {
  acceso: "Acceso: saber qué datos tienen",
  rectificacion: "Rectificación: corregir datos",
  supresion: "Supresión: eliminar datos",
  oposicion: "Oposición: dejar de usar datos para un fin",
  portabilidad: "Portabilidad: recibir los datos",
  bloqueo: "Bloqueo: suspender temporalmente el uso",
  consentimiento: "Retiro del consentimiento",
  otra: "Otra consulta sobre datos",
} as const;

export type TipoSolicitud = keyof typeof TIPOS_SOLICITUD;

/** Canales por los que llega una solicitud. */
export const CANALES_SOLICITUD = {
  whatsapp: "WhatsApp",
  correo: "Correo",
  presencial: "Presencial / otro",
} as const;

export type CanalSolicitud = keyof typeof CANALES_SOLICITUD;

export const ESTADOS_SOLICITUD = {
  recibida: "Recibida",
  en_proceso: "En proceso",
  prorrogada: "Prorrogada",
  respondida: "Respondida",
  rechazada: "Rechazada (con fundamento)",
} as const;

export type EstadoSolicitud = keyof typeof ESTADOS_SOLICITUD;

export function esTipoSolicitud(valor: string): valor is TipoSolicitud {
  return Object.hasOwn(TIPOS_SOLICITUD, valor);
}

export function esCanalSolicitud(valor: string): valor is CanalSolicitud {
  return Object.hasOwn(CANALES_SOLICITUD, valor);
}

export function esEstadoSolicitud(valor: string): valor is EstadoSolicitud {
  return Object.hasOwn(ESTADOS_SOLICITUD, valor);
}
