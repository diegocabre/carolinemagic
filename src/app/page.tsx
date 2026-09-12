import Link from "next/link";
import { Sparkles, ArrowRight, Compass, Flame, Feather, HeartHandshake } from "lucide-react";
import DailyCard from "@/components/DailyCard";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="space-y-24 md:space-y-36 pb-20 bg-[radial-gradient(circle_at_top,_rgba(242,96,145,0.08),transparent_50%)]">
      {/* 1. HERO SECTION (Sin logo redundante; foco directo en el mensaje y CTA) */}
      <section className="relative pt-12 sm:pt-20 md:pt-28 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Badge superior de contexto */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8E6EE] text-[#9A2E65] text-xs font-medium uppercase tracking-widest border border-[#9A2E65]/20 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Magia que se aprende. Magia que se vive.</span>
        </div>

        {/* H1 en Playfair Display con acento berry */}
        <h1 className="font-serif text-[#281D33] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.12] mb-6">
          El Arte de Revelar <br className="hidden sm:inline" />
          <span className="italic text-[#9A2E65]">lo Invisible</span>
        </h1>

        {/* Subtítulo lavanda oscuro */}
        <p className="text-[#685876] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal mb-10">
          Arte, Tarot, consciencia, energía, trabajo sistémico y rituales. Acompañamos procesos reales de transformación para que recuerdes tu propia capacidad de percibir, elegir, crear y transformar tu realidad.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/lecturas"
            className="w-full sm:w-auto bg-[#9A2E65] hover:bg-[#7D2251] text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all text-center hover:scale-105 active:scale-95"
          >
            Ver Lecturas Disponibles
          </Link>
          <Link
            href="/galeria-tienda"
            className="w-full sm:w-auto bg-white/90 hover:bg-white text-[#523B68] border border-[#523B68]/20 px-8 py-3.5 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all text-center"
          >
            Explorar Galería de Arte
          </Link>
        </div>
      </section>

      {/* 2. SINCRONÍA DIARIA (WIDGET DE CARTA VOLTEABLE + FASE LUNAR) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#9A2E65] font-semibold">
            Sincronicidad Cuántica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281D33]">
            Tu Oráculo de Hoy
          </h2>
          <p className="text-sm sm:text-base text-[#685876]">
            Conéctate con la frecuencia de este ciclo cósmico e interactúa con el mazo sagrado de Caroline.
          </p>
        </div>
        <DailyCard />
      </section>

      {/* 3. LOS 4 PILARES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#9A2E65] font-semibold">
            El Método Caroline Magic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281D33]">
            Los 4 Pilares de la Consciencia
          </h2>
          <p className="text-sm sm:text-base text-[#685876]">
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
              className="rounded-2xl bg-white/90 backdrop-blur-sm p-7 border border-[rgba(98,67,127,0.1)] shadow-sm hover:shadow-xl hover:border-[#9A2E65]/35 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F5EFF7] flex items-center justify-center mb-4 text-[#9A2E65] group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#281D33] mb-1 group-hover:text-[#9A2E65] transition-colors">
                  {pillar.title}
                </h3>
                <h4 className="text-[11px] uppercase tracking-wider text-[#8B6F9E] font-medium mb-3">
                  {pillar.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#685876] leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LAS DOS VERTIENTES (ORÁCULO VS ATELIER DE ARTE) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl border border-[rgba(98,67,127,0.12)] bg-[#F5EFF7]/70 backdrop-blur-xl p-8 md:p-14 overflow-hidden relative shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#9A2E65] font-semibold">
              Dualidad Sagrada
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281D33]">
              Dos Expresiones, Un Solo Propósito
            </h2>
            <p className="text-sm sm:text-base text-[#685876]">
              Caroline habita la confluencia entre la lectura del mapa cósmico y la manifestación tangible del arte místico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertiente 1 */}
            <div className="rounded-2xl bg-white/95 border border-[rgba(98,67,127,0.1)] p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9A2E65]/30 transition-all">
              <div className="space-y-4 mb-6">
                <div className="text-xs uppercase tracking-wider text-[#9A2E65] font-bold">
                  Dimensión Introspectiva
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#281D33]">
                  El Oráculo de la Consciencia
                </h3>
                <p className="text-sm text-[#685876] leading-relaxed">
                  Lecturas terapéuticas y no predictivas. Cada sesión con Caroline es un santuario de revelación donde se analiza la matriz psicológica de los arcanos mayores y menores.
                </p>
                <ul className="text-xs text-[#281D33] space-y-2 pt-2 font-medium">
                  <li className="flex items-center gap-2"><span className="text-[#9A2E65]">✦</span> Sesiones privadas sincrónicas por videollamada HD</li>
                  <li className="flex items-center gap-2"><span className="text-[#9A2E65]">✦</span> Grabación de por vida y cartografía en PDF</li>
                  <li className="flex items-center gap-2"><span className="text-[#9A2E65]">✦</span> Integración somática y arquetípica</li>
                </ul>
              </div>
              <Link
                href="/lecturas"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#9A2E65] hover:text-[#7D2251] transition-colors"
              >
                <span>Explorar sesiones disponibles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Vertiente 2 */}
            <div className="rounded-2xl bg-white/95 border border-[rgba(98,67,127,0.1)] p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9A2E65]/30 transition-all">
              <div className="space-y-4 mb-6">
                <div className="text-xs uppercase tracking-wider text-[#9A2E65] font-bold">
                  Dimensión Plástica & Alquímica
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#281D33]">
                  El Taller de Arte Místico
                </h3>
                <p className="text-sm text-[#685876] leading-relaxed">
                  Obras pictóricas originales, barajas ilustradas a mano y talismanes consagrados. Arte concebido como tecnología viva para elevar la vibración de tu hogar o altar.
                </p>
                <ul className="text-xs text-[#281D33] space-y-2 pt-2 font-medium">
                  <li className="flex items-center gap-2"><span className="text-[#9A2E65]">✦</span> Mazos de autor limitados y numerados</li>
                  <li className="flex items-center gap-2"><span className="text-[#9A2E65]">✦</span> Cuadros impregnados con minerales y pan de oro</li>
                  <li className="flex items-center gap-2"><span className="text-[#9A2E65]">✦</span> Envíos internacionales con embalaje ritual</li>
                </ul>
              </div>
              <Link
                href="/galeria-tienda"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#9A2E65] hover:text-[#7D2251] transition-colors"
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8E6EE] text-[#9A2E65] text-xs tracking-widest uppercase font-medium border border-[#9A2E65]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#9A2E65]" />
          <span>Filosofía Viva</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#281D33]">
          Más que una marca
        </h2>
        <p className="font-serif text-xl sm:text-2xl text-[#523B68] max-w-2xl mx-auto leading-relaxed italic font-normal">
          &ldquo;Para nosotros, magia no significa escapar de la realidad. Significa aprender a relacionarnos con ella de otra manera.&rdquo;
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-wider text-[#281D33] pt-2 font-semibold">
          <span className="px-4 py-1.5 rounded-full bg-white border border-[rgba(98,67,127,0.15)] shadow-xs">Se practica</span>
          <span className="text-[#9A2E65]">✦</span>
          <span className="px-4 py-1.5 rounded-full bg-white border border-[rgba(98,67,127,0.15)] shadow-xs">Se experimenta</span>
          <span className="text-[#9A2E65]">✦</span>
          <span className="px-4 py-1.5 rounded-full bg-white border border-[rgba(98,67,127,0.15)] shadow-xs">Se encarna</span>
          <span className="text-[#9A2E65]">✦</span>
          <span className="px-4 py-1.5 rounded-full bg-[#F8E6EE] text-[#9A2E65] border border-[#9A2E65]/30 shadow-xs font-bold">Se vive</span>
        </div>
      </section>

      {/* 6. SESIONES DESTACADAS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9A2E65] font-semibold">
              Apertura de Portales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281D33] mt-1">
              Lecturas más Solicitadas
            </h2>
          </div>
          <Link
            href="/lecturas"
            className="text-xs uppercase tracking-wider font-semibold text-[#685876] hover:text-[#9A2E65] transition-colors inline-flex items-center gap-2"
          >
            <span>Ver Todas las Lecturas</span>
            <ArrowRight className="w-4 h-4 text-[#9A2E65]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION FINAL */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-[#F5EFF7] to-[#F8E6EE] p-10 md:p-16 border border-[#9A2E65]/25 relative overflow-hidden shadow-sm">
          <div className="relative z-10 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#281D33]">
              ¿Listo para mirar dentro del espejo sagrado?
            </h2>
            <p className="text-sm sm:text-base text-[#685876] max-w-xl mx-auto font-normal leading-relaxed">
              Los momentos de incertidumbre son los umbrales de tu mayor metamorfosis. Reserva tu espacio y descubre lo que tu alma ya tiene listo para manifestar.
            </p>
            <div className="pt-2">
              <Link
                href="/lecturas"
                className="inline-block bg-[#9A2E65] hover:bg-[#7D2251] text-white px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
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
