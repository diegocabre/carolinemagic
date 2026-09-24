import SesionesGrid from "@/components/SesionesGrid";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { rituales } from "@/data/sesiones";
import { FileText, Flame, Sparkles, Video } from "lucide-react";

const RECIBES = [
  "Ritual realizado especialmente para ti",
  "Video del proceso",
  "Informe de lectura del ritual",
  "Recomendaciones posteriores",
  "Audios de regalo cuando corresponda",
];

export default function RitualesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <Flame className="w-3.5 h-3.5" />
          <span>Rituales</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          ¿Qué quieres transformar?
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Rituales personalizados creados para acompañar procesos de cambio,
          cierre, apertura e intención. Cada trabajo se prepara de manera
          individual, integrando elementos rituales, velas, simbolismo,
          canalización y herramientas energéticas del universo Caroline Magic.
        </p>
      </div>

      {/* Sellos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Diseño a Medida
            </strong>
            <span className="text-text-secondary">
              Cada ritual se prepara para ti
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Video className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Video del Proceso
            </strong>
            <span className="text-text-secondary">
              Para que veas tu ritual realizado
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Informe de Lectura
            </strong>
            <span className="text-text-secondary">
              Con recomendaciones posteriores
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Rituales */}
      <div className="pt-4">
        <SesionesGrid sesiones={rituales} tipo="ritual" />
      </div>

      {/* Qué recibes + ritual personalizado */}
      <div className="max-w-2xl mx-auto text-center rounded-3xl bg-gradient-to-br from-white/95 to-primary-soft/40 border border-border-subtle p-10 sm:p-14 shadow-sm space-y-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
          ¿Qué recibes?
        </h2>
        <ul className="flex flex-wrap justify-center gap-2">
          {RECIBES.map((item) => (
            <li
              key={item}
              className="bg-white/90 text-secondary border border-secondary/15 px-3.5 py-1.5 rounded-full text-xs font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          ¿No sabes qué ritual elegir? Cuéntanos qué estás viviendo y qué
          quieres transformar, y diseñamos uno para tu proceso.
        </p>
        <div className="pt-1">
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.ritualPersonalizado)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Diseñar un ritual personalizado por WhatsApp (abre en nueva pestaña)"
          >
            Diseñar mi ritual
          </a>
        </div>
      </div>
    </div>
  );
}
