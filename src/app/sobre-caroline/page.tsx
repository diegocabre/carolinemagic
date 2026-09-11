import Link from "next/link";
import { Award, BookOpen, Heart, Sparkles, Compass, Feather, HeartHandshake, Flame } from "lucide-react";

export default function SobreCarolinePage() {
  const pilares = [
    {
      title: "Claridad",
      icon: Compass,
      desc: "La brújula arquetípica para despejar la niebla mental y tomar decisiones trascendentales con convicción.",
    },
    {
      title: "Origen",
      icon: Feather,
      desc: "Reconexión con tu linaje, memoria del alma y causas iniciales que configuraron tus patrones presentes.",
    },
    {
      title: "Medicina",
      icon: HeartHandshake,
      desc: "Transmutación de heridas arquetípicas y liberación de contratos energéticos que ya cumplieron su propósito.",
    },
    {
      title: "Expansión",
      icon: Flame,
      desc: "Manifestación deliberada, integración del poder personal y alineación de tu propósito a tu realidad material.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
      {/* 1. INTRO BIOGRÁFICA */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Canalizadora & Artista Esotérica</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-on-surface">
          Sobre Caroline
        </h1>
        <p className="text-base sm:text-lg text-on-surface/80 max-w-2xl mx-auto font-light leading-relaxed italic">
          &ldquo;El tarot no es una bola de cristal para adivinar certezas fijas; es un espejo cuántico donde el inconsciente se hace visible para devolverte tu libertad de elección.&rdquo;
        </p>
      </section>

      {/* 2. TRAYECTORIA Y FILOSOFÍA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="rounded-card bg-surface-container p-8 border border-accent-rose/20 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-primary">
            La Fusión de Dos Mundos
          </h3>
          <p className="text-xs text-on-surface/80 leading-relaxed">
            Con más de una década dedicada al estudio de la simbología hermética, la astrología helenística y la psicología analítica de Carl Jung, Caroline formó su atelier con la visión de dignificar las artes esotéricas bajo una mirada artística contemporánea y ética intachable.
          </p>
          <p className="text-xs text-on-surface/80 leading-relaxed">
            Cada una de sus obras plásticas es creada bajo meditaciones canalizadas y tránsitos planetarios específicos, convirtiendo cada lienzo y cada baraja en un condensador de intención luminosa.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: Award,
              title: "Ética Impecable",
              text: "Sin juicios ni fatalismos. Cada consulta es confidencial, amorosa y profundamente empoderadora.",
            },
            {
              icon: BookOpen,
              title: "Raíz Simbólica Profunda",
              text: "Dominio exhaustivo del Tarot de Marsella, Rider-Waite-Smith y oráculos de creación propia.",
            },
            {
              icon: Heart,
              title: "Acompañamiento Amoroso",
              text: "Espacio sagrado para honrar tus procesos de quiebre, integración y florecimiento personal.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-5 rounded-card glass-panel border border-accent-rose/10">
              <div className="text-primary mt-1 shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-on-surface">{item.title}</h4>
                <p className="text-xs text-on-surface/70 mt-1 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LOS 4 PILARES EN DETALLE */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-accent-rose font-semibold">
            Fundamentos del Templo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
            Los 4 Pilares de la Consciencia
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pilares.map((pilar, idx) => (
            <div key={idx} className="rounded-card glass-card p-6 border border-accent-rose/15 space-y-3">
              <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center text-primary">
                <pilar.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface">{pilar.title}</h3>
              <p className="text-xs text-on-surface/75 leading-relaxed">{pilar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ATELIER PRIVÉ */}
      <section id="atelier" className="rounded-modal glass-card p-10 md:p-14 border border-primary/30 text-center space-y-6 shadow-mystic-glow">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">
          Inmersión Exclusiva
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
          El Atelier Privé
        </h2>
        <p className="text-xs sm:text-sm text-on-surface/80 max-w-xl mx-auto leading-relaxed">
          Programa intensivo de mentoría 1 a 1 de 3 meses para líderes, terapeutas y creadores que desean integrar la lectura de oráculos y la manifestación estética a su propia vocación. Cupos estrictamente limitados por ciclo lunar.
        </p>
        <Link
          href="/lecturas#atelier-prive"
          className="inline-block px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold bg-primary text-background shadow-mystic-glow hover:scale-105 hover:bg-primary-container hover:text-white transition-all"
        >
          Solicitar Entrevista de Admisión
        </Link>
      </section>
    </div>
  );
}
