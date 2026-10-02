# Inventario de datos personales — Caroline Magic

> **Documento interno.** Base para la Política de Privacidad, la Política de Cookies y el
> Registro de Actividades de Tratamiento (`docs/cumplimiento/`).
> Fecha del levantamiento: 2026-10-02 · Rama: `feat/seguridad-privacidad`.
>
> TODO(legal): las "bases de licitud" son una propuesta técnica, no una calificación jurídica.
> Deben ser validadas por un abogado (ver `docs/cumplimiento/LEGAL-REVISION.md`).

Normativa considerada: Ley 19.628 (vigente) y Ley 21.719 (vigencia plena el 1 de diciembre de 2026,
crea la Agencia de Protección de Datos Personales).

---

## 1. Método

Se recorrió todo `src/`, `public/`, `next.config.ts`, `package.json` y el historial de git. Se buscaron:
formularios, `searchParams`, cookies, `localStorage`/`sessionStorage`, scripts de terceros
(`next/script`), fuentes, `<iframe>`, `<video>`, enlaces externos, variables de entorno y
llamadas a servicios externos (`@vercel/blob`).

Hallazgos del estado **anterior** a esta rama (punto de partida):

| Elemento | Hallazgo |
|---|---|
| Formularios públicos | **Ninguno.** El sitio no tiene formularios de contacto, reserva ni newsletter. |
| Query params / `searchParams` | **No se leen** en ninguna página. |
| Cookies propias | Solo `cm_admin_session` (panel admin). |
| `localStorage` / `sessionStorage` | No se usan. |
| Scripts de terceros | **Microsoft Clarity** (`layout.tsx`), cargado **sin consentimiento previo** y en todas las páginas, incluido `/admin`. Hace mapas de calor y **grabaciones de sesión**. |
| Fuentes | `next/font/google` (Playfair Display, Plus Jakarta Sans). Se descargan **en el build** y se sirven desde el propio dominio: el navegador del visitante **no** contacta a Google. |
| Embeds (`iframe`) | Ninguno. |
| Videos e imágenes | Todos locales (`/public`), salvo las imágenes de la "Sincronicidad del día", servidas desde Vercel Blob (`*.public.blob.vercel-storage.com`). |
| Enlaces externos | `wa.me` (WhatsApp), Instagram, YouTube (enlace genérico `https://youtube.com`, sin canal). Son solo enlaces: no transfieren datos hasta que la persona hace clic. |
| Verificación Google Search Console | Archivo estático `public/googlec9e1456a3d8383ce.html`. No recoge datos de visitantes. |

---

## 2. Tabla de tratamientos

Leyenda — **Sale de Chile**: Sí = el dato se almacena o procesa fuera de Chile (transferencia internacional).

### 2.1 Dentro del sitio web

