"use client";

import { FotoColeccion } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const INTERVALO_MS = 5000;

interface VisorColeccionProps {
  fotos: FotoColeccion[];
  nombre: string;
}

/**
 * Fotos de una colección en fundido: rotan solas (se pausan al pasar el
 * mouse), con flechas, barras de progreso y swipe en celular. Las fotos son
 * flyers con texto, así que se muestran completas sobre su propio desenfoque.
 */
export default function VisorColeccion({ fotos, nombre }: VisorColeccionProps) {
  const [activa, setActiva] = useState(0);
  const [pausado, setPausado] = useState(false);
  const inicioToque = useRef<number | null>(null);
  const total = fotos.length;
  const varias = total > 1;

  const ir = (paso: number) => setActiva((a) => (a + paso + total) % total);

  // Se reinicia con cada cambio, así una elección manual da el tiempo completo.
  useEffect(() => {
    if (!varias || pausado) return;
    const t = setTimeout(() => setActiva((a) => (a + 1) % total), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [activa, pausado, varias, total]);

  return (
    <div
      className="group/visor absolute inset-0"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onTouchStart={(e) => (inicioToque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (inicioToque.current === null) return;
        const dx = e.changedTouches[0].clientX - inicioToque.current;
        if (varias && Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
        inicioToque.current = null;
      }}
      role={varias ? "region" : undefined}
      aria-roledescription={varias ? "carrusel" : undefined}
      aria-label={varias ? `Fotos de ${nombre}` : undefined}
    >
      {fotos.map((foto, i) => {
        const visible = i === activa;
        return (
          <div
            key={foto.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
            aria-hidden={!visible}
          >
            <Image
              src={foto.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover scale-110 blur-2xl opacity-80"
            />
            <Image
              src={foto.src}
              alt={foto.titulo}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        );
      })}

      {varias && (
        <>
          {/* Pie: título + progreso */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pt-12 pb-4 bg-gradient-to-t from-black/60 via-black/25 to-transparent">
            <div className="flex items-baseline justify-between gap-4 text-white">
              <span className="font-serif italic text-base sm:text-lg truncate" aria-live="polite">
                {fotos[activa].titulo}
              </span>
              <span className="text-[10px] tracking-[0.25em] tabular-nums text-white/70 shrink-0">
                {String(activa + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {fotos.map((foto, i) => (
                <button
                  key={foto.src}
                  type="button"
                  onClick={() => setActiva(i)}
                  aria-label={`Ver ${foto.titulo} (${i + 1} de ${total})`}
                  aria-current={i === activa}
                  className="relative flex-1 h-4 -my-1.5 group/barra"
                >
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/30 overflow-hidden">
                    <span
                      key={`${activa}-${pausado}`}
                      className={`absolute inset-y-0 left-0 bg-white ${i < activa ? "w-full" : i === activa ? (pausado ? "w-full" : "animate-[progreso-visor_5s_linear_forwards]") : "w-0"}`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => ir(-1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/85 text-text-primary shadow-md opacity-0 group-hover/visor:opacity-100 focus-visible:opacity-100 hover:bg-primary hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => ir(1)}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/85 text-text-primary shadow-md opacity-0 group-hover/visor:opacity-100 focus-visible:opacity-100 hover:bg-primary hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
