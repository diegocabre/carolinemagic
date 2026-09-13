import ServiceCard from "@/components/ServiceCard";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { services } from "@/data/services";
import { Calendar, Sparkles, Users } from "lucide-react";

export default function TalleresPage() {
  const talleres = services.filter((s) => s.category === "Talleres");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>Portal Talleres</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Talleres Grupales
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Espacios colectivos para aprender, practicar y transformar en
          comunidad. Cupos limitados para mantener la calidad de la experiencia
          y la energía del encuentro.
        </p>
      </div>

      {/* Sellos de confianza / dinámica del taller */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Users className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Grupos Reducidos
            </strong>
            <span className="text-text-secondary">
              Cupos limitados por encuentro
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Encuentros Periódicos
            </strong>
            <span className="text-text-secondary">Presenciales y online</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Práctica Colectiva
            </strong>
            <span className="text-text-secondary">
              Aprendizaje vivencial en comunidad
            </span>
          </div>
        </div>
      </div>

      {/* Grid de talleres o estado vacío */}
      {talleres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {talleres.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="max-w-xl mx-auto text-center rounded-2xl bg-white/95 border border-border-subtle p-10 shadow-xs space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Estamos preparando las próximas fechas de talleres. Escríbenos para
            ser de los primeros en enterarte cuando se abran los cupos.
          </p>

          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Consultar próximos talleres por WhatsApp (abre en nueva pestaña)"
          >
            Avísenme de los próximos talleres
          </a>
        </div>
      )}
    </div>
  );
}
