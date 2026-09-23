import SesionesGrid from "@/components/SesionesGrid";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/whatsapp";
import { encuentrosGrupales } from "@/data/sesiones";
import { Heart, MapPin, Users } from "lucide-react";

export default function EncuentrosGrupalesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-mystic-glow">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs uppercase tracking-widest font-semibold border border-border-accent shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>Experiencias en Comunidad</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary tracking-tight">
          Encuentros Grupales
        </h1>
        <p className="font-serif text-lg sm:text-xl text-primary italic">
          La magia también se vive en comunidad.
        </p>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Espacios colectivos para mirar tu historia, despertar tu intuición,
          celebrar los ciclos y experimentar la magia junto a una tribu
          consciente. Cada encuentro es una experiencia viva y diferente.
        </p>
      </div>

      {/* Sellos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Users className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Cupos Limitados
            </strong>
            <span className="text-text-secondary">
              Grupos reducidos en cada encuentro
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Presencial u Online
            </strong>
            <span className="text-text-secondary">
              En Osorno o desde donde estés
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white/95 border border-border-subtle shadow-xs">
          <Heart className="w-5 h-5 text-primary shrink-0" />
          <div className="text-xs space-y-0.5">
            <strong className="text-text-primary block font-semibold">
              Tribu Consciente
            </strong>
            <span className="text-text-secondary">
              Conectar, compartir y crear
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Encuentros */}
      <div className="pt-4">
        <SesionesGrid sesiones={encuentrosGrupales} tipo="encuentro" />
      </div>

      {/* Aviso de próximas fechas */}
      <div className="max-w-2xl mx-auto text-center rounded-3xl bg-gradient-to-br from-white/95 to-primary-soft/40 border border-border-subtle p-10 sm:p-14 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
          ¿Quieres saber las próximas fechas?
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Los cupos son limitados y las fechas se anuncian con anticipación.
          Escríbenos y te avisaremos cuando se abra el próximo encuentro.
        </p>
        <div className="pt-2">
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.encuentrosAviso)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Consultar próximos encuentros por WhatsApp (abre en nueva pestaña)"
          >
            Avísenme de los próximos encuentros
          </a>
        </div>
      </div>
    </div>
  );
}
