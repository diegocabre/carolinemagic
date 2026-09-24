import CarruselMedia, { MediaItem } from "@/components/CarruselMedia";
import SesionesGrid from "@/components/SesionesGrid";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { rituales } from "@/data/sesiones";
import { FileText, Flame, Sparkles, Video } from "lucide-react";

const RECIBES = [
  "Video del ritual",
  "Informe personalizado de lo observado",
  "Recomendaciones posteriores",
  "Audio/mensaje de integración",
];

const GALERIA: MediaItem[] = [
  {
    tipo: "imagen",
    src: "/images/rituales/ritualexp.jpeg",
    alt: "Encuentro Caroline Magic alrededor de una mesa con cartas de Tarot",
  },
  ...[1, 2, 3, 4].map((n) => ({
    tipo: "video" as const,
    src: `/images/rituales/ritual${n}vid.mp4`,
    alt: `Video de ritual ${n}`,
  })),
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

      {/* Cómo trabajamos los rituales */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            ¿Cómo trabajamos los rituales?
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Cada ritual Caroline Magic se crea de manera personalizada según tu
            intención y el proceso que estás atravesando.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Integramos magia ancestral y simbolismo ritual con herramientas de
            Access Consciousness® como proceso de acceso a la consciencia y
            tecnología energética moderna, además de canalización y velomancia,
            observando el comportamiento de las velas como una lectura
            simbólica del proceso.
          </p>
        </div>

        <CarruselMedia items={GALERIA} />
      </section>

      {/* Qué recibes + ritual personalizado */}
      <div className="max-w-2xl mx-auto text-center rounded-3xl bg-gradient-to-br from-white/95 to-primary-soft/40 border border-border-subtle p-10 sm:p-14 shadow-sm space-y-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
          <span aria-hidden="true">✨</span> ¿Qué recibes?
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
        <p className="text-xs text-text-muted">Según el trabajo realizado.</p>
        <p className="font-serif text-lg sm:text-xl text-primary italic">
          Magia ancestral + consciencia + energía + intención.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Un ritual no se realiza en serie: se crea para ti y para aquello que
          deseas transformar.
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
