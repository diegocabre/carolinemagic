import SerieEpisodios, { Episodio } from "@/components/SerieEpisodios";
import VisorColeccion from "@/components/VisorColeccion";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { colecciones } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

const VIDEOS = "/images/galeria/videos";

const EPISODIOS: Episodio[] = [
  { titulo: "Primer episodio", src: `${VIDEOS}/episodio1.mp4`, duracion: "1:14" },
  { titulo: "Segundo episodio", src: `${VIDEOS}/episodio2.mp4`, duracion: "1:17" },
  { titulo: "Tercer episodio", src: `${VIDEOS}/episodio3.mp4`, duracion: "1:15" },
  { titulo: "Cuarto episodio", src: `${VIDEOS}/episodio4.mp4`, duracion: "1:32" },
];

const VIVENCIAS = [
  {
    titulo: "Proceso del arte",
    texto: "Del lienzo en blanco a la obra: cómo nace cada pieza.",
    src: `${VIDEOS}/procesodelarte.mp4`,
  },
  {
    titulo: "María Mulambo",
    texto: "Una obra y su historia, contada desde el taller.",
    src: `${VIDEOS}/mariamulambo.mp4`,
  },
];

export default function GaleriaTiendaPage() {
  return (
    <div className="bg-mystic-glow">
      {/* Header editorial */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-semibold">
          Atelier Caroline Magic
        </p>
        <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold text-text-primary tracking-tight leading-[0.95]">
            Galería
            <span className="block italic font-normal text-primary">
              &amp; Tienda
            </span>
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
            Arte, oráculos y objetos rituales creados a mano. Piezas pensadas
            para acompañar tu altar, tu hogar y tus prácticas personales.
          </p>
        </div>

        {/* Índice de colecciones */}
        <nav
          aria-label="Colecciones"
          className="mt-14 border-t border-text-primary/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
        >
          {colecciones.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="group flex items-baseline gap-3 py-4 pr-4 border-b border-text-primary/10 text-text-secondary hover:text-primary transition-colors"
            >
              <span className="font-serif text-xs text-text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium">{c.nombre}</span>
            </a>
          ))}
        </nav>
      </header>

      {/* Colecciones: filas editoriales alternadas */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {colecciones.map((c, i) => {
          const numero = String(i + 1).padStart(2, "0");
          const invertida = i % 2 === 1;

          return (
            <section
              key={c.id}
              id={c.id}
              aria-labelledby={`${c.id}-titulo`}
              className="scroll-mt-24 grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center py-16 sm:py-20 border-t border-text-primary/10 first:border-t-0"
            >
              {/* Foto */}
              <div className={`relative ${invertida ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-gradient-to-br from-surface-container via-primary-soft to-surface-soft">
                  {c.fotos?.length ? (
                    <VisorColeccion fotos={c.fotos} nombre={c.nombre} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <span
                        className="text-6xl sm:text-7xl opacity-80"
                        aria-hidden="true"
                      >
                        {c.emoji}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-secondary-accent">
                        Fotografía próximamente
                      </span>
                    </div>
                  )}
                </div>
                {/* Marco desplazado */}
                <div
                  aria-hidden="true"
                  className={`hidden sm:block absolute -z-10 inset-0 border border-primary/30 rounded-[2px] ${invertida ? "-translate-x-5 translate-y-5" : "translate-x-5 translate-y-5"}`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute z-10 -top-8 sm:-top-10 font-serif italic text-7xl sm:text-8xl text-primary/15 select-none ${invertida ? "right-2" : "left-2"}`}
                >
                  {numero}
                </span>
              </div>

              {/* Texto */}
              <div className={invertida ? "md:order-1" : ""}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
                  Colección {numero}
                </p>
                <h2
                  id={`${c.id}-titulo`}
                  className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-text-primary tracking-tight"
                >
                  {c.nombre}
                </h2>
                <p className="mt-4 font-serif italic text-lg text-primary">
                  {c.bajada}
                </p>

                <ul className="mt-8 border-t border-text-primary/15">
                  {c.items.map((item) => {
                    const [titulo, detalle] = item.split(" — ");
                    return (
                      <li
                        key={item}
                        className="py-3.5 border-b border-text-primary/10 flex gap-4"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rotate-45 bg-primary/60 shrink-0"
                        />
                        <span className="text-sm sm:text-[15px] text-text-primary">
                          {titulo}
                          {detalle && (
                            <span className="block text-xs sm:text-sm text-text-secondary mt-0.5">
                              {detalle}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <a
                  href={getWhatsAppUrl(WHATSAPP_MESSAGES.product(c.nombre))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Consultar por ${c.nombre} en WhatsApp (abre en nueva pestaña)`}
                  className="group mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  <span className="border-b border-current pb-1">
                    Consultar disponibilidad
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </section>
          );
        })}
      </div>

      {/* Vivencias: bloque oscuro */}
      <section
        aria-labelledby="vivencias-titulo"
        className="relative overflow-hidden bg-text-primary text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(154,46,101,0.45),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(82,59,104,0.6),transparent_50%)]"
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 space-y-24">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-primary-soft/80 font-semibold">
                Vivencias &amp; más
              </p>
              <h2
                id="vivencias-titulo"
                className="mt-5 font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-[0.95]"
              >
                Hablando
                <span className="block italic font-normal text-primary-soft">
                  con mis obras
                </span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-md">
              Una serie de cuatro episodios donde Caroline se sienta frente a
              sus piezas y cuenta lo que cada una tiene para decir.
            </p>
          </div>

          <SerieEpisodios serie="Hablando con mis obras" episodios={EPISODIOS} />

          <div className="space-y-10">
            <h3 className="font-serif text-2xl sm:text-3xl border-t border-white/15 pt-10">
              Desde el taller
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 max-w-3xl">
              {VIVENCIAS.map((v) => (
                <figure key={v.src} className="space-y-4">
                  <div className="aspect-[9/16] max-h-[560px] mx-auto overflow-hidden rounded-[1.5rem] bg-black ring-1 ring-white/15">
                    <video
                      src={`${v.src}#t=0.5`}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={v.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption>
                    <span className="block font-serif text-xl">{v.titulo}</span>
                    <span className="block text-sm text-white/55 mt-1">
                      {v.texto}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
