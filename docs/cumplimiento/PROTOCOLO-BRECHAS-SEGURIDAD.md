# Protocolo ante vulneraciones de seguridad (brechas de datos)

> **Documento interno — no publicar.**
> TODO(legal): confirmar con un abogado los plazos y el contenido mínimo de las notificaciones a la
> Agencia de Protección de Datos Personales y a los titulares según la Ley 21.719 y su reglamento.
> Hasta el 1 de diciembre de 2026 rige la Ley 19.628, que no regula este deber en detalle.

**Responsable del protocolo:** TODO(diego): nombre, teléfono, correo.
**Suplente:** TODO(diego).
**Soporte técnico:** TODO(diego): quién tiene acceso a Vercel, Upstash, GitHub.

---

## 1. Detección (hora 0)

Qué cuenta como incidente: acceso no autorizado, pérdida, robo, divulgación o alteración de datos personales. Por ejemplo:
- Alguien entró al panel admin o a Vercel/GitHub/Upstash sin autorización.
- Se filtró un secreto (`ADMIN_AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`, `KV_REST_API_TOKEN`). **La base de Upstash se comparte con otro proyecto: si se filtra su token, rotarlo y actualizarlo en ambos.**
- Robo o pérdida del teléfono con las conversaciones de WhatsApp o del computador con grabaciones.
- Se envió por error una grabación o un PDF a otra persona.
- Un proveedor (Vercel, Meta, Zoom, Microsoft, Upstash) avisa de una brecha.

**Acción:** anotar de inmediato en el registro de incidentes (sección 6) la hora, quién lo detectó y qué se observó. No borrar evidencia.

## 2. Contención (primeras horas)

- [ ] Rotar secretos afectados en Vercel y redeploy:
  - `ADMIN_AUTH_SECRET` (invalida todas las sesiones del panel).
  - Nueva clave: `npm run admin:hash` → `ADMIN_PASSWORD_HASH`.
  - `BLOB_READ_WRITE_TOKEN` y el token de Upstash desde cada proveedor.
- [ ] Cambiar contraseñas y activar 2FA en Vercel, GitHub, Upstash, Meta/WhatsApp, Zoom, correo.
- [ ] Cerrar sesiones activas en WhatsApp Web / dispositivos vinculados.
- [ ] Si un archivo público en Blob expuso datos: eliminarlo.
- [ ] Teléfono perdido: borrado remoto, bloqueo de la SIM, recuperar WhatsApp en otro equipo.
- [ ] Revisar logs de Vercel (accesos a `/admin`, `/api/admin/*`).

## 3. Evaluación del riesgo (primeras 24–48 h)

Responder por escrito:
1. ¿Qué datos se afectaron? ¿Hay **datos sensibles** (salud, vida sexual, creencias), datos de **menores**, o datos financieros?
2. ¿Cuántas personas?
3. ¿Los datos estaban cifrados o eran ininteligibles?
4. ¿Qué daño pueden sufrir las personas (discriminación, daño reputacional, fraude, angustia)?
5. ¿El incidente sigue activo?

**Nivel de riesgo:** Bajo (sin datos personales o cifrados) · Medio · Alto (sensibles, menores, muchos titulares o daño probable).

## 4. Notificación

TODO(legal): confirmar plazos exactos y umbral de notificación.

- **Agencia de Protección de Datos Personales:** notificar sin dilación indebida cuando exista riesgo razonable para los derechos de los titulares, por los medios que la Agencia disponga.
- **Titulares afectados:** comunicar en lenguaje claro cuando el incidente involucre datos sensibles, de menores o financieros, o cuando el riesgo sea alto.
- **Proveedores:** si el origen está en un proveedor, coordinar con él.

### Plantilla de aviso a titulares

> **Asunto:** Aviso importante sobre tus datos personales — Caroline Magic
>
> Hola [nombre]:
>
> Te escribimos para contarte que el [fecha] detectamos [descripción breve y clara del incidente].
>
> **Qué datos tuyos pueden estar afectados:** [lista].
> **Qué hicimos:** [medidas de contención].
> **Qué te recomendamos:** [p. ej. desconfiar de mensajes que pidan pagos o datos en nuestro nombre].
> **Posibles consecuencias:** [descripción honesta].
>
> Lamentamos lo ocurrido. Si tienes dudas o quieres ejercer tus derechos, escríbenos a [correo de privacidad] o en [sitio]/derechos-datos.
> También puedes acudir a la Agencia de Protección de Datos Personales.
>
> [Nombre del responsable] — Caroline Magic

### Contenido mínimo del aviso a la Agencia (borrador)

Responsable y contacto · fecha y hora del incidente y de su detección · naturaleza del incidente · categorías y número aproximado de titulares y de registros · datos afectados (indicar si son sensibles) · consecuencias probables · medidas adoptadas y propuestas · si se notificó a los titulares.

## 5. Cierre y lecciones

- [ ] Causa raíz identificada.
- [ ] Medidas para evitar que se repita (actualizar `EVALUACION-DE-RIESGOS.md`).
- [ ] Registro del incidente completo.

## 6. Registro de incidentes

Todo incidente se registra, **aunque no se notifique**.

| N° | Fecha detección | Fecha incidente | Descripción | Datos / titulares afectados | Riesgo | Medidas | ¿Notificado a Agencia? (fecha) | ¿Notificado a titulares? (fecha) | Responsable | Cierre |
|---|---|---|---|---|---|---|---|---|---|---|
| — | — | — | (sin incidentes registrados) | — | — | — | — | — | — | — |
