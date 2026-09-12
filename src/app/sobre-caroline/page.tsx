import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Compass,
  Feather,
  HeartHandshake,
  Flame,
  CheckCircle2,
  ArrowRight,
  Heart,
  Eye,
  Zap,
  Palette,
  Activity,
  History,
  MousePointerClick,
} from "lucide-react";

export default function SobreCarolinePage() {
  const pilares = [
    {
      title: "Claridad",
      subtitle: "Ver lo que antes no podías ver",
      icon: Compass,
      desc: "Desarrollar percepción, intuición y consciencia para comprender dónde estás y hacia dónde quieres ir.",
      badge: "Percepción & Consciencia",
    },
    {
      title: "Origen",
      subtitle: "Volver a las raíces",
      icon: Feather,
      desc: "Observar el sistema familiar, los patrones heredados y las historias que siguen actuando silenciosamente en nuestra vida.",
      badge: "Mirada Sistémica",
    },
    {
      title: "Medicina",
      subtitle: "Reconocer tus propios dones",
      icon: HeartHandshake,
      desc: "Integrar las herramientas, dones y recursos que acompañan nuestros procesos de transformación, conexión y equilibrio.",
      badge: "Integración Holística",
    },
    {
      title: "Expansión",
      subtitle: "Elegir y manifestar en libertad",
      icon: Flame,
      desc: "Dejar de vivir únicamente desde lo aprendido para comenzar a elegir, crear, manifestar y construir una vida más alineada con quien eres hoy.",
      badge: "Creación Soberana",
    },
  ];

  const dimensionesMagia = [
    { label: "Es consciencia", icon: Eye },
    { label: "Es intuición", icon: Sparkles },
    { label: "Es energía", icon: Zap },
    { label: "Es arte", icon: Palette },
    { label: "Es cuerpo", icon: Activity },
    { label: "Es historia", icon: History },
    { label: "Es elección", icon: MousePointerClick },
    { label: "Es creación", icon: Flame },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-28">
      {/* 1. HERO & MANIFIESTO */}
      <section className="text-center space-y-6 flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40 shadow-mystic-glow mb-2">
          <Image
            src="/images/logo.jpg"
            alt="Caroline Magic"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Caroline Magic</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-on-surface leading-tight max-w-4xl">
          Magia que se aprende. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-rose to-primary">
            Magia que se vive.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-on-surface/80 max-w-2xl mx-auto font-light leading-relaxed">
          Un espacio donde el arte, la consciencia, el Tarot y el desarrollo personal convergen para que recuerdes tu propio poder de transformar tu realidad.
        </p>
      </section>

      {/* 2. NUESTRA HISTORIA */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            El Recorrido
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
            Nuestra Historia
          </h2>
        </div>

        <div className="rounded-modal glass-card p-8 sm:p-12 border border-accent-rose/15 space-y-8 relative overflow-hidden">
          <div className="space-y-5 text-sm sm:text-base text-on-surface/85 leading-relaxed font-light">
            <p className="text-base sm:text-lg text-on-surface font-normal">
              Caroline Magic nació de una transformación personal que, con el tiempo, se convirtió en un propósito.
            </p>
            <p>
              Nació oficialmente en <strong>2023</strong>, pero su historia comenzó mucho antes: en mi recorrido como artista, docente, facilitadora y buscadora de diferentes caminos de consciencia, espiritualidad y desarrollo personal.
            </p>
            <p>
              Durante años exploré el arte, el movimiento, el Tarot, la canalización, las Constelaciones Familiares, los Registros Akáshicos, Access Consciousness® y diferentes herramientas energéticas y holísticas.
            </p>
          </div>

          {/* Cita Destacada de Revelación */}
          <div className="rounded-card bg-surface-container/90 border-l-4 border-primary p-6 sm:p-8 my-6 space-y-2 shadow-mystic-glow">
            <span className="text-xs uppercase tracking-widest text-accent-rose font-semibold block">
              El Punto de Inflexión
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-on-surface leading-snug">
              &ldquo;Hasta que comprendí algo fundamental: no necesitaba elegir una sola herramienta. Mi verdadera medicina estaba en integrarlas.&rdquo;
            </p>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-on-surface/85 leading-relaxed font-light">
            <p>
              Así comenzó a tomar forma <strong>Caroline Magic</strong>: primero como un espacio profundamente ligado al arte y la espiritualidad y, con el tiempo, como un método y una marca con identidad propia.
            </p>
            <p>
              Hoy Caroline Magic reúne arte, Tarot, consciencia, energía, trabajo sistémico, rituales y desarrollo personal para acompañar procesos reales de transformación.
            </p>
          </div>

          {/* Declaración de Propósito Soberano */}
          <div className="rounded-card bg-surface-low border border-accent-rose/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-bold text-on-surface">
                Soberanía & No Dependencia
              </h4>
              <p className="text-xs sm:text-sm text-on-surface/80 leading-relaxed">
                No buscamos que las personas dependan eternamente de una sesión, una lectura o una respuesta externa. Buscamos algo mucho más grande: <strong>que recuerden su propia capacidad de percibir, elegir, crear y transformar su realidad.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUESTRA MISIÓN */}
      <section className="rounded-modal glass-panel p-8 sm:p-12 border border-primary/30 relative text-center space-y-6 shadow-mystic-glow">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">
          Propósito en Acción
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
          Nuestra Misión
        </h2>
        <p className="font-serif text-xl sm:text-2xl text-accent-rose max-w-3xl mx-auto leading-relaxed">
          &ldquo;La misión de Caroline Magic es hacer de la espiritualidad una experiencia consciente, práctica y transformadora.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-on-surface/80 max-w-2xl mx-auto leading-relaxed font-light">
          Creamos espacios, experiencias, formaciones, sesiones, rituales, arte y herramientas que acompañan a cada persona a mirar su historia, comprender su presente y abrir nuevas posibilidades.
        </p>
      </section>

      {/* 4. LOS CUATRO PILARES */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-accent-rose font-semibold">
            Fundamentos del Método
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
            Los Cuatro Grandes Pilares
          </h2>
          <p className="text-sm text-on-surface/75">
            Las cuatro columnas sobre las que se sostiene cada experiencia y creación de Caroline Magic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pilares.map((pilar, idx) => (
            <div
              key={idx}
              className="rounded-card glass-card p-8 border border-accent-rose/15 hover:border-primary/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <pilar.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-surface-high text-accent-rose border border-accent-rose/20">
                    {pilar.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {pilar.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-accent-rose font-medium mt-1 mb-3">
                  {pilar.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-on-surface/80 leading-relaxed font-light">
                  {pilar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MÁS QUE UNA MARCA (EL MANIFIESTO) */}
      <section className="rounded-modal bg-surface-container/70 border border-accent-rose/20 p-8 sm:p-14 space-y-10 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Filosofía Viva
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
            Más que una Marca
          </h2>
          <p className="font-serif text-lg sm:text-xl text-on-surface leading-relaxed italic pt-2">
            &ldquo;Caroline Magic es también una forma de entender la magia. Para nosotros, magia no significa escapar de la realidad. Significa aprender a relacionarnos con ella de otra manera.&rdquo;
          </p>
        </div>

        {/* Las Dimensiones de la Magia */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {dimensionesMagia.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl glass-panel border border-accent-rose/10 flex flex-col items-center justify-center text-center gap-2 hover:border-primary/40 hover:shadow-mystic-glow transition-all group"
            >
              <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-serif text-lg text-on-surface group-hover:text-primary transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Cierre del Manifiesto */}
        <div className="text-center max-w-2xl mx-auto space-y-4 pt-6 border-t border-accent-rose/15">
          <p className="text-sm sm:text-base text-on-surface/85 leading-relaxed font-light">
            Por eso aquí la magia no solamente se estudia:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-rose">
            <span className="px-4 py-1.5 rounded-full bg-surface-high border border-accent-rose/20">Se practica</span>
            <span>✦</span>
            <span className="px-4 py-1.5 rounded-full bg-surface-high border border-accent-rose/20">Se experimenta</span>
            <span>✦</span>
            <span className="px-4 py-1.5 rounded-full bg-surface-high border border-accent-rose/20">Se encarna</span>
            <span>✦</span>
            <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/40 shadow-mystic-glow">Se vive</span>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL A SESIONES & ATELIER */}
      <section className="text-center space-y-6 pt-4">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
          Comienza Tu Proceso de Transformación
        </h3>
        <p className="text-sm text-on-surface/80 max-w-lg mx-auto font-light leading-relaxed">
          Ya sea a través de una lectura de tarot evolutivo, una obra de arte canalizada o una formación holística.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/lecturas"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold bg-primary text-background hover:bg-primary-container hover:text-white transition-all shadow-mystic-glow hover:scale-105"
          >
            Explorar Lecturas
          </Link>
          <Link
            href="/galeria-tienda"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold border border-accent-rose/30 text-on-surface hover:border-primary hover:text-primary transition-all glass-panel"
          >
            Ver Galería & Arte
          </Link>
        </div>
      </section>
    </div>
  );
}
