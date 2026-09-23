"use client";

import SesionCard, { TipoSesion } from "@/components/SesionCard";
import { Sesion } from "@/data/sesiones";
import { ListFilter } from "lucide-react";
import { useMemo, useState } from "react";

interface SesionesGridProps {
  sesiones: Sesion[];
  tipo?: TipoSesion;
}

const TODAS = "todas";

export default function SesionesGrid({
  sesiones,
  tipo = "sesion",
}: SesionesGridProps) {
  const esEncuentro = tipo === "encuentro";
  const [filtro, setFiltro] = useState<string>(TODAS);

  const sesionesFiltradas = useMemo(
    () =>
      filtro === TODAS
        ? sesiones
        : sesiones.filter((s) => s.id === filtro),
    [sesiones, filtro],
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <label className="relative w-full max-w-md">
          <span className="sr-only">
            {esEncuentro
              ? "Filtrar por encuentro"
              : "Filtrar por tipo de sesión"}
          </span>
          <ListFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full appearance-none bg-white/95 border border-border-subtle rounded-full pl-11 pr-10 py-3 text-sm text-text-primary shadow-xs focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value={TODAS}>
              {esEncuentro ? "Todos los encuentros" : "Todas las sesiones"}
            </option>
            {sesiones.map((sesion) => (
              <option key={sesion.id} value={sesion.id}>
                {sesion.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sesionesFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sesionesFiltradas.map((sesion) => (
            <SesionCard key={sesion.id} sesion={sesion} tipo={tipo} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text-secondary text-sm">
          {esEncuentro
            ? "No encontramos encuentros para este filtro."
            : "No encontramos sesiones para este filtro."}
        </p>
      )}
    </div>
  );
}
