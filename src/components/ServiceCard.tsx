import Link from "next/link";
import { Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative rounded-card glass-card p-7 flex flex-col justify-between group hover:border-primary/50 transition-all duration-300">
      {service.featured && (
        <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold bg-primary text-background shadow-mystic-glow">
          Más Solicitado
        </span>
      )}

      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs uppercase tracking-widest text-accent-rose font-medium">
            {service.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-on-surface/70 bg-surface-low px-2.5 py-1 rounded-full border border-accent-rose/10">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{service.duration}</span>
          </div>
        </div>

        <h3 className="font-serif text-2xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-xs text-accent-rose/90 font-medium mb-4 italic">
          {service.subtitle}
        </p>
        <p className="text-sm text-on-surface/80 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-2 mb-8">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-on-surface/90">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-accent-rose/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-on-surface/50 block">Inversión</span>
          <span className="text-xl font-bold text-on-surface font-serif">{service.price}</span>
        </div>
        <Link
          href={`/lecturas#${service.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold bg-surface-high hover:bg-primary hover:text-background text-on-surface transition-all group/btn"
        >
          <span>Agendar</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
