/**
 * ============================================================================
 * DATOS LEGALES DEL RESPONSABLE — CAROLINE MAGIC
 * ============================================================================
 *
 * Única fuente de verdad para todas las páginas legales (/privacidad,
 * /cookies, /terminos, /derechos-datos, /seguridad), el security.txt y los
 * correos de solicitudes de derechos.
 *
 * TODO(diego): completar TODOS los valores marcados con `TODO(diego)`.
 * Mientras alguno quede pendiente, `next build` muestra una advertencia
 * (ver `pendingLegalFields` y next.config.ts). No se inventan datos: si un
 * valor no aplica, déjalo explícito y avisa al abogado.
 *
 * TODO(legal): todos los textos legales del sitio requieren revisión de un
 * abogado antes de publicarse. Ver docs/cumplimiento/LEGAL-REVISION.md.
 *
 * Este archivo NO debe importar nada de Next.js: lo lee next.config.ts.
 */

export const TODO_MARKER = "TODO(diego)";

export const LEGAL = {
  /** Nombre comercial que ve el público. */
  nombreComercial: "Caroline Magic",
  /** Razón social o nombre completo de la persona natural responsable. */
  razonSocial: "TODO(diego): razón social o nombre completo del responsable",
  /** RUT del responsable (persona natural o jurídica). */
  rut: "TODO(diego): RUT",
  /** Domicilio para efectos legales y notificaciones. */
  domicilio: "TODO(diego): domicilio (calle, número, comuna, ciudad)",
  /** Correo para solicitudes de privacidad y ejercicio de derechos. */
  emailPrivacidad: "TODO(diego): correo de privacidad (ej. privacidad@carolinemagic.cl)",
  /** Correo para reportes de seguridad (security.txt y /seguridad). */
  emailSeguridad: "TODO(diego): correo de seguridad (ej. seguridad@carolinemagic.cl)",
  /** Correo de contacto general / reclamos de consumidores. */
  emailContacto: "TODO(diego): correo de contacto general",
  /**
   * Persona a cargo de las solicitudes de datos y de incidentes de seguridad
   * (puede ser la misma Caroline). Uso interno y en la política.
   */
  responsableDatos: "TODO(diego): nombre de la persona encargada de privacidad",
  /** Dominio público del sitio, sin barra final. */
  sitioUrl: "https://www.carolinemagic.cl",
  /**
   * Fecha de caducidad del security.txt (RFC 9116: menos de un año hacia
   * adelante). Renuévala cada año.
   */
  securityTxtExpira: "2027-09-30T23:59:59.000Z",
} as const;

/** Historial de versiones de los textos legales. La primera fila es la vigente. */
export const VERSIONES_LEGALES: ReadonlyArray<{
  version: string;
  fecha: string;
  cambios: string;
}> = [
  {
    version: "1.0 (borrador)",
    fecha: "2026-10-02",
    cambios:
      "Primera versión de la Política de Privacidad, Política de Cookies y Términos y Condiciones. Pendiente de revisión legal.",
  },
];

export const FECHA_ULTIMA_ACTUALIZACION = VERSIONES_LEGALES[0].fecha;

/**
 * Plazos de respuesta a solicitudes de derechos, en días corridos.
 * TODO(legal): confirmar con el abogado los plazos aplicables (Ley 19.628
 * mientras rija; Ley 21.719 desde el 1 de diciembre de 2026).
 */
export const PLAZO_RESPUESTA_DIAS = 30;
export const PLAZO_PRORROGA_DIAS = 30;

/** Devuelve el valor o `null` si sigue pendiente (para mostrarlo con aviso). */
export function valorLegal(valor: string): string | null {
  return valor.startsWith(TODO_MARKER) ? null : valor;
}

/** Nombres de los campos que siguen con TODO. */
export function pendingLegalFields(): string[] {
  return Object.entries(LEGAL)
    .filter(([, valor]) => valor.startsWith(TODO_MARKER))
    .map(([clave]) => clave);
}
