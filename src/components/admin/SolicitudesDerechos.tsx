import RegistrarSolicitudForm from "@/components/admin/RegistrarSolicitudForm";
import { actualizarEstadoSolicitudAction } from "@/lib/actions/admin";
import { listarRegistros, type RegistroSolicitud } from "@/lib/derechos/registro";
import {
  CANALES_SOLICITUD,
  ESTADOS_SOLICITUD,
  TIPOS_SOLICITUD,
} from "@/lib/derechos/schema";

function fecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", { timeZone: "America/Santiago" });
}

function cerrada(r: RegistroSolicitud): boolean {
  return r.estado === "respondida" || r.estado === "rechazada";
}

/**
 * Registro de solicitudes de derechos (sin datos personales: el detalle está
 * en la conversación de WhatsApp o el correo original).
 */
export default async function SolicitudesDerechos() {
  let registros: RegistroSolicitud[] = [];
  let error = false;
  try {
    registros = await listarRegistros();
  } catch {
    error = true;
  }
  const ahora = new Date().toISOString();

  return (
    <section className="w-full max-w-xl bg-white/95 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-text-primary mb-1">
          Solicitudes de derechos
        </h2>
        <p className="text-xs text-text-secondary">
          Cuando alguien pida acceder, corregir o borrar sus datos (por
          WhatsApp o correo), regístralo aquí: el panel calcula el plazo de
          respuesta. Actualiza el estado al responder.
        </p>
      </div>

      <RegistrarSolicitudForm />

      {error && (
        <p className="text-xs text-red-600">No se pudo leer el registro (revisa Upstash).</p>
      )}
      {!error && registros.length === 0 && (
        <p className="text-xs text-text-muted">No hay solicitudes registradas.</p>
      )}

      <ul className="divide-y divide-border-subtle">
        {registros.map((r) => {
          const vencida = !cerrada(r) && r.venceEn < ahora;
          return (
            <li key={r.id} className="py-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-text-primary font-mono">{r.id}</strong>
                <span className={vencida ? "text-red-600 font-semibold" : "text-text-muted"}>
                  {vencida ? "PLAZO VENCIDO · " : ""}vence {fecha(r.venceEn)}
                </span>
              </div>
              <p className="text-text-secondary">
                {TIPOS_SOLICITUD[r.tipo]} · {CANALES_SOLICITUD[r.canal] ?? "—"} ·
                recibida {fecha(r.recibidaEn)}
              </p>
              <form action={actualizarEstadoSolicitudAction} className="flex gap-2">
                <input type="hidden" name="id" value={r.id} />
                <select
                  name="estado"
                  defaultValue={r.estado}
                  className="flex-1 bg-surface-muted border border-border-subtle rounded-lg px-2 py-1.5"
                >
                  {Object.entries(ESTADOS_SOLICITUD).map(([valor, texto]) => (
                    <option key={valor} value={valor}>
                      {texto}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover"
                >
                  Guardar
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
