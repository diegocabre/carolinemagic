"use client";

import {
  registrarSolicitudAction,
  type RegistrarSolicitudState,
} from "@/lib/actions/admin";
import { CANALES_SOLICITUD, TIPOS_SOLICITUD } from "@/lib/derechos/schema";
import { useActionState } from "react";

const initialState: RegistrarSolicitudState = {};

const campo =
  "w-full bg-surface-muted border border-border-subtle rounded-lg px-2 py-1.5 text-xs";

function hoyEnChile(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Santiago" });
}

/** Anota una solicitud de derechos que llegó por WhatsApp, correo u otro canal. */
export default function RegistrarSolicitudForm() {
  const [state, formAction, pending] = useActionState(
    registrarSolicitudAction,
    initialState,
  );

  return (
    <form action={formAction} className="rounded-xl border border-border-subtle p-4 space-y-3">
      <p className="text-xs font-semibold text-text-primary">
        Registrar solicitud recibida
      </p>
      <div className="grid sm:grid-cols-3 gap-2">
        <label className="space-y-1 text-[11px] text-text-secondary sm:col-span-3">
          Tipo
          <select name="tipo" required defaultValue="" className={campo}>
            <option value="" disabled>
              Elige una opción
            </option>
            {Object.entries(TIPOS_SOLICITUD).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-[11px] text-text-secondary sm:col-span-2">
          Canal
          <select name="canal" required defaultValue="whatsapp" className={campo}>
            {Object.entries(CANALES_SOLICITUD).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-[11px] text-text-secondary">
          Recibida el
          <input
            type="date"
            name="recibidaEn"
            required
            defaultValue={hoyEnChile()}
            className={campo}
          />
        </label>
      </div>
      <p className="text-[11px] text-text-muted">
        No anotes nombres ni detalles aquí: quedan en la conversación original.
      </p>
      {state.error && <p className="text-[11px] text-red-600">{state.error}</p>}
      {state.id && !pending && (
        <p className="text-[11px] text-emerald-700">
          Registrada como {state.id}. Puedes darle este número a la persona.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Registrar"}
      </button>
    </form>
  );
}
