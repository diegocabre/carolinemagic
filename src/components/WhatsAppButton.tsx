"use client";

import {
  getWhatsAppUrl,
  IS_USING_TEST_WHATSAPP_NUMBER,
  WHATSAPP_MESSAGES,
} from "@/config/whatsapp";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.default);

  return (
    <aside
      aria-label="Atención por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip flotante estilizado: Consulta con Selene */}
      <div
        id="whatsapp-tooltip"
        role="tooltip"
        className={`mr-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-primary/20 shadow-xl transition-all duration-300 pointer-events-none flex items-center gap-2.5 ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-2 scale-95 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:translate-x-0 sm:group-hover:scale-100"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-serif font-bold text-text-primary leading-tight">
            Consulta con Selene
          </span>
          <span className="text-[10px] text-text-muted tracking-wide font-sans">
            Guía & Soporte Místico
          </span>
        </div>
      </div>

      {/* Botón principal circular con halo de pulso */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consulta con Selene vía WhatsApp (abre en nueva pestaña)"
        aria-describedby="whatsapp-tooltip"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 border-2 border-white/80 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30"
      >
        {/* Halo de pulso sutil */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Pequeña insignia de misticismo */}
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm border border-white"
          title="Caroline Magic"
          aria-hidden="true"
        >
          ✦
        </span>

        {/* Icono de WhatsApp oficial vectorizado */}
        <svg
          className="w-7 h-7 fill-current text-white drop-shadow-sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
      {/* Indicador temporal: solo visible mientras se usa el número de prueba de Meta */}
      {IS_USING_TEST_WHATSAPP_NUMBER && (
        <span
          className="absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-sm animate-pulse"
          title="Usando número de WhatsApp de PRUEBA — recordar reemplazar cuando el bot esté aprobado"
          aria-hidden="true"
        />
      )}
    </aside>
  );
}
