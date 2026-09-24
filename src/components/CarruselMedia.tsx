"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface MediaItem {
  tipo: "imagen" | "video";
  src: string;
  alt: string;
}

interface CarruselMediaProps {
  items: MediaItem[];
}

/** Posición de cada tarjeta según su distancia a la del centro. */
const POSICIONES: Record<number, string> = {
  0: "translate-x-0 scale-100 opacity-100 z-30",
  1: "translate-x-[62%] sm:translate-x-[72%] scale-[0.78] opacity-70 z-20",
  [-1]: "-translate-x-[62%] sm:-translate-x-[72%] scale-[0.78] opacity-70 z-20",
  2: "translate-x-[125%] scale-[0.6] opacity-0 sm:opacity-40 z-10",
  [-2]: "-translate-x-[125%] scale-[0.6] opacity-0 sm:opacity-40 z-10",
};

export default function CarruselMedia({ items }: CarruselMediaProps) {
  const [activo, setActivo] = useState(0);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const inicioToque = useRef<number | null>(null);
  const total = items.length;

  const ir = (paso: number) => setActivo((a) => (a + paso + total) % total);

  /** Distancia circular más corta entre la tarjeta y la activa. */
  const distancia = (i: number) => {
    let d = i - activo;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  // Solo se reproduce el video del centro.
  useEffect(() => {
    videosRef.current.forEach((video, i) => {
      if (!video) return;
      if (i === activo) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activo]);

  return (
    <div className="space-y-6">
      <div
        className="relative mx-auto h-[440px] sm:h-[560px] max-w-5xl overflow-hidden"
        onTouchStart={(e) => (inicioToque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (inicioToque.current === null) return;
          const dx = e.changedTouches[0].clientX - inicioToque.current;
          if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
          inicioToque.current = null;
        }}
      >
        {items.map((item, i) => {
          const d = distancia(i);
          const esActivo = d === 0;
          const posicion = POSICIONES[d] ?? "scale-50 opacity-0 z-0";

          return (
            <div
              key={item.src}
              className={`absolute top-0 left-1/2 -ml-[124px] sm:-ml-[158px] w-[248px] sm:w-[316px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-border-subtle shadow-xl transition-all duration-500 ease-out ${posicion} ${esActivo ? "" : "cursor-pointer"}`}
              onClick={esActivo ? undefined : () => setActivo(i)}
              aria-hidden={!esActivo}
            >
              {item.tipo === "imagen" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="316px"
                  className="object-cover"
                />
              ) : (
                <video
                  ref={(el) => {
                    videosRef.current[i] = el;
                  }}
                  src={item.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={esActivo}
                  aria-label={item.alt}
                  className={`w-full h-full object-cover ${esActivo ? "" : "pointer-events-none"}`}
                />
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => ir(-1)}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-text-primary hover:bg-primary hover:text-white shadow-md transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => ir(1)}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-text-primary hover:bg-primary hover:text-white shadow-md transition-all"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActivo(i)}
            className={`h-2 rounded-full transition-all ${i === activo ? "w-6 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"}`}
            aria-label={`Ir al elemento ${i + 1}`}
            aria-current={i === activo}
          />
        ))}
      </div>
    </div>
  );
}
