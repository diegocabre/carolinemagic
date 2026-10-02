import AvisoWhatsApp from "@/components/legal/AvisoWhatsApp";
import LegalPage, { CorreoLegal } from "@/components/legal/LegalPage";
import {
  LEGAL,
  PLAZO_PRORROGA_DIAS,
  PLAZO_RESPUESTA_DIAS,
  valorLegal,
} from "@/config/legal";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { TIPOS_SOLICITUD } from "@/lib/derechos/schema";
import { Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

/*
 * TODO(legal): BORRADOR. Revisar con un abogado el procedimiento de
 * verificación de identidad y los plazos. Ver docs/cumplimiento/LEGAL-REVISION.md.
 *
 * El sitio no tiene formulario: las solicitudes llegan por WhatsApp o correo
 * y Caroline las registra en /admin para acreditar los plazos.
 */

export const metadata: Metadata = {
  title: "Derechos sobre tus datos",
  description:
    "Cómo pedir acceso, rectificación, supresión, oposición, portabilidad o bloqueo de tus datos personales en Caroline Magic.",
  alternates: { canonical: "/derechos-datos" },
};

const ASUNTO_CORREO = "Solicitud sobre mis datos personales";
const CUERPO_CORREO = [
  "Hola,",
  "",
  "Quiero ejercer el siguiente derecho sobre mis datos personales:",
  "Tipo de solicitud (acceso, rectificación, supresión, oposición, portabilidad, bloqueo u otra): ",
  "Nombre: ",
  "Teléfono con el que les escribí por WhatsApp (si aplica): ",
  "¿Soy el titular o su representante?: ",
  "Detalle: ",
].join("\n");

const botonClass =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-colors legal-boton";

export default function DerechosDatosPage() {
  const correo = valorLegal(LEGAL.emailPrivacidad);
  const mailto = correo
    ? `mailto:${correo}?subject=${encodeURIComponent(ASUNTO_CORREO)}&body=${encodeURIComponent(CUERPO_CORREO)}`
    : null;

  return (
    <LegalPage
      etiqueta="Tus derechos"
      titulo="Derechos sobre tus datos"
      bajada="Puedes pedirnos acceder, corregir, eliminar o limitar el uso de tus datos personales. Es gratis."
      mostrarFecha={false}
    >
      <h2>Qué puedes pedir</h2>
      <ul>
        {Object.entries(TIPOS_SOLICITUD).map(([clave, texto]) => (
          <li key={clave}>{texto}</li>
        ))}
      </ul>
      <p>
        Más detalle sobre cada derecho en la{" "}
        <Link href="/privacidad#derechos">Política de Privacidad</Link>.
      </p>

      <h2>Cómo hacer tu solicitud</h2>
      <p>Escríbenos por el canal que prefieras:</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={getWhatsAppUrl(WHATSAPP_MESSAGES.derechosDatos)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${botonClass} bg-primary hover:bg-primary-hover text-white`}
        >
          Escribir por WhatsApp
        </a>
        {mailto ? (
          <a
            href={mailto}
            className={`${botonClass} bg-white border border-secondary/30 text-secondary hover:bg-surface-muted`}
          >
            <Mail className="w-4 h-4" />
            Escribir por correo
          </a>
        ) : (
          <span className="text-xs self-center">
            Correo: <CorreoLegal valor={LEGAL.emailPrivacidad} />
          </span>
        )}
      </div>
      <AvisoWhatsApp />

      <p>Para atenderte más rápido, cuéntanos:</p>
      <ul>
        <li>Qué derecho quieres ejercer.</li>
        <li>Tu nombre y el teléfono o correo con el que te comunicaste con nosotros.</li>
        <li>Si eres la persona titular o la representas (madre, padre, tutor o apoderado).</li>
        <li>Cualquier detalle que nos ayude a encontrar tus datos.</li>
      </ul>
      <p>
        <strong>No nos envíes</strong> datos de salud, copias de tu cédula ni
        otros documentos. Si necesitamos confirmar tu identidad, te lo
        pediremos por un canal seguro.
      </p>

      <h2>Qué pasa después</h2>
      <ol>
        <li>Te confirmamos que recibimos tu solicitud y te damos un número de seguimiento.</li>
        <li>
          Para proteger tus datos, podemos pedirte información razonable que
          confirme que eres tú (por ejemplo, escribirnos desde el mismo número
          de WhatsApp que usaste con nosotros).
        </li>
        <li>
          Te responderemos dentro de <strong>{PLAZO_RESPUESTA_DIAS} días
          corridos</strong>. Si necesitamos más tiempo, te avisaremos el motivo
          y podremos extenderlo una vez hasta {PLAZO_PRORROGA_DIAS} días más.
        </li>
      </ol>
      <p>
        Si no quedas conforme con la respuesta, puedes reclamar ante la Agencia
        de Protección de Datos Personales.
      </p>
    </LegalPage>
  );
}
