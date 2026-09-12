import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Compass, Flame, Feather, HeartHandshake } from "lucide-react";
import DailyCard from "@/components/DailyCard";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="space-y-24 md:space-y-36 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-24 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Emblema Mandala del Logo */}
        <div className="relative mb-6 group">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-primary/40 shadow-mystic-glow group-hover:scale-105 group-hover:border-primary transition-all duration-500">
            <Image
              src="/images/logo.jpg"
              alt="Caroline Magic Mandala"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -inset-2 rounded-full border border-dashed border-primary/30 animate-spin-slow pointer-events-none -z-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest uppercase mb-4 font-semibold animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Magia que se aprende. Magia que se vive.</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-on-surface max-w-4xl leading-[1.2] mb-6">
          El Arte de Revelar <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-rose to-primary">
            lo Invisible
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-on-surface/85 max-w-2xl font-light leading-relaxed mb-10">
          Arte, Tarot, consciencia, energía, trabajo sistémico y rituales. Acompañamos procesos reales de transformación para que recuerdes tu propia capacidad de percibir, elegir, crear y transformar tu realidad.
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
              className="rounded-card glass-panel p-6 border border-accent-rose/10 hover:border-primary/40 hover:shadow-mystic-glow transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <h4 className="text-[11px] uppercase tracking-wider text-accent-rose font-medium mb-3">
                  {pillar.subtitle}
                </h4>
                <p className="text-xs text-on-surface/80 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
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

      {/* 5. MANIFIESTO: MÁS QUE UNA MARCA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-rose/20 bg-surface-container text-accent-rose text-xs tracking-widest uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Filosofía Viva</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-on-surface">
          Más que una marca
        </h2>
        <p className="font-serif text-lg sm:text-2xl text-accent-rose max-w-2xl mx-auto leading-relaxed italic">
          &ldquo;Para nosotros, magia no significa escapar de la realidad. Significa aprender a relacionarnos con ella de otra manera.&rdquo;
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest text-on-surface/90 pt-2 font-medium">
          <span className="px-3.5 py-1 rounded-full bg-surface-low border border-accent-rose/15">Se practica</span>
          <span className="text-primary">✦</span>
          <span className="px-3.5 py-1 rounded-full bg-surface-low border border-accent-rose/15">Se experimenta</span>
          <span className="text-primary">✦</span>
          <span className="px-3.5 py-1 rounded-full bg-surface-low border border-accent-rose/15">Se encarna</span>
          <span className="text-primary">✦</span>
          <span className="px-3.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/40 shadow-mystic-glow">Se vive</span>
        </div>
      </section>

      {/* 6. SESIONES DESTACADAS */}
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
