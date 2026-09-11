import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { Sparkles, Shield, Video, FileText } from "lucide-react";

export default function LecturasPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Consultas & Cartografía Álmica</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-on-surface">
          Lecturas de Tarot & Sesiones
        </h1>
        <p className="text-sm sm:text-base text-on-surface/80 leading-relaxed max-w-2xl mx-auto font-light">
          Un espacio seguro y confidencial donde las cartas son llaves hacia tu sabiduría oculta. Cada sesión es canalizada en tiempo real adaptándose a tu vibración presente.
        </p>
      </div>

      {/* Sellos de Confianza y Dinámica */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 p-4 rounded-card glass-panel border border-accent-rose/10">
          <Video className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs">
            <strong className="text-on-surface block">En Vivo por Zoom HD</strong>
            <span className="text-on-surface/70">Conexión íntima y sincrónica</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-card glass-panel border border-accent-rose/10">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs">
            <strong className="text-on-surface block">Audio & Mapa en PDF</strong>
            <span className="text-on-surface/70">Grabación completa para tu archivo</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-card glass-panel border border-accent-rose/10">
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs">
            <strong className="text-on-surface block">Confidencialidad Total</strong>
            <span className="text-on-surface/70">Secreto y respeto profesional</span>
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
