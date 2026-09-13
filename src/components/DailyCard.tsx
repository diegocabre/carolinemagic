"use client";

import { motion } from "framer-motion";
import { Eye, Moon, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

interface DailyArcana {
  name: string;
  number: string;
  keywords: string[];
  message: string;
  symbol: string;
}

const arcanaList: DailyArcana[] = [
  {
    name: "La Estrella",
    number: "XVII",
    keywords: ["Esperanza", "Inspiración", "Claridad"],
    message:
      "Tus heridas pasadas se convierten hoy en la fuente de tu guía. Confía en el flujo orgánico de tus anhelos más puros.",
    symbol: "✧",
  },
  {
    name: "La Suma Sacerdotisa",
    number: "II",
    keywords: ["Intuición", "Misterio", "Silencio"],
    message:
      "La respuesta no está en el ruido exterior. Cruza el velo hacia tu templo interno; tu sabiduría celular ya lo sabe.",
    symbol: "☽",
  },
  {
    name: "El Mago",
    number: "I",
    keywords: ["Manifestación", "Poder", "Recursos"],
    message:
      "Tienes en tu mesa todos los elementos para crear tu realidad. La intención alineada a la voluntad disuelve cualquier duda.",
    symbol: "🜂",
  },
  {
    name: "El Sol",
    number: "XIX",
    keywords: ["Vitalidad", "Éxito", "Autenticidad"],
    message:
      "La verdad ilumina sin quemar. Es tiempo de mostrarte tal cual eres, sin escudos ni disfraces arquetípicos.",
    symbol: "🜚",
  },
];

// Índice determinado por la fecha, para que "hoy" sea la misma carta durante todo el día
function getTodayIndex(length: number) {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86_400_000,
  );
  return dayOfYear % length;
}

export default function DailyCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(() =>
    getTodayIndex(arcanaList.length),
  );

  const currentCard = arcanaList[cardIndex];

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % arcanaList.length);
    }, 250);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Indicador de fase lunar */}
      <div className="flex items-center justify-between mb-4 px-4 py-2.5 rounded-full bg-white/95 border border-border-subtle text-xs shadow-sm">
        <div className="flex items-center gap-2 text-text-secondary">
          <Moon className="w-4 h-4 text-primary animate-pulse" />
          <span>
            Fase Actual:{" "}
            <strong className="text-text-primary font-semibold">
              Luna Creciente en Cáncer
            </strong>
          </span>
        </div>
        <button
          onClick={handleNextCard}
          className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-[11px] font-medium"
          title="Revelar otra carta"
        >
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
          <span>Cambiar</span>
        </button>
      </div>

      {/* Contenedor interactivo de carta con Flip 3D */}
      <div
        className="relative w-full h-[420px] cursor-pointer perspective-1000 group select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative transform-style-preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* FRENTE DE LA CARTA (DORSO MÍSTICO CERRADO) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-white/95 backdrop-blur-md p-6 flex flex-col items-center justify-between backface-hidden border border-border-subtle shadow-md group-hover:border-primary/40 group-hover:shadow-xl transition-all">
            <div className="w-full flex justify-between items-center text-xs tracking-widest uppercase text-text-muted font-medium">
              <span>Caroline Magic</span>
              <span>Arcano del Día</span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
              <div className="w-24 h-24 rounded-full border border-primary/25 bg-primary-soft/60 flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-text-primary font-bold tracking-tight">
                Toca para Revelar
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary max-w-xs leading-relaxed font-normal">
                Toma una respiración profunda, formula tu intención interna y
                voltea tu sincronicidad para el día de hoy.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-primary font-semibold tracking-wider uppercase">
              <Eye className="w-4 h-4" />
              <span>Girar Carta</span>
            </div>
          </div>

          {/* REVERSO DE LA CARTA (ARCANO REVELADO) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#FDF5F9] to-primary-soft border-2 border-primary/35 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-lg">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <span className="font-serif text-base tracking-widest text-primary font-bold">
                {currentCard.number}
              </span>
              <span className="text-xl text-secondary">
                {currentCard.symbol}
              </span>
            </div>

            <div className="text-center py-4 space-y-3">
              <h3 className="font-serif text-3xl font-bold text-text-primary tracking-tight">
                {currentCard.name}
              </h3>
              <div className="flex justify-center flex-wrap gap-1.5">
                {currentCard.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-white text-secondary border border-secondary/15 font-medium shadow-xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-primary leading-relaxed italic pt-2 font-normal">
                &ldquo;{currentCard.message}&rdquo;
              </p>
            </div>

            <div className="text-center pt-3 border-t border-border-subtle">
              <span className="text-[11px] text-text-muted uppercase tracking-widest font-medium">
                Mensaje canalizado por Caroline
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
