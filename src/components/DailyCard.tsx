"use client";

import { DailyCardData } from "@/lib/dailyCard";
import { motion } from "framer-motion";
import { Eye, Moon, Sparkles } from "lucide-react";
import { useState } from "react";

interface DailyCardProps {
  dailyCard: DailyCardData | null;
  faseLunar: string;
}

export default function DailyCard({ dailyCard, faseLunar }: DailyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const tieneCortada = Boolean(dailyCard?.portadaUrl);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Indicador de fase lunar */}
      <div className="flex items-center justify-between mb-4 px-4 py-2.5 rounded-full bg-white/95 border border-border-subtle text-xs shadow-sm">
        <div className="flex items-center gap-2 text-text-secondary">
          <Moon className="w-4 h-4 text-primary animate-pulse" />
          <span>
            Fase Actual:{" "}
            <strong className="text-text-primary font-semibold">
              {faseLunar}
            </strong>
          </span>
        </div>
      </div>

      {/* Contenedor interactivo de carta con Flip 3D */}
      <div
        className="relative w-full h-[480px] sm:h-[520px] cursor-pointer perspective-1000 group select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative transform-style-preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* FRENTE DE LA CARTA (DORSO MÍSTICO CERRADO) */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col items-center justify-between backface-hidden border shadow-md group-hover:shadow-xl transition-all overflow-hidden ${
              tieneCortada
                ? "border-white/20"
                : "bg-white/95 backdrop-blur-md border-border-subtle group-hover:border-primary/40"
            }`}
          >
            {tieneCortada && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dailyCard!.portadaUrl}
                  alt="Portada de la carta del día"
                  className="absolute inset-0 w-full h-full object-cover -z-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60 -z-10" />
              </>
            )}

            <div
              className={`w-full flex justify-between items-center text-xs tracking-widest uppercase font-medium ${
                tieneCortada ? "text-white/90" : "text-text-muted"
              }`}
            >
              <span>Caroline Magic</span>
              <span>Sincronicidad del Día</span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
              {!tieneCortada && (
                <div className="w-24 h-24 rounded-full border border-primary/25 bg-primary-soft/60 flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
                  <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>
              )}
              <h4
                className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                  tieneCortada
                    ? "text-white drop-shadow-md"
                    : "text-text-primary"
                }`}
              >
                Toca para Revelar
              </h4>
              <p
                className={`text-xs sm:text-sm max-w-xs leading-relaxed font-normal ${
                  tieneCortada ? "text-white/90 drop-shadow-sm" : "text-text-secondary"
                }`}
              >
                Toma una respiración profunda, formula tu intención interna y
                voltea tu sincronicidad para el día de hoy.
              </p>
            </div>

            <div
              className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${
                tieneCortada ? "text-white drop-shadow-sm" : "text-primary"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Girar Carta</span>
            </div>
          </div>

          {/* REVERSO DE LA CARTA (SINCRONICIDAD CANALIZADA POR CAROLINE) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#FDF5F9] to-primary-soft border-2 border-primary/35 shadow-lg backface-hidden rotate-y-180 flex flex-col overflow-hidden">
            {dailyCard ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dailyCard.imagenUrl}
                  alt={dailyCard.titulo || "Sincronicidad del día"}
                  className="w-full h-[45%] object-cover"
                />
                <div className="flex-1 min-h-0 flex flex-col p-5 sm:p-6">
                  {dailyCard.titulo && (
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-primary tracking-tight mb-2">
                      {dailyCard.titulo}
                    </h3>
                  )}
                  <p className="text-sm text-text-primary leading-relaxed italic overflow-y-auto">
                    &ldquo;{dailyCard.interpretacion}&rdquo;
                  </p>
                  <div className="pt-3 mt-auto border-t border-border-subtle text-center">
                    <span className="text-[11px] text-text-muted uppercase tracking-widest font-medium">
                      Mensaje canalizado por Caroline
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 p-8">
                <Sparkles className="w-8 h-8 text-primary/50" />
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                  Caroline aún no ha canalizado la sincronicidad de hoy.
                  Vuelve un poco más tarde ✨
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
