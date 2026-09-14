import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import {
  Activity,
  ArrowUpRight,
  Compass,
  Eye,
  Feather,
  Flame,
  Heart,
  HeartHandshake,
  History,
  MousePointerClick,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-24 bg-mystic-glow">
      {/* 1. HERO & MANIFIESTO (Sin logo repetido: comienza directo con el badge y H1) */}
      <section className="text-center space-y-6 flex flex-col items-center pt-8 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-medium uppercase tracking-widest border border-border-accent shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Magia que se aprende. Magia que se vive.</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight max-w-4xl tracking-tight">
          Sobre Caroline Magic
        </h1>

        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-normal">
          Un espacio donde el arte, la consciencia, el Tarot y el desarrollo
          personal convergen para que recuerdes tu propio poder de transformar
          tu realidad.
        </p>
      </section>

      {/* 2. NUESTRA HISTORIA */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            El Recorrido
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Nuestra Historia
          </h2>
        </div>

        <div className="rounded-3xl bg-white/95 p-8 sm:p-12 border border-border-subtle space-y-8 relative overflow-hidden shadow-sm">
          <div className="space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p className="text-base sm:text-lg text-text-primary font-medium">
              Caroline Magic nació de una transformación personal que, con el
              tiempo, se convirtió en un propósito.
            </p>
            <p>
              Nació oficialmente en{" "}
              <strong className="text-text-primary">2023</strong>, pero su
              historia comenzó mucho antes: en mi recorrido como artista,
              docente, facilitadora y buscadora de diferentes caminos de
              consciencia, espiritualidad y desarrollo personal.
            </p>
            <p>
              Durante años exploré el arte, el movimiento, el Tarot, la
              canalización, las Constelaciones Familiares, los Registros
              Akáshicos, Access Consciousness® y diferentes herramientas
              energéticas y holísticas.
            </p>
          </div>

          {/* Cita Destacada de Revelación */}
          <div className="rounded-2xl bg-primary-soft/60 border-l-4 border-primary p-6 sm:p-8 my-6 space-y-2 shadow-xs">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block">
              El Punto de Inflexión
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-text-primary font-bold leading-snug italic">
              &ldquo;Hasta que comprendí algo fundamental: no necesitaba elegir
              una sola herramienta. Mi verdadera medicina estaba en
              integrarlas.&rdquo;
            </p>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p>
              Así comenzó a tomar forma{" "}
              <strong className="text-text-primary">Caroline Magic</strong>:
              primero como un espacio profundamente ligado al arte y la
              espiritualidad y, con el tiempo, como un método y una marca con
              identidad propia.
            </p>
            <p>
              Hoy Caroline Magic reúne arte, Tarot, consciencia, energía,
              trabajo sistémico, rituales y desarrollo personal para acompañar
              procesos reales de transformación.
            </p>
          </div>

          {/* Declaración de Propósito Soberano */}
          <div className="rounded-2xl bg-white/95 border border-border-subtle p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-primary-soft border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-text-primary">
                Soberanía & No Dependencia
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                No buscamos que las personas dependan eternamente de una sesión,
                una lectura o una respuesta externa. Buscamos algo mucho más
                grande:{" "}
                <strong className="text-text-primary">
                  que recuerden su propia capacidad de percibir, elegir, crear y
                  transformar su realidad.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUESTRA MISIÓN */}
      <section className="rounded-3xl bg-gradient-to-br from-surface-glow to-primary-soft p-8 sm:p-12 border border-primary/20 text-center space-y-6 shadow-sm">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">
          Propósito en Acción
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
          Nuestra Misión
        </h2>
        <p className="font-serif text-2xl sm:text-3xl text-secondary max-w-3xl mx-auto leading-relaxed font-medium italic">
          &ldquo;La misión de Caroline Magic es hacer de la espiritualidad una
          experiencia consciente, práctica y transformadora.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-normal">
          Creamos espacios, experiencias, formaciones, sesiones, rituales, arte
          y herramientas que acompañan a cada persona a mirar su historia,
          comprender su presente y abrir nuevas posibilidades.
        </p>
      </section>

      {/* 4. LOS CUATRO PILARES */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Fundamentos del Método
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
            Los Cuatro Grandes Pilares
          </h2>
          <p className="text-sm text-text-secondary">
            Las cuatro columnas sobre las que se sostiene cada experiencia y
            creación de Caroline Magic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pilares.map((pilar, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/95 p-8 border border-border-subtle hover:border-primary/35 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <pilar.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-surface-muted text-secondary border border-secondary/15 font-medium">
                    {pilar.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {pilar.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-secondary-accent font-semibold mt-1 mb-3">
                  {pilar.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {pilar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MÁS QUE UNA MARCA (EL MANIFIESTO) */}
      <section className="rounded-3xl bg-surface-muted/80 border border-border-subtle p-8 sm:p-14 space-y-10 relative overflow-hidden shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Filosofía Viva
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
            Más que una Marca
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-secondary leading-relaxed italic pt-2 font-normal">
            &ldquo;Caroline Magic es también una forma de entender la magia.
            Para nosotros, magia no significa escapar de la realidad. Significa
            aprender a relacionarnos con ella de otra manera.&rdquo;
          </p>
        </div>

        {/* Las Dimensiones de la Magia */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {dimensionesMagia.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/95 border border-border-subtle flex flex-col items-center justify-center text-center gap-2.5 hover:border-primary/35 hover:shadow-md transition-all group"
            >
              <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-serif text-xl text-text-primary group-hover:text-primary transition-colors font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Cierre del Manifiesto */}
        <div className="text-center max-w-2xl mx-auto space-y-4 pt-6 border-t border-border-subtle">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Por eso aquí la magia no solamente se estudia:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-primary">
            <span className="px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-xs">
              Se practica
            </span>
            <span className="text-primary">✦</span>
            <span className="px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-xs">
              Se experimenta
            </span>
            <span className="text-primary">✦</span>
            <span className="px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-xs">
              Se encarna
            </span>
            <span className="text-primary">✦</span>
            <span className="px-4 py-1.5 rounded-full bg-primary-soft text-primary border border-primary/35 font-bold shadow-xs">
              Se vive
            </span>
          </div>
        </div>
      </section>

      {/* 6. ATELIER PRIVÉ & ATENCIÓN DIRECTA */}
      <section
        id="atelier"
        className="rounded-3xl bg-gradient-to-br from-white/95 to-primary-soft/40 border border-border-subtle p-8 sm:p-14 shadow-sm relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Privé & Mentoría</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Atención Directa con Caroline
          </h3>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto font-normal">
            Para procesos de transformación personalizados, mentorías
            arquetípicas profundas o encargos artísticos consagrados. Comunícate
            de forma confidencial y directa.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(WHATSAPP_MESSAGES.carolineDirect)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              aria-label="Solicitar atención directa con Caroline por WhatsApp (abre en nueva pestaña)"
            >
              <span>Atención Directa con Caroline</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/sesiones"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-surface-muted text-secondary border border-secondary/20 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
            >
              Ver Todas las Lecturas
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL DE EXPLORACIÓN */}
      <section className="text-center space-y-6 pt-4">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          Comienza Tu Proceso de Transformación
        </h3>
        <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
          Ya sea a través de una lectura de tarot evolutivo, una obra de arte
          canalizada o una formación holística.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/sesiones"
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Explorar Lecturas
          </Link>
          <Link
            href="/galeria-tienda"
            className="w-full sm:w-auto bg-white hover:bg-surface-muted text-secondary border border-secondary/20 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
          >
            Ver Galería & Arte
          </Link>
        </div>
      </section>
    </div>
  );
}
