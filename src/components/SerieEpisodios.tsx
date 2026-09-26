"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export interface Episodio {
  titulo: string;
  src: string;
  duracion: string;
}

interface SerieEpisodiosProps {
  serie: string;
  episodios: Episodio[];
}

/**
 * Reproductor tipo "serie": un video vertical grande y la lista de episodios
 * al lado. Al elegir un episodio se carga en el reproductor y arranca con sonido.
 */
export default function SerieEpisodios({ serie, episodios }: SerieEpisodiosProps) {
  const [activo, setActivo] = useState(0);
  // El primer episodio espera al usuario; los que elige arrancan solos.
  const [elegido, setElegido] = useState(false);
  const episodio = episodios[activo];

  const elegir = (i: number) => {
    setActivo(i);
    setElegido(true);
  };

  return (
    <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-14 items-center">
      <div className="relative mx-auto w-full max-w-[340px] aspect-[9/16] rounded-[1.75rem] overflow-hidden bg-black ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(154,46,101,0.55)]">
        <video
          key={episodio.src}
          autoPlay={elegido}
          src={`${episodio.src}#t=0.5`}
          controls
          playsInline
          preload="metadata"
          aria-label={episodio.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <ol className="border-t border-white/15">
        {episodios.map((ep, i) => {
          const esActivo = i === activo;
          return (
            <li key={ep.src} className="border-b border-white/15">
              <button
                type="button"
                onClick={() => elegir(i)}
                aria-current={esActivo}
                className="group w-full flex items-center gap-5 sm:gap-8 py-5 sm:py-6 text-left"
              >
                <span
                  className={`font-serif text-3xl sm:text-4xl tabular-nums transition-colors ${esActivo ? "text-primary-soft" : "text-white/25 group-hover:text-white/50"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-white/45">
                    {serie}
                  </span>
                  <span
                    className={`block font-serif text-lg sm:text-xl transition-colors ${esActivo ? "text-white" : "text-white/70 group-hover:text-white"}`}
                  >
                    {ep.titulo}
                  </span>
                </span>
                <span className="text-xs text-white/40 tabular-nums">
                  {ep.duracion}
                </span>
                <span
                  className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-full border transition-all ${esActivo ? "bg-primary border-primary text-white" : "border-white/25 text-white/60 group-hover:border-white/60"}`}
                  aria-hidden="true"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
