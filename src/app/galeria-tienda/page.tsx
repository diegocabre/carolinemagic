import { products } from "@/data/products";
import { ShoppingBag, Sparkles, Package, ShieldCheck } from "lucide-react";

export default function GaleriaTiendaPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier de Arte Místico</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-on-surface">
          Galería & Tienda Esotérica
        </h1>
        <p className="text-sm sm:text-base text-on-surface/80 leading-relaxed max-w-2xl mx-auto font-light">
          Obras pictóricas originales, barajas de autor consagradas y talismanes protectores. Arte concebido como tecnología sagrada para sintonizar tu hogar y altar personal.
        </p>
      </div>

      {/* Características del Taller */}
      <div className="flex flex-wrap justify-center gap-8 text-xs text-accent-rose">
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
            className="rounded-card glass-card p-6 flex flex-col justify-between border border-accent-rose/15 hover:border-primary/50 transition-all group"
          >
            <div>
              {/* Imagen/Placeholder Místico */}
              <div className="aspect-[4/5] rounded-lg bg-surface-container flex flex-col items-center justify-center mb-6 relative overflow-hidden border border-accent-rose/10 group-hover:border-primary/30 transition-all">
                <div className="w-16 h-16 rounded-full border border-dashed border-primary/40 flex items-center justify-center relative">
                  <Sparkles className="w-8 h-8 text-primary group-hover:scale-125 transition-transform" />
                </div>
                <span className="text-[10px] text-accent-rose/60 uppercase tracking-widest mt-4">
                  {product.category}
                </span>

                {product.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-primary text-background shadow-mystic-glow">
                    {product.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] uppercase tracking-widest text-accent-rose font-medium">
                {product.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-on-surface group-hover:text-primary transition-colors mt-1 mb-2">
                {product.name}
              </h3>
              <p className="text-xs text-on-surface/75 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-accent-rose/10 flex items-center justify-between">
              <span className="text-xl font-bold font-serif text-on-surface">{product.price}</span>
              <button
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold bg-surface-high hover:bg-primary hover:text-background text-on-surface transition-all active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Adquirir</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
