import ServiceCard from "@/components/ServiceCard";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { services } from "@/data/services";
import { Flame, Shield, Sparkles } from "lucide-react";

export default function RitualesPage() {
  const ritos = services.filter((s) => s.category === "Rituales");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <Flame className="w-3.5 h-3.5" />
          <span>Rituales</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Rituales
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Ceremonias diseñadas a medida para honrar transiciones de vida, cerrar
          ciclos y consagrar nuevos comienzos, con la intención y el simbolismo
          que tu proceso necesita.
        </p>
      </div>

      {/* Sellos de confianza */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Diseño a Medida
            </strong>
            <span className="text-text-secondary">Cada ceremonia es única</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Flame className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Elementos Simbólicos
            </strong>
            <span className="text-text-secondary">
              Consagración de objetos personales
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Espacio Confidencial
            </strong>
            <span className="text-text-secondary">
              Acompañamiento antes y después
            </span>
          </div>
        </div>
      </div>

      {/* Grid de servicios o estado vacío */}
      {ritos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {ritos.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="max-w-xl mx-auto text-center rounded-2xl bg-white/95 border border-border-subtle p-10 shadow-xs space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Cada ceremonia se diseña de forma personalizada según tu proceso.
            Escríbenos para conversar sobre lo que necesitas.
          </p>
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.ritualPersonalizado)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Consultar sobre ritos y ceremonias por WhatsApp (abre en nueva pestaña)"
          >
            Diseñar mi ceremonia
          </a>
        </div>
      )}
    </div>
  );
}
