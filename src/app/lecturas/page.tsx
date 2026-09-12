import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { Sparkles, Shield, Video, FileText } from "lucide-react";

export default function LecturasPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-[radial-gradient(circle_at_top,_rgba(242,96,145,0.14),transparent_55%)]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5D9E7] text-[#9A2E65] text-xs uppercase tracking-widest font-semibold border border-[#9A2E65]/25 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Consultas & Cartografía Álmica</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#281D33] tracking-tight">
          Lecturas de Tarot & Sesiones
        </h1>
        <p className="text-sm sm:text-base text-[#685876] leading-relaxed max-w-2xl mx-auto">
          Un espacio seguro y confidencial donde las cartas son llaves hacia tu sabiduría oculta. Cada sesión es canalizada en tiempo real adaptándose a tu vibración presente.
        </p>
      </div>

      {/* Sellos de Confianza y Dinámica */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-[rgba(98,67,127,0.1)] shadow-xs">
          <Video className="w-5 h-5 text-[#9A2E65] shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-[#281D33] block font-semibold">En Vivo por Zoom HD</strong>
            <span className="text-[#685876]">Conexión íntima y sincrónica</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-[rgba(98,67,127,0.1)] shadow-xs">
          <FileText className="w-5 h-5 text-[#9A2E65] shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-[#281D33] block font-semibold">Audio & Mapa en PDF</strong>
            <span className="text-[#685876]">Grabación completa para tu archivo</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-[rgba(98,67,127,0.1)] shadow-xs">
          <Shield className="w-5 h-5 text-[#9A2E65] shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-[#281D33] block font-semibold">Confidencialidad Total</strong>
            <span className="text-[#685876]">Secreto y respeto profesional</span>
          </div>
        </div>
      </div>

      {/* Grid de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
