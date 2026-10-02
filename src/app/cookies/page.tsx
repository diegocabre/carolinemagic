import BotonPreferenciasCookies from "@/components/consent/BotonPreferenciasCookies";
import LegalPage, { CorreoLegal } from "@/components/legal/LegalPage";
import { LEGAL } from "@/config/legal";
import type { Metadata } from "next";
import Link from "next/link";

/*
 * TODO(legal): BORRADOR. Revisión de un abogado antes de publicarse.
 * La tabla refleja las cookies reales según INVENTARIO-DATOS.md. Si se
 * agrega un script nuevo, actualiza esta tabla, la CSP (src/lib/security/csp.ts)
 * y el banner de consentimiento.
 */

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Qué cookies usa el sitio de Caroline Magic, para qué sirven, cuánto duran y cómo cambiar tus preferencias.",
  alternates: { canonical: "/cookies" },
};

const COOKIES: ReadonlyArray<{
  nombre: string;
  finalidad: string;
  duracion: string;
  tipo: string;
  proveedor: string;
}> = [
  {
    nombre: "cm_consent",
    finalidad: "Recordar si aceptaste o rechazaste la analítica.",
    duracion: "180 días",
    tipo: "Estrictamente necesaria · propia",
    proveedor: "Caroline Magic",
  },
  {
    nombre: "cm_admin_session",
    finalidad:
      "Mantener la sesión del panel de administración. Solo existe en el navegador de quien administra el sitio; los visitantes no la reciben.",
    duracion: "12 horas (renovable, máximo 3 días)",
    tipo: "Estrictamente necesaria · propia",
    proveedor: "Caroline Magic",
  },
  {
    nombre: "_clck",
    finalidad: "Identificar de forma anónima al mismo visitante entre visitas.",
    duracion: "1 año",
    tipo: "Analítica · requiere tu consentimiento",
    proveedor: "Microsoft Clarity",
  },
  {
    nombre: "_clsk",
    finalidad: "Unir las páginas vistas en una misma visita.",
    duracion: "1 día",
    tipo: "Analítica · requiere tu consentimiento",
    proveedor: "Microsoft Clarity",
  },
  {
    nombre: "CLID, MUID, ANONCHK, SM, MR",
    finalidad:
      "Cookies de los dominios de Microsoft (clarity.ms, bing.com) usadas por Clarity para identificar el navegador y medir.",
    duracion: "Hasta 1 año, según Microsoft",
    tipo: "Analítica · de terceros · requiere tu consentimiento",
    proveedor: "Microsoft",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      etiqueta="Cookies"
      titulo="Política de Cookies"
      bajada="Usamos pocas cookies. Las de analítica solo se activan si tú lo decides."
    >
      <h2>Qué son las cookies</h2>
      <p>
        Son pequeños archivos que un sitio guarda en tu navegador para
        recordar información entre una página y otra, o entre visitas.
      </p>

      <h2>Qué cookies usamos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Finalidad</th>
            <th>Duración</th>
            <th>Tipo</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {COOKIES.map((c) => (
            <tr key={c.nombre}>
              <td>
                <code>{c.nombre}</code>
              </td>
              <td>{c.finalidad}</td>
              <td>{c.duracion}</td>
              <td>{c.tipo}</td>
              <td>{c.proveedor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        No usamos cookies de publicidad ni de redes sociales. Las fuentes
        tipográficas se sirven desde nuestro propio dominio, por lo que Google
        no recibe datos de tu visita. Los botones de WhatsApp, Instagram y
        YouTube son enlaces simples: no cargan nada de esos servicios hasta que
        haces clic.
      </p>

      <h2>Analítica con Microsoft Clarity</h2>
      <p>
        Si aceptas, usamos Microsoft Clarity para entender cómo se usa el
        sitio (mapas de calor y grabaciones de la navegación) y mejorarlo.
        Clarity oculta el texto que escribes en formularios y nunca se activa
        en el panel de administración ni en el formulario de derechos. Los
        datos se procesan en Estados Unidos. Más información en la{" "}
        <a href="https://privacy.microsoft.com/es-es/privacystatement" target="_blank" rel="noopener noreferrer">
          declaración de privacidad de Microsoft
        </a>
        .
      </p>

      <h2>Cómo cambiar tu elección</h2>
      <p>
        Rechazar es tan fácil como aceptar, y puedes cambiar de opinión cuando
        quieras:
      </p>
      <BotonPreferenciasCookies className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-colors" />
      <p>
        También puedes borrar las cookies desde la configuración de tu
        navegador. Si retiras tu consentimiento, borraremos las cookies de
        Clarity de nuestro dominio y la analítica dejará de cargarse.
      </p>

      <h2>Más información</h2>
      <p>
        Revisa nuestra <Link href="/privacidad">Política de Privacidad</Link> o
        escríbenos a <CorreoLegal valor={LEGAL.emailPrivacidad} />.
      </p>
    </LegalPage>
  );
}
