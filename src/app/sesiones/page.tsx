import SesionesGrid from "@/components/SesionesGrid";
import { sesionesIndividuales } from "@/data/sesiones";
import { FileText, Shield, Sparkles, Video } from "lucide-react";

export default function LecturasPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Servicios 1 a 1</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Sesiones Individuales
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Todos los servicios personalizados 1 a 1: tarot, mediumnidad,
          constelaciones, registros akáshicos, trabajo energético y
          acompañamientos a tu medida. Cada sesión es canalizada en tiempo
          real, adaptándose a tu vibración presente.
        </p>
      </div>

      {/* Sellos de Confianza y Dinámica */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Video className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              En Vivo por Zoom HD
            </strong>
            <span className="text-text-secondary">
              Conexión íntima y sincrónica
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Audio & Mapa en PDF
            </strong>
            <span className="text-text-secondary">
              Grabación completa para tu archivo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Confidencialidad Total
            </strong>
            <span className="text-text-secondary">
              Secreto y respeto profesional
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Sesiones */}
      <div className="pt-4">
        <SesionesGrid sesiones={sesionesIndividuales} />
      </div>
    </div>
  );
}
