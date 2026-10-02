# Checklist de proveedores (encargados y terceros)

> **Documento interno — no publicar.**
> "Encargado" = trata datos por cuenta y según instrucciones de Caroline Magic.
> "Tercero / responsable independiente" = trata los datos también para sus propios fines, con su propia política.
> TODO(legal): confirmar la calificación de cada proveedor y el mecanismo de transferencia internacional.

| Proveedor | Servicio | Rol (propuesto) | País de tratamiento | Datos | Documento a revisar / aceptar | Estado |
|---|---|---|---|---|---|---|
| **Vercel Inc.** | Hosting, logs, Blob | Encargado | EE. UU. (región `iad1` por defecto) | IP, logs, imágenes publicadas | Data Processing Addendum (DPA) de Vercel (`vercel.com/legal/dpa`); revisar región de funciones | [ ] Revisado |
| **Upstash Inc.** | Redis (rate limit, sesiones, registro de solicitudes) | Encargado | Según región elegida al crear la base (elegir la más cercana; no hay región en Chile) | Hashes de IP/correo, ids de sesión, registro sin datos de contacto. **Base compartida con otro proyecto**: claves con prefijo `cm:`; si se filtra el token de cualquiera de los dos proyectos, rotarlo en ambos | DPA de Upstash (`upstash.com/trust/dpa.pdf`), términos | [ ] Base creada · [ ] DPA revisado |
| **Resend Inc.** | Envío de correos de solicitudes de derechos | Encargado | EE. UU. | Nombre, correo, detalle de la solicitud | DPA de Resend; verificar dominio (SPF/DKIM) | [ ] Cuenta · [ ] Dominio verificado · [ ] DPA |
| **Microsoft Corporation** | Clarity (analítica) | Encargado / responsable conjunto según términos de Clarity | EE. UU. | ID de visitante, interacción, grabaciones | Términos de uso de Clarity y Microsoft Products and Services DPA; activar enmascaramiento "Strict"; desactivar integración con Microsoft Ads | [ ] Revisado · [ ] Enmascaramiento Strict |
| **Meta Platforms / WhatsApp** | Mensajería con clientes | Tercero (app WhatsApp / WhatsApp Business app). Si se usa WhatsApp Business **API (Cloud API)**: Meta pasa a ser encargado | EE. UU. y otros | Teléfono, nombre, mensajes | Política de privacidad de WhatsApp; si se usa la API: WhatsApp Business Terms + Data Processing Terms | [ ] Revisado |
| **n8n** (bot, en stand-by) | Automatización de WhatsApp | Encargado (y su hosting) | TODO | Mensajes completos de clientes (¡posibles datos sensibles!) | DPA de n8n Cloud o del hosting si es autoalojado; **evaluación de riesgos antes de activar** | [ ] Pendiente |
| **Zoom Video Communications** | Sesiones online | Encargado | EE. UU. | Imagen, voz, nombre | DPA de Zoom; desactivar grabación en la nube si no se usa | [ ] Revisado |
| **GitHub** | Repositorio de código | Encargado (no debería contener datos personales) | EE. UU. | Ninguno (verificar) | Términos; activar 2FA, Dependabot, secret scanning | [ ] 2FA |
| **Google** | Search Console; Google Fonts solo en build | Tercero | EE. UU. | Ninguno de visitantes | — | — |
| **Almacenamiento de grabaciones** | TODO(diego): Drive / iCloud / disco local | Encargado | TODO | Grabaciones (sensibles) | DPA del proveedor; cifrado | [ ] Pendiente |
| **Banco / medio de pago** | Cobros | Tercero | Chile | Datos de pago | — | — |

## Para cada encargado

- [ ] ¿Existe contrato o términos de tratamiento de datos (DPA) aceptados?
- [ ] ¿Indica medidas de seguridad, confidencialidad y subencargados?
- [ ] ¿Notifica brechas al cliente? ¿En qué plazo?
- [ ] ¿Permite eliminar los datos al terminar el servicio?
- [ ] ¿Ofrece garantías para transferencias internacionales?
- [ ] Cuenta protegida con 2FA y acceso solo para quien lo necesita.
