import SesionesGrid from "@/components/SesionesGrid";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { programasAcademia } from "@/data/sesiones";
import { FileText, GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function AcademiaPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academia Caroline Magic</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Formaciones & Cursos
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Formaciones, cursos autogestionados y programas de 21 días para
          aprender las herramientas de Caroline Magic y desarrollar tu propia
          forma de conectar, leer y acompañar.
        </p>
      </div>

      {/* Sellos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Teoría + Práctica
            </strong>
            <span className="text-text-secondary">
              Intuición y canalización en cada proceso
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Presencial u Online
            </strong>
            <span className="text-text-secondary">
              Según cada formación o curso
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Material PDF
            </strong>
            <span className="text-text-secondary">
              Incluido en formaciones y cursos
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Programas */}
      <div className="pt-4">
        <SesionesGrid sesiones={programasAcademia} tipo="academia" />
      </div>

      {/* Aviso de próximas fechas */}
      <div className="max-w-2xl mx-auto text-center rounded-3xl bg-gradient-to-br from-white/95 to-primary-soft/40 border border-border-subtle p-10 sm:p-14 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
          ¿Quieres saber cuándo comienza la próxima formación?
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Escríbenos y te avisaremos cuando se abran nuevas fechas e
          inscripciones.
        </p>
        <div className="pt-2">
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.academiaAviso)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Consultar próximas formaciones por WhatsApp (abre en nueva pestaña)"
          >
            Avísenme de las próximas formaciones
          </a>
        </div>
      </div>
    </div>
  );
}
