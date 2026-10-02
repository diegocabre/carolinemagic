import LegalPage, {
  CorreoLegal,
  DatoLegal,
  formatearFecha,
} from "@/components/legal/LegalPage";
import {
  LEGAL,
  PLAZO_PRORROGA_DIAS,
  PLAZO_RESPUESTA_DIAS,
  VERSIONES_LEGALES,
} from "@/config/legal";
import type { Metadata } from "next";
import Link from "next/link";

/*
 * TODO(legal): BORRADOR. Este texto debe ser revisado por un abogado antes
 * de publicarse. No afirma cumplimiento normativo. Ver docs/cumplimiento/LEGAL-REVISION.md.
 * Fuente técnica: INVENTARIO-DATOS.md.
 */

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Caroline Magic trata tus datos personales: qué datos, para qué, con quién se comparten, por cuánto tiempo y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      etiqueta="Privacidad"
      titulo="Política de Privacidad"
      bajada="Tu confianza es parte de nuestro trabajo. Aquí te contamos, en simple, qué datos tratamos, para qué y cuáles son tus derechos."
    >
      <h2 id="responsable">1. Quién es responsable de tus datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> <DatoLegal valor={LEGAL.razonSocial} />{" "}
          (nombre comercial {LEGAL.nombreComercial})
        </li>
        <li>
          <strong>RUT:</strong> <DatoLegal valor={LEGAL.rut} />
        </li>
        <li>
          <strong>Domicilio:</strong> <DatoLegal valor={LEGAL.domicilio} />
        </li>
        <li>
          <strong>Correo de privacidad:</strong>{" "}
          <CorreoLegal valor={LEGAL.emailPrivacidad} />
        </li>
        <li>
          <strong>Persona a cargo de las solicitudes:</strong>{" "}
          <DatoLegal valor={LEGAL.responsableDatos} />
        </li>
      </ul>
      <p>
        Esta política se rige por la Ley N° 19.628 sobre protección de la vida
        privada y considera las exigencias de la Ley N° 21.719, que entra en
        plena vigencia el 1 de diciembre de 2026.
      </p>

      <h2 id="datos">2. Qué datos tratamos y de dónde vienen</h2>
      <p>
        <strong>Este sitio no tiene formularios de registro, reserva ni
        pago.</strong> Las consultas y reservas se hacen por WhatsApp. Por eso,
        los datos que tratamos son pocos:
      </p>
      <table>
        <thead>
          <tr>
            <th>Dato</th>
            <th>Cómo lo obtenemos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Datos técnicos de la visita: dirección IP, navegador, página
              visitada, fecha y hora.
            </td>
            <td>Automáticamente, al visitar el sitio (registros del servidor).</td>
          </tr>
          <tr>
            <td>
              Datos de uso del sitio: clics, desplazamiento, tipo de
              dispositivo, país aproximado y grabaciones anónimas de la
              navegación.
            </td>
            <td>
              Solo si aceptas las cookies de analítica (Microsoft Clarity).
              Ver la <Link href="/cookies">Política de Cookies</Link>.
            </td>
          </tr>
          <tr>
            <td>
              Nombre, número de teléfono, foto de perfil y lo que decidas
              contarnos.
            </td>
            <td>
              Cuando nos escribes por WhatsApp (los botones del sitio abren
              WhatsApp con un mensaje sugerido que puedes editar antes de
              enviarlo).
            </td>
          </tr>
          <tr>
            <td>
              Imagen y voz durante una sesión online; grabación de audio y
              material en PDF de la sesión.
            </td>
            <td>
              Cuando tomas una sesión por Zoom o presencial que incluye
              grabación.
            </td>
          </tr>
          <tr>
            <td>Datos para el pago (nombre del titular, comprobante).</td>
            <td>Cuando pagas un servicio por transferencia u otro medio.</td>
          </tr>
          <tr>
            <td>Nombre, contacto y detalle de tu solicitud de derechos.</td>
            <td>
              Cuando nos escribes para{" "}
              <Link href="/derechos-datos">ejercer tus derechos</Link>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="finalidades">3. Para qué usamos tus datos y con qué base</h2>
      {/* TODO(legal): validar cada base de licitud con el abogado. */}
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base que lo permite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mostrar el sitio, mantenerlo seguro y corregir errores.</td>
            <td>Interés legítimo en el funcionamiento y la seguridad del sitio.</td>
          </tr>
          <tr>
            <td>Medir y mejorar el uso del sitio (analítica).</td>
            <td>Tu consentimiento, que puedes retirar en cualquier momento.</td>
          </tr>
          <tr>
            <td>Responder tus consultas y coordinar reservas.</td>
            <td>Tu solicitud y las gestiones previas a contratar.</td>
          </tr>
          <tr>
            <td>Prestar la sesión, taller o servicio contratado y entregarte el material.</td>
            <td>La ejecución del contrato de servicio.</td>
          </tr>
          <tr>
            <td>Grabar la sesión y conservar la grabación.</td>
            <td>
              Tu consentimiento expreso, que pediremos antes de grabar. Puedes
              pedir que no se grabe.
            </td>
          </tr>
          <tr>
            <td>Cobros, boletas y obligaciones tributarias.</td>
            <td>Ejecución del contrato y cumplimiento de obligaciones legales.</td>
          </tr>
          <tr>
            <td>Atender solicitudes de derechos y acreditar que respondimos.</td>
            <td>Cumplimiento de una obligación legal.</td>
          </tr>
        </tbody>
      </table>
      <p>
        No vendemos tus datos, no los usamos para publicidad personalizada y no
        te enviaremos promociones sin tu consentimiento.
      </p>

      <h2 id="sensibles">4. Datos sensibles</h2>
      <p>
        Por la naturaleza de nuestros servicios, el motivo de una consulta
        puede revelar información sobre tu salud, tu vida afectiva o sexual, tu
        familia o tus creencias espirituales o religiosas. La ley considera
        estos datos como <strong>sensibles</strong>.
      </p>
      <ul>
        <li>
          <strong>El sitio no te pide datos sensibles.</strong> Ningún botón
          ni formulario los solicita.
        </li>
        <li>
          Si decides contarnos algo de esto por WhatsApp o durante una sesión,
          lo haces por tu propia decisión. Lo usaremos solo para prestarte el
          servicio, con estricta confidencialidad, y no lo compartiremos con
          nadie.
        </li>
        <li>
          Lo que escribes por WhatsApp también queda sujeto a la{" "}
          <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Política de Privacidad de WhatsApp
          </a>
          . Si prefieres, puedes darnos solo lo necesario para agendar y
          contarnos el resto en la sesión.
        </li>
      </ul>

      <h2 id="destinatarios">5. Con quién compartimos datos</h2>
      <p>
        No cedemos tus datos a terceros para sus propios fines. Usamos estos
        proveedores, que los tratan por cuenta nuestra o bajo sus propias
        condiciones:
      </p>
      {/* TODO(diego): confirmar la lista de proveedores reales (Zoom, banco, correo, almacenamiento de grabaciones). */}
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Para qué</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel Inc.</td>
            <td>Alojamiento del sitio y de las imágenes publicadas.</td>
            <td>Estados Unidos</td>
          </tr>
          <tr>
            <td>Upstash Inc.</td>
            <td>
              Protección contra abusos (límites de intentos) y registro mínimo
              de solicitudes de derechos.
            </td>
            <td>Según la región contratada</td>
          </tr>
          <tr>
            <td>Microsoft Corporation (Clarity)</td>
            <td>Analítica del sitio, solo si la aceptas.</td>
            <td>Estados Unidos</td>
          </tr>
          <tr>
            <td>Meta Platforms / WhatsApp</td>
            <td>Mensajería con la que nos contactas.</td>
            <td>Estados Unidos y otros</td>
          </tr>
          <tr>
            <td>Zoom Video Communications</td>
            <td>Sesiones online.</td>
            <td>Estados Unidos</td>
          </tr>
        </tbody>
      </table>
      <p>
        También podríamos entregar datos a autoridades cuando una ley o una
        resolución judicial lo exija.
      </p>

      <h3>Transferencias internacionales</h3>
      <p>
        Varios de estos proveedores procesan datos fuera de Chile,
        principalmente en Estados Unidos. Elegimos proveedores que ofrecen
        compromisos contractuales de protección de datos y medidas de seguridad
        reconocidas.
        {/* TODO(legal): definir el mecanismo de transferencia aplicable bajo la Ley 21.719 (cláusulas tipo, garantías del proveedor, consentimiento). */}
      </p>

      <h2 id="plazos">6. Cuánto tiempo guardamos tus datos</h2>
      {/* TODO(diego): confirmar plazos con la operación real. Ver docs/cumplimiento/POLITICA-RETENCION.md */}
      <ul>
        <li>Registros técnicos del servidor: según el proveedor, normalmente horas o pocos días.</li>
        <li>Datos de analítica (si los aceptaste): hasta 13 meses, según Microsoft Clarity.</li>
        <li>
          Conversaciones de WhatsApp: hasta 12 meses desde el último contacto,
          salvo que sigas siendo cliente o nos pidas borrarlas antes.
        </li>
        <li>
          Grabaciones de sesiones: te las entregamos y eliminamos nuestra
          copia dentro de 30 días, salvo que nos pidas conservarla.
        </li>
        <li>Datos de pago y boletas: 6 años, por obligaciones tributarias.</li>
        <li>
          Solicitudes de derechos: el mensaje con tu solicitud, 2 años desde
          que la cerramos; el registro mínimo (fecha, tipo, canal y estado, sin
          tus datos de contacto), 3 años, para acreditar que respondimos a
          tiempo.
        </li>
      </ul>

      <h2 id="derechos">7. Tus derechos y cómo ejercerlos</h2>
      <p>Puedes pedirnos en cualquier momento, de forma gratuita:</p>
      <ul>
        <li><strong>Acceso:</strong> saber qué datos tuyos tenemos y cómo los usamos.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
        <li><strong>Supresión:</strong> que eliminemos tus datos cuando ya no sean necesarios o retires tu consentimiento.</li>
        <li><strong>Oposición:</strong> que dejemos de usar tus datos para una finalidad determinada.</li>
        <li><strong>Portabilidad:</strong> recibir tus datos en un formato de uso común.</li>
        <li><strong>Bloqueo:</strong> que suspendamos temporalmente el uso de tus datos mientras se resuelve una solicitud.</li>
        <li><strong>Retirar tu consentimiento</strong> cuando sea la base del tratamiento, sin afectar lo hecho antes.</li>
      </ul>
      <p>
        Para ejercerlos, escríbenos por WhatsApp o a{" "}
        <CorreoLegal valor={LEGAL.emailPrivacidad} />. En{" "}
        <Link href="/derechos-datos">esta página</Link> te explicamos cómo. Podemos pedirte
        información razonable para confirmar tu identidad.
      </p>
      <p>
        {/* TODO(legal): confirmar plazo de respuesta y prórroga aplicables. */}
        Responderemos dentro de <strong>{PLAZO_RESPUESTA_DIAS} días corridos</strong>{" "}
        desde que recibimos tu solicitud. Si fuera necesario, podremos
        extender el plazo por una vez hasta {PLAZO_PRORROGA_DIAS} días más,
        avisándote el motivo.
      </p>

      <h3>Derecho a reclamar</h3>
      <p>
        Si no quedas conforme con nuestra respuesta, o no respondemos a tiempo,
        puedes reclamar ante la <strong>Agencia de Protección de Datos
        Personales</strong> una vez que esté en funciones, o ante los
        tribunales de justicia según la ley vigente.
      </p>

      <h2 id="automatizadas">8. Decisiones automatizadas</h2>
      <p>
        No tomamos decisiones sobre ti basadas únicamente en tratamientos
        automatizados ni elaboramos perfiles. Las lecturas y sesiones las
        realiza siempre una persona.
      </p>

      <h2 id="seguridad">9. Cómo protegemos tus datos</h2>
      <ul>
        <li>Conexión cifrada (HTTPS) en todo el sitio.</li>
        <li>Cabeceras de seguridad y una política que bloquea scripts no autorizados.</li>
        <li>Acceso administrativo con clave protegida por hash, límite de intentos y sesiones que expiran.</li>
        <li>Recogemos el mínimo de datos y no pedimos datos sensibles por el sitio.</li>
        <li>Acceso a conversaciones y grabaciones limitado a Caroline y a quien la asista en la sesión.</li>
        <li>
          Un protocolo interno para actuar ante incidentes de seguridad y
          avisarte, junto a la autoridad, cuando la ley lo exija.
        </li>
      </ul>
      <p>
        Ningún sistema es 100% seguro. Si detectas un problema, revisa{" "}
        <Link href="/seguridad">cómo reportarlo</Link>.
      </p>

      <h2 id="menores">10. Menores de edad</h2>
      <p>
        Nuestros servicios y este sitio <strong>no están dirigidos a menores de
        18 años</strong>. No atendemos a menores sin la autorización expresa de
        su madre, padre o representante legal. Si eres representante de un
        menor y crees que nos entregó datos, escríbenos y los eliminaremos.
      </p>

      <h2 id="cambios">11. Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política. Publicaremos aquí la nueva versión y,
        si los cambios son importantes, lo destacaremos en el sitio.
      </p>
      <table>
        <thead>
          <tr>
            <th>Versión</th>
            <th>Fecha</th>
            <th>Cambios</th>
          </tr>
        </thead>
        <tbody>
          {VERSIONES_LEGALES.map((v) => (
            <tr key={v.version}>
              <td>{v.version}</td>
              <td>{formatearFecha(v.fecha)}</td>
              <td>{v.cambios}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LegalPage>
  );
}
