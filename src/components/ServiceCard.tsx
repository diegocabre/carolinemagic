import { Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Service } from "@/data/services";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative bg-white/90 backdrop-blur-sm border border-[rgba(98,67,127,0.1)] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#9A2E65]/40 transition-all duration-300 flex flex-col justify-between group">
      {service.featured && (
        <span className="absolute -top-3 right-6 bg-[#9A2E65] text-white px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
          MÁS SOLICITADO
        </span>
      )}

      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="bg-[#F5EFF7] text-[#523B68] border border-[#523B68]/15 px-3 py-1 rounded-full text-xs font-medium">
            {service.category}
          </span>
          <div className="flex items-center gap-1.5 bg-[#F5EFF7] text-[#523B68] border border-[#523B68]/15 px-3 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-[#9A2E65]" />
            <span>{service.duration}</span>
          </div>
        </div>

        <h3 className="font-serif text-2xl text-[#281D33] font-bold group-hover:text-[#9A2E65] transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-xs text-[#8B6F9E] font-medium mb-4 italic">
          {service.subtitle}
        </p>
        <p className="text-[#685876] text-sm leading-relaxed mb-6 font-normal">
          {service.description}
        </p>

        <div className="space-y-2.5 mb-8">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2.5 text-[#281D33] text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#9A2E65] shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[rgba(98,67,127,0.1)] flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#8C7C99] block">Inversión</span>
          <span className="text-2xl font-bold font-serif text-[#281D33]">{service.price}</span>
        </div>
        <a
          href={getWhatsAppUrl(WHATSAPP_MESSAGES.service(service.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#F5EFF7] hover:bg-[#9A2E65] hover:text-white text-[#523B68] border border-[#523B68]/20 transition-all group/btn shadow-xs hover:shadow-md"
          aria-label={`Agendar ${service.title} por WhatsApp (abre en nueva pestaña)`}
        >
          <span>Agendar</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#9A2E65] group-hover/btn:text-white" />
        </a>
      </div>
    </div>
  );
}
