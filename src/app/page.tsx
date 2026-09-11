import Link from "next/link";
import { Sparkles, ArrowRight, Compass, Flame, Feather, HeartHandshake } from "lucide-react";
import DailyCard from "@/components/DailyCard";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 md:pt-28 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest uppercase mb-6 font-semibold animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Portal de Transformación & Sabiduría Arquetípica</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-on-surface max-w-4xl leading-[1.15] mb-6">
          El Arte de Revelar <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-rose to-primary">
            lo Invisible
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-on-surface/80 max-w-2xl font-light leading-relaxed mb-10">
          Despierta tu soberanía espiritual. Fusionamos el rigor del tarot evolutivo con la potencia alquímica del arte canalizado para brindarte claridad absoluta.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/lecturas"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-primary text-background hover:bg-primary-container hover:text-white transition-all shadow-mystic-glow hover:scale-105 active:scale-95 text-center"
          >
            Ver Lecturas Disponibles
          </Link>
          <Link
            href="/galeria-tienda"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold border border-accent-rose/30 text-on-surface hover:border-primary hover:text-primary transition-all text-center glass-panel"
          >
            Explorar Galería de Arte
          </Link>
        </div>
      </section>

      {/* 2. SINCRONÍA DIARIA (WIDGET DE CARTA VOLTEABLE + FASE LUNAR) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Sincronicidad Cuántica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
            Tu Oráculo de Hoy
          </h2>
          <p className="text-sm text-on-surface/70">
            Conéctate con la frecuencia de este ciclo cósmico e interactúa con el mazo sagrado de Caroline.
          </p>
        </div>
        <DailyCard />
      </section>

      {/* 3. LOS 4 PILARES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-accent-rose font-semibold">
            El Método Caroline Magic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
            Los 4 Pilares de la Consciencia
          </h2>
          <p className="text-sm text-on-surface/70">
            Un marco holístico que no busca adivinar tu futuro, sino entregarte el poder soberano de crearlo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
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
          ].map((pillar, index) => (
            <div
              key={index}
              className="rounded-card glass-panel p-6 border border-accent-rose/10 hover:border-primary/40 hover:shadow-mystic-glow transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-on-surface/75 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LAS DOS VERTIENTES (ORÁCULO VS ATELIER DE ARTE) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-modal border border-accent-rose/20 bg-surface-container/60 backdrop-blur-xl p-8 md:p-14 overflow-hidden relative">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Dualidad Sagrada
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
              Dos Expresiones, Un Solo Propósito
            </h2>
            <p className="text-sm text-on-surface/80">
              Caroline habita la confluencia entre la lectura del mapa cósmico y la manifestación tangible del arte místico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertiente 1 */}
            <div className="rounded-card bg-surface/90 border border-accent-rose/15 p-8 flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="space-y-4 mb-6">
                <div className="text-xs uppercase tracking-widest text-primary font-bold">
                  Dimensión Introspectiva
                </div>
                <h3 className="font-serif text-2xl font-bold text-on-surface">
                  El Oráculo de la Consciencia
                </h3>
                <p className="text-sm text-on-surface/80 leading-relaxed">
                  Lecturas terapéuticas y no predictivas. Cada sesión con Caroline es un santuario de revelación donde se analiza la matriz psicológica de los arcanos mayores y menores.
                </p>
                <ul className="text-xs text-accent-rose space-y-1.5 pt-2">
                  <li>✦ Sesiones privadas sincrónicas por videollamada HD</li>
                  <li>✦ Grabación de por vida y cartografía en PDF</li>
                  <li>✦ Integración somática y arquetípica</li>
                </ul>
              </div>
              <Link
                href="/lecturas"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-container transition-colors"
              >
                <span>Explorar sesiones disponibles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Vertiente 2 */}
            <div className="rounded-card bg-surface/90 border border-accent-rose/15 p-8 flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="space-y-4 mb-6">
                <div className="text-xs uppercase tracking-widest text-accent-rose font-bold">
                  Dimensión Plástica & Alquímica
                </div>
                <h3 className="font-serif text-2xl font-bold text-on-surface">
                  El Taller de Arte Místico
                </h3>
                <p className="text-sm text-on-surface/80 leading-relaxed">
                  Obras pictóricas originales, barajas ilustradas a mano y talismanes consagrados. Arte concebido como tecnología viva para elevar la vibración de tu hogar o altar.
                </p>
                <ul className="text-xs text-accent-rose space-y-1.5 pt-2">
                  <li>✦ Mazos de autor limitados y numerados</li>
                  <li>✦ Cuadros impregnados con minerales y pan de oro</li>
                  <li>✦ Envíos internacionales con embalaje ritual</li>
                </ul>
              </div>
              <Link
                href="/galeria-tienda"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-primary hover:text-primary-container transition-colors"
              >
                <span>Ver catálogo del atelier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SESIONES DESTACADAS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Apertura de Portales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface mt-1">
              Lecturas más Solicitadas
            </h2>
          </div>
          <Link
            href="/lecturas"
            className="text-xs uppercase tracking-widest font-bold text-accent-rose hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <span>Ver Todas las Lecturas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="rounded-modal glass-panel p-10 md:p-16 border-2 border-primary/30 relative overflow-hidden shadow-mystic-glow">
          <div className="relative z-10 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
              ¿Listo para mirar dentro del espejo sagrado?
            </h2>
            <p className="text-sm sm:text-base text-on-surface/80 max-w-xl mx-auto font-light leading-relaxed">
              Los momentos de incertidumbre son los umbrales de tu mayor metamorfosis. Reserva tu espacio y descubre lo que tu alma ya tiene listo para manifestar.
            </p>
            <div className="pt-2">
              <Link
                href="/lecturas"
                className="inline-block px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-primary text-background hover:bg-primary-container hover:text-white transition-all shadow-mystic-glow hover:scale-105"
              >
                Agendar Mi Lectura Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
