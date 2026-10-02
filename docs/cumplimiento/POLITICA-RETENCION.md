# Política de retención y eliminación de datos

> **Documento interno — no publicar.** Los plazos marcados "propuesta" son decisiones de negocio
> pendientes (TODO(diego)) y deben quedar alineados con `/privacidad` (sección 6).
> TODO(legal): validar plazos con abogado y contador.

Principio: guardar los datos solo el tiempo necesario para su finalidad y luego **eliminarlos o anonimizarlos**.
Revisión de cumplimiento: **trimestral** (primer lunes de enero, abril, julio y octubre).

| Dato | Dónde | Plazo | Cómo se elimina | Automático |
|---|---|---|---|---|
| Logs del servidor | Vercel | Según plan (Hobby ≈ 1 h, Pro ≈ 1 día; log drains si se configuran) | Vercel los rota | Sí |
| Sesión admin | Cookie + Upstash | 12 h deslizantes, máx. 3 días | TTL de Redis / expiración de cookie / cierre de sesión | Sí |
| Contadores de rate limit (IP/correo con hash) | Upstash | ≤ 1 hora | TTL de @upstash/ratelimit | Sí |
| Preferencia de cookies `cm_consent` | Navegador | 180 días | Expira la cookie | Sí |
| Datos de Microsoft Clarity | Microsoft | ≈30 días grabaciones; hasta 13 meses agregados (según Microsoft) | Microsoft | Sí |
| Registro mínimo de solicitudes de derechos (id, tipo, fechas, estado) | Upstash | 3 años desde la última actualización (propuesta) | TTL de Redis | Sí |
| Correos de solicitudes de derechos | Bandeja de privacidad | 2 años desde el cierre (propuesta) | Borrado manual en revisión trimestral | No |
| Conversaciones de WhatsApp | Teléfono / WhatsApp | 12 meses desde el último contacto (propuesta) | Borrar chat (y copias de seguridad de WhatsApp en Google Drive/iCloud) | No |
| Grabaciones de sesiones | TODO(diego) | Copia propia: 30 días después de entregada (propuesta) | Borrado definitivo (incluida papelera y nube) | No |
| Mapas PDF y notas de sesión | TODO(diego) | Propuesta: 12 meses o lo que dure el proceso con el cliente | Borrado definitivo | No |
| Comprobantes de pago, boletas | TODO(diego) | 6 años (obligación tributaria; verificar con contador) | Borrado/destrucción segura | No |
| Datos de alumnos (Academia) | TODO(diego) | Duración de la formación + 2 años (propuesta, para certificados) | Borrado | No |
| Imágenes de la sincronicidad del día | Vercel Blob (público) | Mientras estén publicadas. Las versiones anteriores quedan en Blob: limpiar trimestralmente | Panel de Vercel → Storage → Blob → eliminar `admin/*` antiguos | No |
| Reportes de seguridad | Correo de seguridad | 2 años | Borrado manual | No |

## Supresión a pedido del titular

Cuando una persona pide la supresión (y no hay una obligación legal que obligue a conservar):
1. Buscar sus datos en: WhatsApp, correo, carpetas de grabaciones/PDF, registros de pago, listas de alumnos.
2. Borrar o anonimizar; dejar los datos tributarios que la ley obliga a conservar, con acceso restringido.
3. Recordar las **copias de seguridad** (WhatsApp en la nube, respaldos del computador).
4. Responder confirmando qué se borró y qué se conservó y por qué.
5. Actualizar el estado de la solicitud en `/admin`.
