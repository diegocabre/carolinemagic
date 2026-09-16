"use client";

import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { Sesion } from "@/data/sesiones";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles, Sprout, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SesionCardProps {
  sesion: Sesion;
}

function ImagenSesion({
  sesion,
  className,
  sizes,
}: {
  sesion: Sesion;
  className?: string;
  sizes: string;
}) {
  if (!sesion.imagen) {
    return (
      <div
        className={`flex items-center justify-center bg-primary-soft/60 ${className}`}
      >
        <Sparkles className="w-10 h-10 text-primary/50" />
      </div>
    );
  }

  return (
    <Image
      src={sesion.imagen}
      alt={sesion.nombre}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}

function ReservarButton({
  sesion,
  className,
}: {
  sesion: Sesion;
  className: string;
}) {
  return (
    <a
      href={getWhatsAppUrl(WHATSAPP_MESSAGES.sesion(sesion.nombre))}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Reservar ${sesion.nombre} por WhatsApp (abre en nueva pestaña)`}
    >
      Reservar
    </a>
  );
}

export default function SesionCard({ sesion }: SesionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="relative bg-white/90 backdrop-blur-sm border border-border-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col group">
        {sesion.destacado && (
          <span className="absolute top-4 right-4 z-10 bg-primary text-white px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
            MÁS SOLICITADO
          </span>
        )}

        <div className="relative w-full aspect-[4/3]">
          <ImagenSesion sesion={sesion} sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        <div className="flex flex-col flex-1 p-6">
          <h3 className="font-serif text-xl text-text-primary font-bold group-hover:text-primary transition-colors mb-2">
            <span aria-hidden="true">{sesion.emoji}</span> {sesion.nombre}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {sesion.descripcionBreve}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-surface-muted text-secondary border border-secondary/15 px-3 py-1 rounded-full text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {sesion.duracion}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface-muted text-secondary border border-secondary/15 px-3 py-1 rounded-full text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {sesion.modalidad}
            </span>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block">
                Inversión
              </span>
              <span className="text-lg font-bold font-serif text-text-primary">
                {sesion.precio}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-secondary border border-secondary/20 hover:bg-surface-muted transition-all whitespace-nowrap"
              >
                Ver más
              </button>
              <ReservarButton
                sesion={sesion}
                className="px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-primary hover:bg-primary-hover text-white shadow-xs hover:shadow-md transition-all whitespace-nowrap"
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={sesion.nombre}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-text-primary hover:bg-primary hover:text-white shadow-md transition-all"
              aria-label="Cerrar"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="relative w-full aspect-[16/9] rounded-t-3xl overflow-hidden">
              <ImagenSesion sesion={sesion} sizes="(max-width: 768px) 100vw, 672px" />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-text-primary font-bold mb-3">
                  <span aria-hidden="true">{sesion.emoji}</span> {sesion.nombre}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-surface-muted text-secondary border border-secondary/15 px-3 py-1 rounded-full text-xs font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {sesion.duracion}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-surface-muted text-secondary border border-secondary/15 px-3 py-1 rounded-full text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {sesion.modalidad}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-text-secondary text-sm sm:text-base leading-relaxed">
                {sesion.descripcionLarga.split("\n\n").map((parrafo, i) => (
                  <p key={i}>{parrafo}</p>
                ))}
              </div>

              <div className="rounded-2xl bg-primary-soft/50 border border-primary/15 p-4 sm:p-5">
                <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                  <span aria-hidden="true">✨</span>{" "}
                  <strong className="font-semibold">Ideal para ti si:</strong>{" "}
                  {sesion.idealPara}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-secondary font-semibold">
                <Sprout className="w-3.5 h-3.5 text-primary" />
                Pilar Caroline Magic: {sesion.pilares}
              </div>

              <div className="pt-6 border-t border-border-subtle flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-text-muted block">
                    Inversión
                  </span>
                  <span className="text-2xl font-bold font-serif text-text-primary">
                    {sesion.precio}
                  </span>
                </div>

                <ReservarButton
                  sesion={sesion}
                  className="inline-flex items-center px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