| # | Dato | Dónde se captura | Finalidad | Base de licitud (propuesta) | Dónde se almacena | Quién lo recibe | Plazo | Sale de Chile |
|---|---|---|---|---|---|---|---|---|
| W1 | Dirección IP, user-agent, URL visitada, fecha/hora, referer | Cualquier visita (servidor) | Servir el sitio, seguridad, diagnóstico de errores | Interés legítimo (seguridad y funcionamiento) | Logs de Vercel | **Vercel Inc.** (encargado) | Según plan de Vercel (Hobby ≈ 1 h; Pro ≈ 1 día de runtime logs). TODO(diego): confirmar plan | Sí (EE. UU., región por defecto `iad1`) |
| W2 | Comportamiento de navegación: clics, scroll, movimientos, **grabación de la sesión**, dispositivo, país aproximado, ID de visitante | Script de Microsoft Clarity | Analítica y mejora del sitio | **Consentimiento** (no es estrictamente necesario) — **antes de esta rama se cargaba sin consentimiento** | Servidores de Microsoft | **Microsoft Corporation** (encargado / tercero según sus términos) | Clarity conserva grabaciones ≈ 30 días y datos agregados hasta 13 meses (verificar en términos vigentes) | Sí (EE. UU.) |
| W3 | Cookies de Clarity (`_clck`, `_clsk`, y en dominios de Microsoft `CLID`, `MUID`, `ANONCHK`, `SM`, `MR`) | Navegador, tras cargar Clarity | Identificar visitante/sesión para W2 | Consentimiento | Navegador + Microsoft | Microsoft | `_clck` 1 año; `_clsk` 1 día; resto según Microsoft | Sí |
| W4 | Mensaje predefinido de WhatsApp (p. ej. "quiero solicitar un ritual de: **Salud & Bienestar**") + nombre del servicio | Botones/enlaces `wa.me` (texto en `src/config/whatsapp.ts`) | Iniciar la conversación de consulta/reserva | Consentimiento / medidas precontractuales (la persona decide enviar el mensaje) | Viaja en la URL hacia `wa.me` (Meta) y luego en la app de WhatsApp | **Meta Platforms / WhatsApp** (tercero, con su propia política) | El sitio no lo guarda | Sí |
| W5 | Credenciales de Caroline (correo, clave) | `/admin/login` | Acceso al panel | Ejecución de la relación / interés legítimo (seguridad) | Variables de entorno de Vercel (correo y **hash** de la clave tras esta rama) | Vercel (encargado) | Mientras exista la cuenta | Sí |
| W6 | Cookie de sesión admin `cm_admin_session` (correo del admin, id de sesión, expiración, firma HMAC) | Navegador de Caroline | Mantener la sesión del panel | Estrictamente necesaria | Navegador; id de sesión en Upstash Redis (tras esta rama) | Upstash (encargado) | 12 h deslizantes, máx. 3 días (tras esta rama; antes 7 días) | Sí (según región de Upstash) |
| W7 | IP + correo intentado en el login (para rate limit) | `/admin/login` (tras esta rama) | Prevenir fuerza bruta | Interés legítimo (seguridad) | Upstash Redis, claves con hash | Upstash (encargado) | ≤ 1 hora (TTL) | Según región de Upstash |
| W8 | Fotos y texto de la "Sincronicidad del día" | `/admin` → `/api/admin/blob-upload` | Publicar contenido | No son datos de visitantes. Son contenido de Caroline. **Riesgo:** si una foto muestra a terceros o metadatos EXIF (GPS) | Vercel Blob (público) | Vercel; cualquier visitante | Hasta que se reemplace/elimine | Sí |
| W9 | Formulario de derechos (`/derechos-datos`, **nuevo en esta rama**): tipo de solicitud, nombre, correo, teléfono opcional, detalle | Formulario | Atender derechos del titular y acreditar plazos | Obligación legal | Correo del responsable (vía Resend) + registro mínimo **sin datos de contacto** en Upstash (id, fecha, tipo, estado) | Resend (encargado), Upstash (encargado) | Ver `docs/cumplimiento/POLITICA-RETENCION.md` | Sí |
| W10 | Preferencia de cookies `cm_consent` (**nuevo**) | Banner de cookies | Recordar la elección | Estrictamente necesaria | Navegador | Nadie | 180 días | No |

### 2.2 Fuera del sitio, pero parte del servicio (el sitio dirige a estos canales)

El sitio anuncia que las sesiones son por Zoom o presenciales, con **grabación de audio** y **mapa en PDF**,
y que la reserva y el pago se coordinan por WhatsApp. Esos tratamientos los hace el negocio, no el código,
pero **deben** estar en la Política de Privacidad.

| # | Dato | Canal | Finalidad | Base de licitud (propuesta) | Quién lo recibe | Plazo | Sale de Chile |
|---|---|---|---|---|---|---|---|
| F1 | Nombre, número de teléfono, foto de perfil, contenido de la conversación (motivo de consulta) | WhatsApp de Caroline | Responder consultas, agendar, coordinar | Consentimiento / medidas precontractuales y ejecución del contrato | Meta/WhatsApp (tercero). Si se activa el bot n8n + WhatsApp Business API: Meta como encargado + n8n (y su hosting) | TODO(diego): definir (propuesta: 12 meses desde el último contacto) | Sí |
| F2 | Imagen, voz y contenido de la sesión en vivo | Zoom | Prestar la sesión online | Ejecución del contrato | Zoom Video Communications (encargado) | Solo durante la sesión, salvo grabación | Sí |
| F3 | **Grabación de audio** de la sesión y **mapa en PDF** | Enviado al cliente (¿WhatsApp, correo, Drive?) TODO(diego) | Entregar el material al cliente | Ejecución del contrato; la grabación puede contener datos sensibles → requiere consentimiento expreso | Canal de envío + almacenamiento de Caroline | TODO(diego): definir (propuesta: borrar copia propia a los 30 días de entregada) | Probablemente sí |
| F4 | Datos de pago (titular, banco, comprobante de transferencia) | Coordinado por WhatsApp | Cobro | Ejecución del contrato; obligación tributaria | Banco / medio de pago | 6 años (obligaciones tributarias, verificar con contador) | Depende del medio |
| F5 | Datos de participantes de encuentros grupales/presenciales y alumnos de la Academia | Presencial / WhatsApp | Inscripción, asistencia, material | Ejecución del contrato | — | TODO(diego) | Depende |

