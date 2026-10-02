"use client";

import { abrirPreferenciasCookies } from "@/lib/consent";

/** Reabre el panel de consentimiento de cookies (Footer y /cookies). */
export default function BotonPreferenciasCookies({
  className,
  texto = "Preferencias de cookies",
}: {
  className?: string;
  texto?: string;
}) {
  return (
    <button type="button" onClick={abrirPreferenciasCookies} className={className}>
      {texto}
    </button>
  );
}
