"use client";

import ConsentCheckbox from "@/components/legal/ConsentCheckbox";
import {
  enviarSolicitudDerechosAction,
  type DerechosFormState,
} from "@/lib/actions/derechos";
import { RELACIONES, TIPOS_SOLICITUD } from "@/lib/derechos/schema";
import { useActionState } from "react";

const initialState: DerechosFormState = {};

const inputClass =
  "w-full bg-surface-muted border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all";

function ErrorCampo({ id, mensaje }: { id: string; mensaje?: string }) {
  if (!mensaje) return null;
  return (
    <p id={`${id}-error`} className="text-[11px] text-red-600">
      {mensaje}
    </p>
  );
}

export default function DerechosForm() {
  const [state, formAction, pending] = useActionState(
    enviarSolicitudDerechosAction,
    initialState,
  );
  const e = state.errores ?? {};
  const v = state.valores ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-800 space-y-2">
        <p className="font-semibold">Recibimos tu solicitud.</p>
        <p>
          Tu número de solicitud es <strong>{state.id}</strong>. Te enviamos un
          acuse de recibo a tu correo. Si no lo ves, revisa la carpeta de spam.
        </p>
      </div>
    );
  }

  const aria = (campo: string) =>
    e[campo] ? { "aria-invalid": true, "aria-describedby": `${campo}-error` } : {};

  return (
    <form action={formAction} className="space-y-5" data-clarity-mask="true" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="tipo" className="text-xs font-medium text-text-secondary">
          ¿Qué quieres solicitar?
        </label>
        <select id="tipo" name="tipo" required defaultValue={v.tipo ?? ""} className={inputClass} {...aria("tipo")}>
          <option value="" disabled>
            Elige una opción
          </option>
          {Object.entries(TIPOS_SOLICITUD).map(([valor, texto]) => (
            <option key={valor} value={valor}>
              {texto}
            </option>
          ))}
        </select>
        <ErrorCampo id="tipo" mensaje={e.tipo} />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-text-secondary mb-1">
          ¿De quién son los datos?
        </legend>
        {Object.entries(RELACIONES).map(([valor, texto]) => (
          <label key={valor} className="flex items-start gap-3 text-sm text-text-secondary cursor-pointer">
            <input type="radio" name="relacion" value={valor} required defaultChecked={v.relacion === valor} className="mt-1 accent-primary" />
            <span>{texto}</span>
          </label>
        ))}
        <ErrorCampo id="relacion" mensaje={e.relacion} />
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="nombre" className="text-xs font-medium text-text-secondary">
            Nombre completo
          </label>
          <input id="nombre" name="nombre" type="text" required maxLength={120} autoComplete="name" defaultValue={v.nombre} className={inputClass} {...aria("nombre")} />
          <ErrorCampo id="nombre" mensaje={e.nombre} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-text-secondary">
            Correo electrónico
          </label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={v.email} className={inputClass} {...aria("email")} />
          <ErrorCampo id="email" mensaje={e.email} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="telefono" className="text-xs font-medium text-text-secondary">
          Teléfono con el que nos escribiste por WhatsApp (opcional)
        </label>
        <input id="telefono" name="telefono" type="tel" maxLength={20} autoComplete="tel" placeholder="+56 9 ..." defaultValue={v.telefono} className={inputClass} {...aria("telefono")} />
        <p className="text-[11px] text-text-muted">
          Nos ayuda a encontrar tus datos y a confirmar que eres tú.
        </p>
        <ErrorCampo id="telefono" mensaje={e.telefono} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="detalle" className="text-xs font-medium text-text-secondary">
          Detalle de tu solicitud
        </label>
        <textarea id="detalle" name="detalle" required rows={5} maxLength={3000} defaultValue={v.detalle} className={`${inputClass} resize-y`} {...aria("detalle")} />
        <p className="text-[11px] text-text-muted">
          Cuéntanos qué necesitas. <strong>No incluyas</strong> datos de salud,
          copias de tu cédula ni otros documentos: si necesitamos verificar tu
          identidad, te lo pediremos por un canal seguro.
        </p>
        <ErrorCampo id="detalle" mensaje={e.detalle} />
      </div>

      {/* Campo trampa para bots: oculto para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="sitioWeb">No completar</label>
        <input id="sitioWeb" name="sitioWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-3 pt-1">
        <ConsentCheckbox
          name="declaraVeracidad"
          finalidad="Declaro que la información es verdadera y que soy la persona titular o su representante."
          error={e.declaraVeracidad}
        />
        <ConsentCheckbox
          name="aceptaPolitica"
          finalidad="Acepto que usen estos datos solo para responder esta solicitud y acreditar su respuesta."
          error={e.aceptaPolitica}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}
