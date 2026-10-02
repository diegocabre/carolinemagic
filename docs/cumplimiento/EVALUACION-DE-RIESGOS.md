# Evaluación de riesgos de privacidad y seguridad

> **Documento interno — no publicar.** Fecha: 2026-10-02. Revisar cada 6 meses o ante un cambio relevante
> (reservas en línea, pagos, bot de WhatsApp, newsletter).
> Escala: Probabilidad (B/M/A) × Impacto (B/M/A).

| # | Riesgo | P | I | Mitigación aplicada en el código | Riesgo residual / acción pendiente |
|---|---|---|---|---|---|
| R1 | Analítica (grabaciones de sesión) sin consentimiento | — | A | **Antes: ocurría.** Ahora Clarity solo se carga tras aceptar; rechazar cuesta lo mismo; se puede revocar; nunca en `/admin` ni `/derechos-datos` | Configurar enmascaramiento Strict en Clarity (manual) |
| R2 | Fuerza bruta al panel admin | M | A | Hash scrypt, rate limit (5 fallos/15 min por IP+correo; 20/h por IP), mensajes genéricos, falla segura sin Upstash | Considerar 2FA (TOTP) para el panel |
| R3 | Robo de sesión admin (XSS, CSRF, cookie) | B | A | CSP con nonce y `strict-dynamic`, cookie httpOnly/secure/SameSite=Strict, 12 h + máx. 3 días, sesión revocable en servidor, validación de Origin | `style-src 'unsafe-inline'` (justificado por framer-motion) |
| R4 | Subida de archivos maliciosos | B | M | Sesión, ruta con UUID, lista blanca de tipos, 8 MB, verificación de firma binaria real y borrado si no coincide | — |
| R5 | Fotos con ubicación GPS (EXIF) publicadas | M | M | Re-codificación en el navegador antes de subir (elimina EXIF) | En navegadores muy antiguos se sube el original |
| R6 | Filtración de secretos | B | A | `.gitignore` cubre `.env*`; historial verificado limpio; `.env.example` sin valores | Activar secret scanning en GitHub; 2FA en Vercel/GitHub |
| R7 | Datos sensibles en WhatsApp (motivo de consulta) | A | A | Aviso junto a botones; política explica el tratamiento; el sitio no pide sensibles | **Fuera del código:** proteger el teléfono, 2FA de WhatsApp, borrar chats según retención, decidir sobre mensajes predefinidos que mencionan "Salud & Bienestar" |
| R8 | Grabaciones de sesiones (sensibles) mal almacenadas o enviadas a la persona equivocada | M | A | — (fuera del sitio) | Consentimiento expreso antes de grabar, almacenamiento cifrado, borrar copia a los 30 días, verificar destinatario |
| R9 | Menores de edad usando el servicio | M | A | Términos y política: solo mayores de 18 o con autorización | Preguntar la edad al agendar (manual) |
| R10 | Bot n8n + WhatsApp API (stand-by) | — | A | — | Antes de activarlo: evaluación específica, DPA con Meta y n8n, minimizar lo que guarda el bot |
| R11 | Dependencias vulnerables | M | A | Next actualizado a 16.3.8 (corrige RCE en `next/og`), `npm audit` limpio, Dependabot semanal | Revisar y fusionar PRs de Dependabot |
| R12 | Suplantación al pedir datos de otra persona | M | A | Sin formulario web (no hay superficie de spam); la página explica que se verificará la identidad | Procedimiento manual: responder solo al mismo número/correo usado antes; no entregar datos a terceros sin acreditación |
| R13 | Clickjacking / sniffing / fuga por Referer | B | M | `frame-ancestors 'none'`, X-Frame-Options, nosniff, Referrer-Policy, `rel="noopener noreferrer"` | — |
| R14 | Indexación del panel admin | B | B | `noindex`, `X-Robots-Tag`, `Disallow` en robots, `no-store`, fuera del sitemap | — |
| R15 | Transferencias internacionales sin garantías | A | M | Política informa países y proveedores | Revisar DPAs (CHECKLIST-PROVEEDORES) y mecanismo bajo Ley 21.719 |
| R16 | Rendimiento por render dinámico (requisito del nonce) | A | B | Páginas livianas; imágenes optimizadas por Next | Si el costo o la latencia molestan: volver a CSP sin nonce (`'unsafe-inline'` en scripts) o probar SRI experimental |
| R17 | Incumplimiento de plazos de respuesta a solicitudes | M | M | Registro con fecha de vencimiento y alerta de "plazo vencido" en `/admin` | **Depende de que Caroline registre cada solicitud** que llegue por WhatsApp/correo; revisar `/admin` semanalmente |
