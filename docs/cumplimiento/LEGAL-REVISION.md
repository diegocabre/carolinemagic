# Textos legales pendientes de revisión de un abogado

> ⚠️ **Ningún texto legal de este repositorio fue redactado ni revisado por un abogado.**
> Son borradores técnicos preparados a partir del inventario de datos (`INVENTARIO-DATOS.md`).
> **No afirman cumplimiento de la Ley 19.628, la Ley 21.719 ni la Ley 19.496.**
> No deben publicarse en producción sin revisión legal.
>
> En el código, cada texto lleva un comentario `TODO(legal)`. Buscar: `grep -rn "TODO(legal)" src`.

## 1. Textos generados

| Texto | Archivo | Público | Depende de decisiones del negocio |
|---|---|---|---|
| Política de Privacidad | `src/app/privacidad/page.tsx` | Sí | Datos del responsable; lista real de proveedores (Zoom, almacenamiento de grabaciones, banco); plazos de conservación; si se graban sesiones y cómo se entregan |
| Política de Cookies | `src/app/cookies/page.tsx` | Sí | Mantener o no Microsoft Clarity |
| Términos y Condiciones | `src/app/terminos/page.tsx` | Sí | Proceso de reserva y pago; **política de cancelación y reprogramación** (hoy con valores `[TODO]`); régimen tributario (IVA / boleta de honorarios); medios de pago; retracto |
| Página de derechos + formulario | `src/app/derechos-datos/page.tsx`, `src/components/legal/DerechosForm.tsx` | Sí | Procedimiento de verificación de identidad; plazos |
| Página de seguridad | `src/app/seguridad/page.tsx` | Sí | Plazo de acuse (5 días hábiles) |
| Aviso junto a WhatsApp | `src/components/legal/AvisoWhatsApp.tsx`, `src/components/WhatsAppButton.tsx` | Sí | — |
| Banner de cookies | `src/components/consent/ConsentBanner.tsx` | Sí | — |
| Casillas de consentimiento | `src/components/legal/ConsentCheckbox.tsx` | Sí | Textos de finalidad de futuros formularios |
| Correos de acuse | `src/lib/derechos/email.ts` | Sí (correo) | — |
| Documentos internos | `docs/cumplimiento/*.md` | No | Responsable de privacidad y de incidentes; plazos |

Datos del responsable centralizados en `src/config/legal.ts` (hoy con `TODO(diego)`; `next build` lo advierte).

## 2. Preguntas concretas para el abogado

### Ley 19.628 / Ley 21.719
1. Con la entrada en vigencia de la Ley 21.719 el **1 de diciembre de 2026**, ¿qué cambia para un emprendimiento pequeño como este? ¿Aplica algún régimen simplificado o un programa de cumplimiento recomendado?
2. **Bases de licitud:** ¿son correctas las propuestas en la tabla de finalidades de `/privacidad` (interés legítimo para logs/seguridad; consentimiento para analítica; medidas precontractuales y contrato para WhatsApp y sesiones)?
3. **Datos sensibles:** el motivo de consulta (salud, vida afectiva, creencias) llega por WhatsApp o en sesión. ¿Basta con el principio "no los pedimos; si los compartes, es tu decisión" o se requiere un **consentimiento expreso y por escrito** antes de la sesión? ¿Cómo documentarlo de forma práctica (p. ej. mensaje de WhatsApp con aceptación)?
4. **Grabaciones de sesiones:** ¿qué consentimiento se necesita para grabar y conservar el audio? ¿Plazo razonable de conservación?
5. **Plazos de respuesta** a solicitudes de derechos bajo la Ley 21.719 (el sitio dice 30 días corridos prorrogables una vez por 30). ¿Correcto? ¿Y mientras rige la Ley 19.628?
6. **Verificación de identidad:** ¿es razonable el procedimiento propuesto (escribir desde el mismo WhatsApp/correo; no pedir cédula por el sitio)?
7. **Transferencias internacionales** (Vercel, Microsoft, Meta, Zoom, Resend, Upstash — EE. UU.): ¿qué mecanismo exige la Ley 21.719 (cláusulas tipo de la Agencia, consentimiento, garantías del proveedor)? ¿Bastan los DPA estándar?
8. **Notificación de brechas:** plazos y contenido mínimo para la Agencia y los titulares (ver `PROTOCOLO-BRECHAS-SEGURIDAD.md`).
9. ¿Debe designarse un **delegado de protección de datos** o basta con una persona de contacto?
10. **Menores:** ¿es suficiente declarar que el servicio es para mayores de 18 y exigir autorización del representante? ¿Cómo acreditarla?
11. **Analítica:** ¿es adecuado el banner (aceptar/rechazar con igual esfuerzo, revocable)? ¿Debe informarse algo más sobre las grabaciones de Clarity?
12. ¿El **registro mínimo** de solicitudes (id, tipo, fechas, estado, sin datos de contacto) por 3 años es suficiente y proporcional?

### Ley 19.496 (Consumidor)
13. Contratación por WhatsApp y pago por transferencia: ¿es "contrato a distancia"? ¿Aplica el **derecho a retracto** de 10 días (art. 3 bis)? ¿Qué excepciones aplican a sesiones de fecha fija o ya prestadas, cursos grabados y productos personalizados (rituales, obras de arte)?
14. ¿Qué **información previa** obligatoria debe darse antes del pago y por qué canal?
15. **Precios:** ¿deben publicarse con IVA incluido? ¿Qué régimen tributario aplica (boleta de honorarios, boleta afecta/exenta)?
16. ¿Es válida la **política de cancelación** que se defina (pérdida de abono por inasistencia, créditos con vencimiento)?
17. ¿Es razonable la **limitación de responsabilidad** de la sección 9 de los Términos sin ser una cláusula abusiva?
18. Cláusula de **tribunales competentes** respetando el domicilio del consumidor.
19. El disclaimer de "orientación, bienestar y entretenimiento; no reemplaza a un profesional": ¿suficiente frente a servicios descritos como "sanación" o "Salud & Bienestar" en el sitio? ¿Conviene ajustar el lenguaje comercial?

### Otros
20. Uso de testimonios, fotos de clientes o de encuentros grupales (`public/images/familiares`, galerías): ¿hay autorizaciones de imagen?
21. Propiedad intelectual sobre obras de arte y material de cursos: ¿es suficiente la cláusula propuesta?

## 3. Decisiones de negocio a tomar antes de la reunión (TODO(diego))

- [ ] Completar `src/config/legal.ts`.
- [ ] Política real de cancelaciones/reprogramaciones y medios de pago.
- [ ] Si se graban las sesiones, cómo se entregan y dónde se guardan.
- [ ] Plazos de conservación de WhatsApp, grabaciones y PDF.
- [ ] Mantener o no Microsoft Clarity.
- [ ] Persona responsable de privacidad e incidentes.
