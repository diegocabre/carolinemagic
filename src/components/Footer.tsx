import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const INSTAGRAM_URL = "https://www.instagram.com/carolinemagic.cl/";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-[#F5E6ED] text-text-secondary pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Marca y Biografía Breve */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/20 shadow-xs shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="Caroline Magic"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-text-primary leading-tight">
              Caroline Magic
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed font-normal">
            Portal contemporáneo de tarot evolutivo, arquetipos del alma y arte
            consagrado. Guiando hacia la soberanía espiritual y la
            autorrealización.
          </p>
        </div>

        {/* Enlaces de Exploración */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-secondary font-bold">
            Navegación
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link
                href="/lecturas"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Sesiones Individuales
              </Link>
            </li>
            <li>
              <Link
                href="/academia"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Academia
              </Link>
            </li>
            <li>
              <Link
                href="/rituales"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Rituales
              </Link>
            </li>
            <li>
              <Link
                href="/galeria-tienda"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Galería & Talismanes
              </Link>
            </li>
            <li>
              <Link
                href="/sobre-caroline"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Sobre Caroline
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Ética */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-secondary font-bold">
            Ética & Confianza
          </h4>
          <ul className="space-y-2 text-xs text-text-secondary font-normal">
            <li>Privacidad y Secreto de Sesión 100% garantizado</li>
            <li>Enfoque evolutivo no determinista</li>
            <li>Términos del Servicio Esotérico</li>
            <li>Política de Devolución & Cancelación</li>
          </ul>
        </div>

        {/* Comunidad en Instagram (reemplaza newsletter no funcional) */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-secondary font-bold">
            El Círculo de Caroline
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            Arte místico, tarot, rituales y reflexiones diarias. Todo el
            contenido en vivo está en Instagram.
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
          >
            <FaInstagram className="w-3.5 h-3.5" />
            <span>Seguir @carolinemagic.cl</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <p>
          © {new Date().getFullYear()} Caroline Magic. Todos los derechos
          reservados.
        </p>
        <div className="flex items-center gap-5 text-text-secondary">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="YouTube"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <polygon points="10 15 15 12 10 9 10 15" />
            </svg>
          </a>
          <span className="text-[11px] tracking-wider uppercase text-text-muted">
            Diseñado con misticismo y precisión
          </span>
        </div>
      </div>
    </footer>
  );
}
