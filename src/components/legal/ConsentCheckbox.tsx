import Link from "next/link";

/**
 * Casilla de consentimiento reutilizable para CUALQUIER formulario que
 * recoja datos personales (reservas, newsletter, contacto...).
 *
 * Reglas (ver docs/PRIVACIDAD-DESARROLLO.md):
 * - Nunca premarcada: no acepta `defaultChecked` a propósito.
 * - Una finalidad específica por casilla (no agrupar "acepto todo").
 * - Siempre con enlace a la política.
 * - Envía el valor "on" cuando está marcada; valida en el servidor con
 *   `z.literal("on")` y guarda fecha + versión de la política si corresponde.
 */
export default function ConsentCheckbox({
  name,
  finalidad,
  required = true,
  error,
  politicaHref = "/privacidad",
  politicaTexto = "Política de Privacidad",
}: {
  /** Nombre del campo en el FormData. */
  name: string;
  /** Qué se acepta, en concreto. Ej: "recibir el newsletter mensual por correo". */
  finalidad: React.ReactNode;
  required?: boolean;
  error?: string;
  politicaHref?: string;
  politicaTexto?: string;
}) {
  const id = `consent-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex items-start gap-3 text-xs text-text-secondary leading-relaxed cursor-pointer">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-subtle accent-primary"
        />
        <span>
          {finalidad} Leí la{" "}
          <Link href={politicaHref} target="_blank" className="text-primary underline underline-offset-2">
            {politicaTexto}
          </Link>
          .
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-[11px] text-red-600 pl-7">
          {error}
        </p>
      )}
    </div>
  );
}