---

## 3. Datos sensibles: dónde aparecen o podrían aparecer

Por el rubro, **el motivo de una consulta** puede revelar datos sensibles según la ley chilena:
salud física o mental, vida sexual y afectiva, convicciones religiosas, espirituales o filosóficas,
situación familiar, duelos.

| Punto del flujo | ¿El sitio lo toca? | Riesgo |
|---|---|---|
| Mensajes predefinidos de WhatsApp | **Sí, indirectamente.** El texto `"Hola, quiero solicitar un ritual de: Salud & Bienestar"` o `"Amor & Vínculos"` revela un interés en salud/vida afectiva. Viaja en la URL a `wa.me` y luego queda en la conversación. | Medio. Recomendación: usar un texto neutro para rituales/sesiones de temas sensibles (p. ej. "quiero información sobre un ritual") y que la persona decida cuánto contar. **No se cambió el copy comercial sin consultarte.** |
| `orientacionSesion`: "Quiero contarles qué estoy viviendo" | Invita a compartir el motivo por WhatsApp | Alto en el canal WhatsApp (fuera del sitio). |
| Microsoft Clarity | Graba la sesión de navegación: qué servicios mira la persona (p. ej. "Salud & Bienestar", "Pareja Ideal"). Si hubiera campos de texto, podría capturarlos. | Alto antes de esta rama (sin consentimiento). Mitigado: solo carga con consentimiento, nunca en `/admin` ni `/derechos-datos`, y el formulario se marca con `data-clarity-mask`. Configurar enmascaramiento "Strict" en el panel de Clarity (acción manual). |
| Formulario `/derechos-datos` (nuevo) | El campo "detalle" podría recibir datos sensibles | Bajo/medio. El formulario pide explícitamente no incluir datos de salud ni documentos. |
| Zoom, grabaciones, PDF (fuera del sitio) | No | **Alto**: es donde más datos sensibles se tratan. |

**Principio adoptado:** el sitio **no solicita** datos sensibles. Lo que la persona decida contar por WhatsApp o en sesión
queda bajo su decisión, se trata con confidencialidad y solo para prestar el servicio.

## 4. Menores de edad

- El sitio no verifica edad en ningún punto (no hay formularios, salvo el nuevo de derechos).
- Un menor puede tocar un botón de WhatsApp y escribir. El contenido (tarot, rituales de amor/salud, constelaciones) no está dirigido a menores.
- Mitigaciones: Términos y Política declaran que el servicio es para mayores de 18 años y que un menor requiere autorización de sus representantes;
  recomendación operacional: preguntar la edad al agendar por WhatsApp y no atender a menores sin autorización (acción manual).

## 5. Datos que el sitio NO recoge hoy (y se sumarían al crecer)

| Funcionalidad futura | Datos nuevos | Qué habría que hacer |
|---|---|---|
| Reservas en línea | Nombre, correo, teléfono, fecha/hora, servicio, notas (riesgo de sensibles en "notas") | `ConsentCheckbox`, no pedir motivo en texto libre o advertir, nuevo encargado (Calendly/Cal.com/BD), actualizar política y registro |
| Pagos en línea | Datos de facturación, id de transacción (la tarjeta la trata la pasarela: Webpay/Mercado Pago/Flow) | Pasarela como responsable/encargado, boleta electrónica (SII), retracto Ley 19.496 |
| Newsletter | Correo, nombre, aperturas/clics | Consentimiento específico no premarcado, doble opt-in, baja en un clic |
| Formulario de contacto | Nombre, correo, mensaje | Consentimiento, plazo de conservación |
| Cuentas de alumnos / cursos grabados | Credenciales, progreso, compras | Seguridad de cuentas, política de retención |
| Testimonios con nombre/foto | Imagen y nombre del cliente | Consentimiento escrito y revocable |
| Analítica adicional (GA4, Meta Pixel) | Identificadores publicitarios | Solo tras consentimiento, añadir a CSP y a la política de cookies |

## 6. Variables de entorno (solo nombres)

`ADMIN_EMAIL`, `ADMIN_PASSWORD` (deprecada en esta rama), `ADMIN_PASSWORD_HASH` (nueva), `ADMIN_AUTH_SECRET`,
`NEXT_PUBLIC_WHATSAPP_NUMBER`, `BLOB_READ_WRITE_TOKEN` (la usa `@vercel/blob` implícitamente),
`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RESEND_API_KEY`, `LEGAL_EMAIL_FROM` (nuevas).

Historial de git: `git log --all --full-history -- '.env*'` no devuelve commits → **ningún archivo `.env*` se ha subido nunca**.
