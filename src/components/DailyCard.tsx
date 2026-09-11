"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sparkles, RefreshCw, Eye } from "lucide-react";

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

export default function DailyCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

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
      <div className="flex items-center justify-between mb-4 px-4 py-2 rounded-full bg-surface-low border border-accent-rose/10 text-xs">
        <div className="flex items-center gap-2 text-accent-rose">
          <Moon className="w-4 h-4 text-primary animate-pulse" />
          <span>Fase Actual: <strong className="text-on-surface">Luna Creciente en Cáncer</strong></span>
        </div>
        <button
          onClick={handleNextCard}
          className="flex items-center gap-1 text-on-surface/60 hover:text-primary transition-colors text-[11px]"
          title="Revelar otra carta"
        >
          <RefreshCw className="w-3.5 h-3.5" />
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
          <div className="absolute inset-0 w-full h-full rounded-card glass-card p-6 flex flex-col items-center justify-between backface-hidden border-2 border-accent-rose/20 group-hover:border-primary/40 group-hover:shadow-mystic-glow">
            <div className="w-full flex justify-between items-center text-xs tracking-widest uppercase text-accent-rose/70">
              <span>Caroline Magic</span>
              <span>Arcano del Día</span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
              <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full border border-dashed border-accent-rose/40 animate-spin-slow" />
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h4 className="font-serif text-2xl text-on-surface font-semibold tracking-wide">
                Toca para Revelar
              </h4>
              <p className="text-xs text-on-surface/70 max-w-xs leading-relaxed">
                Toma una respiración profunda, formula tu intención interna y voltea tu sincronicidad para el día de hoy.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-primary font-medium tracking-wider uppercase">
              <Eye className="w-4 h-4" />
              <span>Girar Carta</span>
            </div>
          </div>

          {/* REVERSO DE LA CARTA (ARCANO REVELADO) */}
          <div className="absolute inset-0 w-full h-full rounded-card bg-surface-container/95 border-2 border-primary/40 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-mystic-glow">
            <div className="flex justify-between items-center border-b border-accent-rose/15 pb-3">
              <span className="font-serif text-sm tracking-widest text-primary font-bold">
                {currentCard.number}
              </span>
              <span className="text-xl text-accent-rose">{currentCard.symbol}</span>
            </div>

            <div className="text-center py-4 space-y-3">
              <h3 className="font-serif text-3xl font-bold text-on-surface tracking-wide">
                {currentCard.name}
              </h3>
              <div className="flex justify-center flex-wrap gap-1.5">
                {currentCard.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-surface-high text-accent-rose border border-accent-rose/20"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-sm text-on-surface/90 leading-relaxed italic pt-2">
                &ldquo;{currentCard.message}&rdquo;
              </p>
            </div>

            <div className="text-center pt-3 border-t border-accent-rose/15">
              <span className="text-[11px] text-accent-rose/70 uppercase tracking-widest">
                Mensaje canalizado por Caroline
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
