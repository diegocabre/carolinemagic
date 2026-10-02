import { FECHA_ULTIMA_ACTUALIZACION, valorLegal } from "@/config/legal";
import { Sparkles } from "lucide-react";

/**
 * Plantilla común de las páginas legales.
 * TODO(legal): todos los textos que usan esta plantilla requieren revisión
 * de un abogado antes de publicarse (ver docs/cumplimiento/LEGAL-REVISION.md).
 */
export default function LegalPage({
  etiqueta,
  titulo,
  bajada,
  mostrarFecha = true,
  children,
}: {
  etiqueta: string;
  titulo: string;
  bajada?: string;
  mostrarFecha?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-16 bg-mystic-glow">
      <article className="max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{etiqueta}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
            {titulo}
          </h1>
          {bajada && (
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
              {bajada}
            </p>
          )}
          {mostrarFecha && (
            <p className="text-xs text-text-muted">
              Última actualización: {formatearFecha(FECHA_ULTIMA_ACTUALIZACION)}
            </p>
          )}
        </header>

        <div className="rounded-3xl bg-white/95 border border-border-subtle shadow-sm p-6 sm:p-10 legal-prose">
          {children}
        </div>
      </article>
    </div>
  );
}

export function formatearFecha(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Muestra un dato de src/config/legal.ts o un aviso visible si falta. */
export function DatoLegal({ valor }: { valor: string }) {
  const real = valorLegal(valor);
  if (real) return <>{real}</>;
  return (
    <span className="inline-block rounded bg-amber-100 text-amber-800 px-1.5 text-[0.85em] font-medium">
      [Pendiente de completar]
    </span>
  );
}

/** Enlace mailto para un correo de legal.ts, o aviso si falta. */
export function CorreoLegal({ valor }: { valor: string }) {
  const real = valorLegal(valor);
  if (!real) return <DatoLegal valor={valor} />;
  return (
    <a href={`mailto:${real}`} className="text-primary underline underline-offset-2">
      {real}
    </a>
  );
}
