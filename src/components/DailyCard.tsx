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
      <div className="flex items-center justify-between mb-4 px-4 py-2.5 rounded-full bg-white/95 border border-[rgba(98,67,127,0.12)] text-xs shadow-sm">
        <div className="flex items-center gap-2 text-[#685876]">
          <Moon className="w-4 h-4 text-[#9A2E65] animate-pulse" />
          <span>
            Fase Actual: <strong className="text-[#281D33] font-semibold">Luna Creciente en Cáncer</strong>
          </span>
        </div>
        <button
          onClick={handleNextCard}
          className="flex items-center gap-1.5 text-[#685876] hover:text-[#9A2E65] transition-colors text-[11px] font-medium"
          title="Revelar otra carta"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#9A2E65]" />
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
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-white/95 backdrop-blur-md p-6 flex flex-col items-center justify-between backface-hidden border border-[rgba(98,67,127,0.14)] shadow-md group-hover:border-[#9A2E65]/40 group-hover:shadow-xl transition-all">
            <div className="w-full flex justify-between items-center text-xs tracking-widest uppercase text-[#8C7C99] font-medium">
              <span>Caroline Magic</span>
              <span>Arcano del Día</span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
              <div className="w-24 h-24 rounded-full border border-[#9A2E65]/25 bg-[#F5D9E7]/60 flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#9A2E65]/30 animate-spin-slow" />
                <Sparkles className="w-10 h-10 text-[#9A2E65] animate-pulse" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#281D33] font-bold tracking-tight">
                Toca para Revelar
              </h4>
              <p className="text-xs sm:text-sm text-[#685876] max-w-xs leading-relaxed font-normal">
                Toma una respiración profunda, formula tu intención interna y voltea tu sincronicidad para el día de hoy.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#9A2E65] font-semibold tracking-wider uppercase">
              <Eye className="w-4 h-4" />
              <span>Girar Carta</span>
            </div>
          </div>

          {/* REVERSO DE LA CARTA (ARCANO REVELADO) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#FDF5F9] to-[#F5D9E7] border-2 border-[#9A2E65]/35 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-lg">
            <div className="flex justify-between items-center border-b border-[rgba(98,67,127,0.12)] pb-3">
              <span className="font-serif text-base tracking-widest text-[#9A2E65] font-bold">
                {currentCard.number}
              </span>
              <span className="text-xl text-[#523B68]">{currentCard.symbol}</span>
            </div>

            <div className="text-center py-4 space-y-3">
              <h3 className="font-serif text-3xl font-bold text-[#281D33] tracking-tight">
                {currentCard.name}
              </h3>
              <div className="flex justify-center flex-wrap gap-1.5">
                {currentCard.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-white text-[#523B68] border border-[#523B68]/15 font-medium shadow-xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#281D33] leading-relaxed italic pt-2 font-normal">
                &ldquo;{currentCard.message}&rdquo;
              </p>
            </div>

            <div className="text-center pt-3 border-t border-[rgba(98,67,127,0.12)]">
              <span className="text-[11px] text-[#8C7C99] uppercase tracking-widest font-medium">
                Mensaje canalizado por Caroline
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
