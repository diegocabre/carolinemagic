# Guía de privacidad para desarrollar en Caroline Magic

Lista corta para cualquier cambio que toque datos personales. Si dudas, pregunta antes de publicar.

## 1. Antes de agregar un formulario (reservas, newsletter, contacto…)

- [ ] **Pide solo lo necesario.** Cada campo debe tener una finalidad concreta. Nada de "fecha de nacimiento" o "motivo de consulta" si no se usa.
- [ ] **No pidas datos sensibles** (salud, vida sexual, creencias, etc.). Si hay un campo de texto libre, agrega una advertencia como la de `/derechos-datos`.
- [ ] Usa `ConsentCheckbox` (`src/components/legal/ConsentCheckbox.tsx`):
  ```tsx
  <ConsentCheckbox
    name="aceptaNewsletter"
    finalidad="Quiero recibir el newsletter mensual de Caroline Magic por correo. Puedo darme de baja cuando quiera."
    error={state.errores?.aceptaNewsletter}
  />
  ```
  - **Nunca premarcada.** Una casilla por finalidad (no mezclar "términos + newsletter").
  - En el servidor valida con `z.literal("on")` y guarda **fecha + versión de la política** (`VERSIONES_LEGALES[0].version`) como prueba del consentimiento.
- [ ] Valida todo en el servidor con **zod** (ver `src/lib/derechos/schema.ts`): largo máximo, formato y limpieza de caracteres de control. Lee solo los campos esperados del `FormData`.
- [ ] **Rate limit** con `registrarIntento()` (`src/lib/security/rateLimit.ts`) y campo trampa (`sitioWeb`) contra bots.
- [ ] Verifica el origen con `isSameOrigin(await headers())` en la server action.
- [ ] Agrega `data-clarity-mask="true"` al `<form>`.
- [ ] Si la ruta no debe tener analítica, agrégala a `RUTAS_SIN_ANALITICA` (`src/lib/consent.ts`).

## 2. Antes de agregar un servicio externo (script, embed, API)

- [ ] ¿Es **estrictamente necesario**? Si no (analítica, píxeles, chat, videos de YouTube incrustados), **solo puede cargarse tras consentimiento** desde `ConsentBanner`. Sube `CONSENT_VERSION` para volver a preguntar.
- [ ] Agrega sus dominios a la CSP (`src/lib/security/csp.ts`) — solo las directivas que necesita.
- [ ] Actualiza: `INVENTARIO-DATOS.md`, tabla de `/cookies`, proveedores en `/privacidad`, `docs/cumplimiento/CHECKLIST-PROVEEDORES.md` y `REGISTRO-ACTIVIDADES-TRATAMIENTO.md`.
- [ ] Revisa si transfiere datos fuera de Chile y qué contrato de tratamiento ofrece.
- [ ] Prefiere enlaces a embeds (un `<a>` a YouTube no transfiere datos; un `<iframe>` sí). Si incrustas YouTube, usa `youtube-nocookie.com` y carga tras consentimiento.

## 3. Logs y errores

- Nunca registres en `console.*` nombres, correos, teléfonos, IP, mensajes ni el contenido de formularios. Registra **identificadores** (p. ej. número de solicitud).
- Nunca imprimas variables de entorno ni tokens.

## 4. Datos y secretos

- Nuevas variables: agrégalas a `.env.example` **sin valor** y a Vercel (Production y Preview).
- Upstash se usa para datos de seguridad de vida corta y el registro mínimo de solicitudes. No guardes allí datos personales en claro: usa `hashIdentificador()` para IP/correos en claves.
- Define un **plazo de conservación** (TTL) para todo lo que guardes y anótalo en `docs/cumplimiento/POLITICA-RETENCION.md`.

## 5. Textos legales

- Datos del responsable: **solo** en `src/config/legal.ts`.
- Cualquier cambio de fondo en `/privacidad`, `/cookies` o `/terminos`: agrega una fila en `VERSIONES_LEGALES` y pásalo por revisión legal (`LEGAL-REVISION.md`).

## 6. Validación de entradas existente (estado actual)

| Entrada | Dónde | Validación |
|---|---|---|
| Login admin (correo, clave) | `src/lib/actions/admin.ts` | Tipos, largo máximo, rate limit + bloqueo, origen, hash scrypt |
| Sincronicidad del día (título, texto, URLs) | `saveDailyCardAction` | Sesión, origen, largo máximo, URL de nuestro store Blob en `admin/`, firma binaria real de la imagen |
| Token de subida a Blob | `/api/admin/blob-upload` | Sesión, origen, tamaño del cuerpo, solo evento `generate-client-token`, ruta con UUID y extensión en lista blanca, tipos y tamaño máximos |
| Estado de solicitudes | `actualizarEstadoSolicitudAction` | Sesión, origen, id con formato fijo, estado en lista cerrada |
| Formulario de derechos | `enviarSolicitudDerechosAction` | zod, campos permitidos, rate limit, honeypot, origen |
| Query params | — | **El sitio no lee query params** en ninguna página (verificado). |
| Mensajes de WhatsApp | `getWhatsAppUrl` | Texto fijo del código + `encodeURIComponent`; número solo dígitos |
