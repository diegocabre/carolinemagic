import ServiceCard from "@/components/ServiceCard";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { services } from "@/data/services";
import { Award, BookOpen, GraduationCap } from "lucide-react";

export default function AcademiaPage() {
  const programas = services.filter((s) => s.category === "Academia");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academia Caroline Magic</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Formaciones & Cursos
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Programas de formación con niveles y certificación, para quienes
          quieren llevar su práctica más allá de un encuentro puntual.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Award className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Con Certificación
            </strong>
            <span className="text-text-secondary">Al completar cada nivel</span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <BookOpen className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Formación Progresiva
            </strong>
            <span className="text-text-secondary">
              De iniciación a maestría
            </span>
          </div>
        </div>
      </div>

      {programas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programas.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="max-w-xl mx-auto text-center rounded-2xl bg-white/95 border border-border-subtle p-10 shadow-xs space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Estamos preparando nuevas formaciones. Escríbenos para ser de los
            primeros en enterarte.
          </p>
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.academiaAviso)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Consultar próximas formaciones por WhatsApp (abre en nueva pestaña)"
          >
            Avísenme de las próximas formaciones
          </a>
        </div>
      )}
    </div>
  );
}
