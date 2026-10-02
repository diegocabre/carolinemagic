import LegalPage, { CorreoLegal } from "@/components/legal/LegalPage";
import { LEGAL } from "@/config/legal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seguridad",
  description:
    "Cómo reportar una vulnerabilidad en el sitio de Caroline Magic y qué hacemos para proteger tus datos.",
  alternates: { canonical: "/seguridad" },
};

export default function SeguridadPage() {
  return (
    <LegalPage
      etiqueta="Seguridad"
      titulo="Reportar una vulnerabilidad"
      bajada="Si encontraste un problema de seguridad en este sitio, gracias por avisarnos. Lo revisaremos con seriedad."
    >
      <h2>Cómo reportar</h2>
      <p>
        Escríbenos a <CorreoLegal valor={LEGAL.emailSeguridad} /> con:
      </p>
      <ul>
        <li>La página o dirección afectada.</li>
        <li>Una descripción del problema y los pasos para reproducirlo.</li>
        <li>El impacto que crees que tiene.</li>
      </ul>
      <p>
        Por favor, <strong>no incluyas datos personales de otras personas</strong>{" "}
        en tu reporte y no los descargues ni los compartas.
      </p>

      <h2>Qué puedes esperar</h2>
      <ul>
        <li>Confirmaremos que recibimos tu reporte dentro de 5 días hábiles.</li>
        <li>Te contaremos si pudimos reproducirlo y cuándo esperamos corregirlo.</li>
        <li>
          Somos un emprendimiento pequeño: no tenemos un programa de recompensas,
          pero agradeceremos públicamente tu ayuda si así lo quieres.
        </li>
      </ul>

      <h2>Pruebas de buena fe</h2>
      <p>Te pedimos que:</p>
      <ul>
        <li>No hagas pruebas de denegación de servicio ni envíes tráfico masivo.</li>
        <li>No intentes acceder al panel de administración con claves de terceros.</li>
        <li>No uses ingeniería social contra Caroline ni contra nuestros clientes.</li>
        <li>Nos des un plazo razonable para corregir antes de hacerlo público.</li>
      </ul>

      <h2>Lo que hacemos para protegerte</h2>
      <p>
        El sitio usa HTTPS, cabeceras de seguridad (incluida una política de
        seguridad de contenido), límites de intentos en el acceso
        administrativo y claves almacenadas con hash. No pedimos datos
        sensibles a través del sitio. Puedes leer más en nuestra{" "}
        <Link href="/privacidad">Política de Privacidad</Link>.
      </p>
      <p className="text-xs text-text-muted">
        También publicamos esta información en formato estándar en{" "}
        <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
      </p>
    </LegalPage>
  );
}
