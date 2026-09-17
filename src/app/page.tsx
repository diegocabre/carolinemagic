import DailyCard from "@/components/DailyCard";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { getDailyCard } from "@/lib/dailyCard";
import { getFaseLunarActual } from "@/lib/moonPhase";
import {
  ArrowRight,
  Compass,
  Feather,
  Flame,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// La sincronicidad del día se administra desde /admin y debe reflejarse
// de inmediato: esta página no puede quedar prerenderizada como estática.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dailyCard = await getDailyCard();
  const faseLunar = getFaseLunarActual();

  return (
    <div className="space-y-24 md:space-y-36 pb-20 bg-mystic-glow">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 md:pt-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna de texto */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-medium uppercase tracking-widest border border-border-accent mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Magia que se aprende. Magia que se vive.</span>
            </div>

            <h1 className="font-serif text-text-primary text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.12] mb-6">
              El Arte de Revelar <br className="hidden sm:inline" />
              <span className="italic text-primary">lo Invisible</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg lg:text-base xl:text-lg max-w-xl leading-relaxed font-normal mb-10">
              Arte, Tarot, consciencia, energía, trabajo sistémico y rituales.
              Acompañamos procesos reales de transformación para que recuerdes
              tu propia capacidad de percibir, elegir, crear y transformar tu
              realidad.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/sesiones"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all text-center hover:scale-105 active:scale-95"
              >
                Ver Lecturas Disponibles
              </Link>
              <Link
                href="/galeria-tienda"
                className="w-full sm:w-auto bg-white/90 hover:bg-white text-secondary border border-secondary/20 px-8 py-3.5 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all text-center"
              >
                Explorar Galería de Arte
              </Link>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative order-last">
            <div className="absolute -inset-4 bg-primary-soft/60 rounded-[2.5rem] blur-2xl -z-10" />

            <div className="relative aspect-4/5 max-h-120 lg:max-h-none mx-auto max-w-sm lg:max-w-none rounded-3xl overflow-hidden border border-border-accent shadow-xl">
              <Image
                src="/images/hero-caroline.jpeg"
                alt="Caroline Magic con cartas de tarot y cristal, ambiente místico"
                fill
                priority
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SINCRONÍA DIARIA (WIDGET DE CARTA VOLTEABLE + FASE LUNAR) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Sincronicidad Cuántica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Tu Oráculo de Hoy
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Conéctate con la frecuencia de este ciclo cósmico e interactúa con
            el mazo sagrado de Caroline.
          </p>
        </div>
        <DailyCard dailyCard={dailyCard} faseLunar={faseLunar} />
      </section>

      {/* 3. LOS 4 PILARES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            El Método Caroline Magic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Los 4 Pilares de la Consciencia
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Un marco holístico que no busca adivinar tu futuro, sino entregarte
            el poder soberano de crearlo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Claridad",
              subtitle: "Ver lo que antes no podías ver",
              icon: Compass,
              desc: "Desarrollar percepción, intuición y consciencia para comprender dónde estás y hacia dónde quieres ir.",
            },
            {
              title: "Origen",
              subtitle: "Volver a las raíces",
              icon: Feather,
              desc: "Observar el sistema familiar, los patrones heredados y las historias que siguen actuando silenciosamente en nuestra vida.",
            },
            {
              title: "Medicina",
              subtitle: "Reconocer tus dones y recursos",
              icon: HeartHandshake,
              desc: "Integrar las herramientas, dones y recursos que acompañan nuestros procesos de transformación, conexión y equilibrio.",
            },
            {
              title: "Expansión",
              subtitle: "Elegir y manifestar",
              icon: Flame,
              desc: "Dejar de vivir únicamente desde lo aprendido para comenzar a elegir, crear, manifestar y construir una vida más alineada con quien eres hoy.",
            },
          ].map((pillar, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/90 backdrop-blur-sm p-7 border border-border-subtle shadow-sm hover:shadow-xl hover:border-primary/35 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <h4 className="text-[11px] uppercase tracking-wider text-secondary-accent font-medium mb-3">
                  {pillar.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MANIFIESTO: MÁS QUE UNA MARCA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs tracking-widest uppercase font-medium border border-border-accent shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Filosofía Viva</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
          Más que una marca
        </h2>
        <p className="font-serif text-xl sm:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed italic font-normal">
          &ldquo;Para nosotros, magia no significa escapar de la realidad.
          Significa aprender a relacionarnos con ella de otra manera.&rdquo;
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-wider text-text-primary pt-2 font-semibold">
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
          <span className="px-4 py-1.5 rounded-full bg-primary-soft text-primary border border-primary/35 shadow-xs font-bold">
            Se vive
          </span>
        </div>
      </section>

      {/* 5. CALL TO ACTION FINAL */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-surface-glow to-primary-soft p-10 md:p-16 border border-primary/30 relative overflow-hidden shadow-sm">
          <div className="relative z-10 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
              ¿Listo para mirar dentro del espejo sagrado?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto font-normal leading-relaxed">
              Los momentos de incertidumbre son los umbrales de tu mayor
              metamorfosis. Reserva tu espacio y descubre lo que tu alma ya
              tiene listo para manifestar.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGES.booking)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <span>Agendar Mi Lectura Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/sesiones"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-surface-muted text-secondary border border-secondary/20 px-8 py-4 rounded-full text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
              >
                Explorar Más Sesiones
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
