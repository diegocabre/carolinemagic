import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(98,67,127,0.12)] bg-[#F5E6ED] text-[#685876] pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Marca y Biografía Breve */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#9A2E65]/20 shadow-xs shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="Caroline Magic"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#281D33] leading-tight">
              Caroline Magic
            </span>
          </div>
          <p className="text-xs text-[#685876] leading-relaxed font-normal">
            Portal contemporáneo de tarot evolutivo, arquetipos del alma y arte consagrado. Guiando hacia la soberanía espiritual y la autorrealización.
          </p>
        </div>

        {/* Enlaces de Exploración */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-[#523B68] font-bold">
            Navegación
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/lecturas" className="text-[#685876] hover:text-[#9A2E65] transition-colors">Lecturas & Sesiones</Link></li>
            <li><Link href="/sobre-caroline" className="text-[#685876] hover:text-[#9A2E65] transition-colors">Sobre Caroline</Link></li>
            <li><Link href="/galeria-tienda" className="text-[#685876] hover:text-[#9A2E65] transition-colors">Galería & Talismanes</Link></li>
            <li><Link href="/sobre-caroline#atelier" className="text-[#685876] hover:text-[#9A2E65] transition-colors">Atelier Privé</Link></li>
          </ul>
        </div>

        {/* Legal & Ética */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-[#523B68] font-bold">
            Ética & Confianza
          </h4>
          <ul className="space-y-2 text-xs text-[#685876] font-normal">
            <li>Privacidad y Secreto de Sesión 100% garantizado</li>
            <li>Enfoque evolutivo no determinista</li>
            <li>Términos del Servicio Esotérico</li>
            <li>Política de Devolución & Cancelación</li>
          </ul>
        </div>

        {/* Newsletter Lunar */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-[#523B68] font-bold">
            El Correo Lunar
          </h4>
          <p className="text-xs text-[#685876]">
            Recibe cada novilunio interpretaciones arquetípicas y acceso preferente a sesiones privadas.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="tu.email@esencia.com"
              className="bg-white border border-[rgba(98,67,127,0.2)] rounded-full px-4 py-2.5 text-xs text-[#281D33] focus:outline-none focus:border-[#9A2E65] flex-1 placeholder:text-[#8C7C99] shadow-xs"
            />
            <button
              type="button"
              className="p-2.5 rounded-full bg-[#9A2E65] hover:bg-[#7D2251] text-white shadow-xs transition-colors"
              aria-label="Suscribirse al boletín lunar"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[rgba(98,67,127,0.1)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C7C99]">
        <p>© {new Date().getFullYear()} Caroline Magic. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5 text-[#685876]">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#9A2E65] transition-colors" aria-label="Instagram">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#9A2E65] transition-colors" aria-label="YouTube">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
              <polygon points="10 15 15 12 10 9 10 15"/>
            </svg>
          </a>
          <span className="text-[11px] tracking-wider uppercase text-[#8C7C99]">Diseñado con misticismo y precisión</span>
        </div>
      </div>
    </footer>
  );
}
