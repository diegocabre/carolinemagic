import LegalPage, { CorreoLegal, DatoLegal } from "@/components/legal/LegalPage";
import { LEGAL } from "@/config/legal";
import type { Metadata } from "next";
import Link from "next/link";

/*
 * TODO(legal): BORRADOR. Este texto debe ser revisado por un abogado antes
 * de publicarse, en especial la sección de Ley del Consumidor (19.496) y la
 * política de cancelaciones, que dependen de decisiones del negocio.
 * Ver docs/cumplimiento/LEGAL-REVISION.md.
 */

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio y de los servicios de Caroline Magic: naturaleza de las lecturas, reservas, cancelaciones y responsabilidades.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage
      etiqueta="Términos"
      titulo="Términos y Condiciones"
      bajada="Las reglas del juego, explicadas con claridad, para que sepas qué esperar de nuestro trabajo."
    >
      <h2>1. Quiénes somos</h2>
      <p>
        Este sitio y los servicios ofrecidos en él son prestados por{" "}
        <DatoLegal valor={LEGAL.razonSocial} />, RUT{" "}
        <DatoLegal valor={LEGAL.rut} />, con domicilio en{" "}
        <DatoLegal valor={LEGAL.domicilio} /> (&quot;{LEGAL.nombreComercial}&quot;).
        Contacto: <CorreoLegal valor={LEGAL.emailContacto} />.
      </p>
      <p>
        Al usar el sitio o contratar un servicio aceptas estos términos. Si no
        estás de acuerdo, te pedimos no usarlos.
      </p>

      <h2>2. Naturaleza de las lecturas y sesiones</h2>
      <p>
        Las lecturas de tarot, sesiones, rituales, ceremonias, encuentros y
        formaciones son espacios de <strong>orientación, autoconocimiento,
        bienestar y entretenimiento</strong>, basados en herramientas
        simbólicas y espirituales.
      </p>
      <ul>
        <li>
          <strong>No son</strong> diagnóstico ni tratamiento médico,
          psicológico o psiquiátrico, ni asesoría legal, financiera o de
          inversión.
        </li>
        <li>
          <strong>No reemplazan</strong> la atención de un profesional de la
          salud o de otra disciplina. Si estás pasando por una situación de
          salud física o mental, consulta a un profesional. No suspendas ni
          modifiques un tratamiento por una lectura.
        </li>
        <li>
          <strong>No garantizamos resultados.</strong> Nuestro enfoque es
          evolutivo y no determinista: las decisiones que tomes son tuyas.
        </li>
      </ul>
      <p>
        Si estás en una crisis o en riesgo, contacta de inmediato a los
        servicios de emergencia (131 SAMU) o a la línea de prevención del
        suicidio *4141.
      </p>

      <h2>3. Edad mínima</h2>
      <p>
        Para contratar servicios debes ser mayor de 18 años. Un menor de edad
        solo puede participar con autorización expresa de su madre, padre o
        representante legal, y podemos pedir acreditarla.
      </p>

      <h2>4. Reservas</h2>
      {/* TODO(diego): describir el proceso real de reserva y pago. */}
      <p>
        Las reservas se coordinan por WhatsApp. La reserva queda confirmada
        cuando te enviamos la confirmación con fecha, hora, modalidad y precio,
        y se registra el pago o abono acordado.
      </p>

      <h2>5. Cancelaciones y reprogramaciones</h2>
      {/* TODO(diego): definir la política real. Los valores de abajo son una PROPUESTA y deben confirmarse. */}
      <ul>
        <li>
          Puedes reprogramar sin costo avisando con al menos{" "}
          <strong>[TODO: 24/48] horas</strong> de anticipación.
        </li>
        <li>
          Si cancelas con esa anticipación, [TODO: devolvemos el pago / lo
          dejamos como crédito por X meses].
        </li>
        <li>
          Si no te presentas o cancelas con menos anticipación, [TODO: definir
          si se pierde el abono].
        </li>
        <li>
          Si nosotros debemos cancelar, te ofreceremos una nueva fecha o la
          devolución íntegra de lo pagado, a tu elección.
        </li>
        <li>
          Encuentros grupales y formaciones pueden tener condiciones propias,
          que te informaremos antes de pagar.
        </li>
      </ul>

      <h2>6. Ley del Consumidor</h2>
      {/*
        TODO(legal): sección pendiente de revisión legal (Ley 19.496 sobre
        protección de los derechos de los consumidores). Confirmar:
        - Información previa obligatoria antes de contratar.
        - Que los precios se informen con IVA incluido (o si el
          responsable está exento / emite boleta de honorarios).
        - Medios de pago aceptados.
        - Derecho a retracto en contratos a distancia (art. 3 bis) y si
          aplican excepciones para servicios ya prestados o de fecha fija.
        - Garantía legal y canal de reclamos.
      */}
      <ul>
        <li>
          <strong>Información previa:</strong> antes de pagar te informaremos
          el servicio, su duración, modalidad, precio total y condiciones.
        </li>
        <li>
          <strong>Precios:</strong> se informan en pesos chilenos.
          [TODO(legal): indicar si incluyen IVA o el régimen tributario
          aplicable].
        </li>
        <li>
          <strong>Medios de pago:</strong> [TODO(diego): transferencia
          bancaria, otros].
        </li>
        <li>
          <strong>Derecho a retracto:</strong> [TODO(legal): indicar si aplica
          el retracto de 10 días para contrataciones a distancia, cómo
          ejercerlo y sus excepciones, por ejemplo cuando la sesión ya se
          realizó].
        </li>
        <li>
          <strong>Reclamos:</strong> puedes escribirnos a{" "}
          <CorreoLegal valor={LEGAL.emailContacto} />. También puedes acudir al
          Servicio Nacional del Consumidor (SERNAC) en{" "}
          <a href="https://www.sernac.cl" target="_blank" rel="noopener noreferrer">
            www.sernac.cl
          </a>
          .
        </li>
      </ul>

      <h2>7. Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, obras de arte, videos, material de cursos,
        mapas en PDF, grabaciones y diseños del sitio son de{" "}
        {LEGAL.nombreComercial} o de sus autores, y están protegidos por la
        Ley N° 17.336 de Propiedad Intelectual. Puedes usarlos para tu uso
        personal; no puedes copiarlos, revenderlos, publicarlos ni usarlos con
        fines comerciales sin autorización escrita. El material de las
        formaciones es para uso personal del alumno.
      </p>

      <h2>8. Uso aceptable del sitio</h2>
      <p>Al usar el sitio te comprometes a no:</p>
      <ul>
        <li>Intentar acceder sin autorización al panel de administración o a sistemas del sitio.</li>
        <li>Introducir código malicioso, automatizar consultas masivas o afectar su funcionamiento.</li>
        <li>Usar el contenido para suplantar a {LEGAL.nombreComercial} o a Caroline.</li>
      </ul>

      <h2>9. Responsabilidad</h2>
      <p>
        Hacemos nuestro mejor esfuerzo para que la información del sitio sea
        correcta y esté disponible, pero puede contener errores o tener
        interrupciones. No somos responsables por las decisiones que tomes a
        partir de una lectura o sesión, considerando su naturaleza descrita en
        la sección 2. Nada en estos términos limita los derechos que la ley te
        otorga como consumidor ni nuestra responsabilidad por dolo o culpa
        grave.
      </p>

      <h2>10. Enlaces a otros sitios</h2>
      <p>
        El sitio enlaza a WhatsApp, Instagram y YouTube. Esos servicios tienen
        sus propios términos y políticas, que no controlamos.
      </p>

      <h2>11. Privacidad</h2>
      <p>
        El tratamiento de tus datos se rige por nuestra{" "}
        <Link href="/privacidad">Política de Privacidad</Link> y nuestra{" "}
        <Link href="/cookies">Política de Cookies</Link>.
      </p>

      <h2>12. Cambios y ley aplicable</h2>
      <p>
        Podemos modificar estos términos; la versión vigente es la publicada
        en esta página y los servicios ya contratados se rigen por la versión
        aceptada al contratar. Estos términos se rigen por las leyes de la
        República de Chile. [TODO(legal): definir tribunales competentes,
        respetando el domicilio del consumidor].
      </p>
    </LegalPage>
  );
}
