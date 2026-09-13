import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { products } from "@/data/products";
import { Package, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";

export default function GaleriaTiendaPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier de Arte Místico</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Galería & Tienda Esotérica
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Obras pictóricas originales, barajas de autor consagradas y talismanes
          protectores. Arte concebido como tecnología sagrada para sintonizar tu
          hogar y altar personal.
        </p>
      </div>

      {/* Características del Taller */}
      <div className="flex flex-wrap justify-center gap-8 text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-primary" />
          <span>Envíos seguros a todo el mundo</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Piezas consagradas bajo lunas específicas</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Certificado de autenticidad firmado</span>
        </div>
      </div>

      {/* Catálogo de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl bg-white/95 border border-border-subtle p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-primary/35 transition-all duration-300 group"
          >
            <div>
              {/* Imagen/Placeholder Místico */}
              <div className="aspect-[4/5] rounded-xl bg-surface-muted flex flex-col items-center justify-center mb-6 relative overflow-hidden border border-border-subtle group-hover:border-primary/20 transition-all">
                <div className="w-16 h-16 rounded-full border border-dashed border-primary/30 bg-white/60 flex items-center justify-center relative">
                  <Sparkles className="w-8 h-8 text-primary group-hover:scale-125 transition-transform" />
                </div>
                <span className="text-[10px] text-text-muted uppercase tracking-wider mt-4 font-semibold">
                  {product.category}
                </span>

                {product.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-primary text-white shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] uppercase tracking-wider text-secondary-accent font-semibold">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-text-primary group-hover:text-primary transition-colors mt-1 mb-2">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-normal">
                {product.description}
              </p>
            </div>

            <div className="pt-5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-2xl font-bold font-serif text-text-primary">
                {product.price}
              </span>
              <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGES.product(product.name))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Consultar disponibilidad para adquirir ${product.name} por WhatsApp`}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-surface-muted hover:bg-primary hover:text-white text-secondary border border-secondary/15 transition-all active:scale-95 group/btn shadow-xs hover:shadow-md"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-primary group-hover/btn:text-white" />
                <span>Adquirir</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
