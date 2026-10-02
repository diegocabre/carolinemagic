import DerechosForm from "@/components/legal/DerechosForm";
import LegalPage, { CorreoLegal } from "@/components/legal/LegalPage";
import { LEGAL, PLAZO_PRORROGA_DIAS, PLAZO_RESPUESTA_DIAS } from "@/config/legal";
import type { Metadata } from "next";
import Link from "next/link";

/*
 * TODO(legal): BORRADOR. Revisar con un abogado el procedimiento de
 * verificación de identidad y los plazos. Ver docs/cumplimiento/LEGAL-REVISION.md.
 */

export const metadata: Metadata = {
  title: "Derechos sobre tus datos",
  description:
    "Solicita acceso, rectificación, supresión, oposición, portabilidad o bloqueo de tus datos personales en Caroline Magic.",
  alternates: { canonical: "/derechos-datos" },
};

export default function DerechosDatosPage() {
  return (
    <LegalPage
      etiqueta="Tus derechos"
      titulo="Derechos sobre tus datos"
      bajada="Puedes pedirnos acceder, corregir, eliminar o limitar el uso de tus datos personales. Es gratis."
      mostrarFecha={false}
    >
      <h2>Cómo funciona</h2>
      <ol>
        <li>Completa el formulario. Te llegará un acuse de recibo con un número de solicitud.</li>
        <li>
          Para proteger tus datos, podemos pedirte información adicional que
          confirme que eres tú (por ejemplo, escribirnos desde el mismo número
          de WhatsApp que usaste con nosotros).
        </li>
        <li>
          Te responderemos dentro de {PLAZO_RESPUESTA_DIAS} días corridos. Si
          necesitamos más tiempo, te avisaremos el motivo y podremos extenderlo
          una vez hasta {PLAZO_PRORROGA_DIAS} días más.
        </li>
      </ol>
      <p>
        Si prefieres, también puedes escribir a{" "}
        <CorreoLegal valor={LEGAL.emailPrivacidad} />. Más detalles en la{" "}
        <Link href="/privacidad#derechos">Política de Privacidad</Link>.
      </p>

      <h2>Formulario de solicitud</h2>
      <DerechosForm />
    </LegalPage>
  );
}
