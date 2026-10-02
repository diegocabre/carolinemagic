# Registro de Actividades de Tratamiento (RAT)

> **Documento interno — no publicar.** Basado en `INVENTARIO-DATOS.md` (2026-10-02).
> TODO(legal): validar bases de licitud, plazos y transferencias con un abogado.
> TODO(diego): completar los campos marcados y revisar este registro cada 6 meses o ante cualquier cambio.

**Responsable:** ver `src/config/legal.ts` (razón social, RUT, domicilio, correo de privacidad).
**Persona a cargo:** `LEGAL.responsableDatos` (TODO).
**Última revisión:** 2026-10-02.

| ID | Actividad | Finalidad | Categorías de titulares | Categorías de datos | ¿Sensibles? | Base de licitud (propuesta) | Encargados / destinatarios | Transferencia internacional | Plazo de conservación | Medidas de seguridad |
|---|---|---|---|---|---|---|---|---|---|---|
| T1 | Operación del sitio web | Servir el sitio, seguridad, diagnóstico | Visitantes | IP, user-agent, URL, fecha/hora | No | Interés legítimo | Vercel Inc. | EE. UU. | Según plan de Vercel (horas a días) | HTTPS, HSTS, CSP, cabeceras |
| T2 | Analítica web | Medir uso y mejorar el sitio | Visitantes que aceptan | ID de visitante, interacción, grabación de sesión, dispositivo, país aproximado | No (riesgo indirecto: qué servicios mira) | Consentimiento | Microsoft (Clarity) | EE. UU. | ≈30 días grabaciones; hasta 13 meses agregados | Solo tras consentimiento; excluido de `/admin` y `/derechos-datos`; enmascaramiento |
| T3 | Consultas y reservas | Responder, agendar, coordinar | Clientes y potenciales clientes | Nombre, teléfono, foto de perfil, mensajes | **Posible** (motivo de consulta) | Consentimiento / medidas precontractuales | Meta/WhatsApp (tercero); n8n si se activa el bot | EE. UU. y otros | TODO(diego) — propuesta 12 meses desde último contacto | Acceso solo de Caroline; teléfono con bloqueo; verificación en dos pasos de WhatsApp |
| T4 | Prestación de sesiones | Ejecutar el servicio contratado | Clientes | Imagen, voz, contenido de la sesión | **Sí, probable** | Ejecución del contrato + consentimiento expreso para datos sensibles | Zoom | EE. UU. | Durante la sesión | Reuniones con contraseña / sala de espera |
| T5 | Grabaciones y material PDF | Entregar el material al cliente | Clientes | Audio de la sesión, notas, mapa PDF | **Sí, probable** | Consentimiento expreso | TODO(diego): canal de envío y almacenamiento | TODO | TODO(diego) — propuesta borrar copia propia a 30 días | Almacenamiento cifrado; enlaces con expiración |
| T6 | Cobros y facturación | Cobrar y cumplir obligaciones tributarias | Clientes | Nombre, RUT (si boleta/factura), comprobante de pago | No | Contrato + obligación legal | Banco / medio de pago; SII | Depende | 6 años (verificar con contador) | Acceso restringido |
| T7 | Academia y encuentros | Inscripción, asistencia, material | Alumnos, participantes | Nombre, contacto, asistencia, pagos | Posible (en encuentros sistémicos) | Contrato | TODO | TODO | TODO | TODO |
| T8 | Panel de administración | Gestionar el contenido del sitio | Administradora | Correo, hash de clave, sesión, IP hasheada para rate limit | No | Interés legítimo (seguridad) | Vercel, Upstash | EE. UU. / región Upstash | Sesión 12 h–3 días; intentos ≤ 1 h | scrypt, rate limit, cookie httpOnly/secure/strict, sesión revocable |
| T9 | Ejercicio de derechos | Atender solicitudes y acreditar plazos | Solicitantes / representantes | Nombre, correo, teléfono (opcional), detalle | Posible en el detalle (se advierte no incluirlos) | Obligación legal | Resend (correo), Upstash (registro mínimo sin datos de contacto) | EE. UU. | Correo 2 años; registro mínimo 3 años | Validación, rate limit, honeypot, registro sin datos personales |
| T10 | Preferencia de cookies | Recordar la elección | Visitantes | `cm_consent` | No | Estrictamente necesaria | — | No | 180 días | — |
| T11 | Seguridad (reportes de vulnerabilidad) | Recibir y gestionar reportes | Investigadores | Correo y contenido del reporte | No | Interés legítimo | Proveedor de correo | TODO | 2 años | — |
