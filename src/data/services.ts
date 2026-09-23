export interface Service {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  category:
    | "Evolutivo"
    | "Sombra & Arquetipos"
    | "Vínculos"
    | "Mentoría"
    | "Academia"
    | "Encuentros Grupales"
    | "Rituales";
  description: string;
  benefits: string[];
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "viaje-del-heroe",
    title: "El Viaje del Héroe",
    subtitle: "Lectura profunda de mapa vital",
    duration: "90 min",
    price: "$95 USD",
    category: "Evolutivo",
    featured: true,
    description:
      "Una inmersión completa en tu estado evolutivo actual. Desentrañamos los ciclos kármicos, bloqueos inconscientes y las oportunidades de expansión que el universo dispone para ti a través de los 78 arcanos.",
    benefits: [
      "Mapa arquetípico de los próximos 12 meses",
      "Identificación de puntos ciegos y dones dormidos",
      "Grabación de audio en alta fidelidad y síntesis canalizada",
    ],
  },
  {
    id: "espejo-y-sombra",
    title: "Espejo & Sombra",
    subtitle: "Sanación e integración psicológica-espiritual",
    duration: "75 min",
    price: "$85 USD",
    category: "Sombra & Arquetipos",
    description:
      "Basada en la psicología analítica junguiana y el simbolismo hermético. Revela los aspectos reprimidos del ser que reclaman luz para dejar de operar como autosabotaje.",
    benefits: [
      "Desciframiento de heridas arquetípicas activas",
      "Técnicas de integración de la sombra para la vida diaria",
      "Ritual personalizado de transmutación energética",
    ],
  },
  {
    id: "sinastria-mistica",
    title: "Sintonía de Almas & Sinastría",
    subtitle: "Dinámica vincular y contratos del alma",
    duration: "60 min",
    price: "$80 USD",
    category: "Vínculos",
    description:
      "Exploración lúcida de los lazos que te unen a otra persona (pareja, familiar o socio). Comprendemos la lección de aprendizaje mutuo y los acuerdos álmicos en juego.",
    benefits: [
      "Esquema de compatibilidad energética y comunicacional",
      "Causas raíz de fricciones kármicas",
      "Estrategias conscientes para la armonía vincular",
    ],
  },

  // ── ACADEMIA (formación con niveles / certificación) ─────────────────────
  {
    id: "formacion-registros-akashicos",
    title: "Formación en Registros Akáshicos",
    subtitle: "Nivel 1, 2 y Maestría",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Academia",
    description:
      "Formación espiritual progresiva para aprender a acceder y leer los Registros Akáshicos, desde los fundamentos hasta el nivel de maestría.",
    benefits: [
      "Recorrido completo: Nivel 1, Nivel 2 y Maestría",
      "Herramientas para lecturas propias y de terceros",
      "Certificación al completar cada nivel",
    ],
  },
  {
    id: "tarot-y-oraculos-taller",
    title: "Tarot & Oráculos",
    subtitle: "Formación grupal",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Academia",
    description:
      "Taller formativo para aprender a interpretar el tarot y otros oráculos, desde los arquetipos hasta la lectura intuitiva propia.",
    benefits: [
      "Fundamentos simbólicos de los arcanos",
      "Práctica de lectura en grupo",
      "Guía para iniciar tu propia práctica",
    ],
  },
  {
    id: "coaching-holistico",
    title: "Coaching Holístico",
    subtitle: "Acompañamiento integral",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Academia",
    description:
      "Un enfoque de coaching que integra herramientas espirituales, energéticas y de desarrollo personal para acompañar tus procesos de cambio.",
    benefits: [
      "Sesiones estructuradas de acompañamiento",
      "Integración de herramientas holísticas",
      "Seguimiento de objetivos personales",
    ],
  },

  // ── RITOS & CEREMONIAS ("Rituales" en el sitio) ──────────────────────────
  {
    id: "ritual-cierre-de-ciclo",
    title: "Ritual de Cierre de Ciclo",
    subtitle: "Ceremonia personalizada",
    duration: "90 min",
    price: "Consultar",
    category: "Rituales",
    description:
      "Una ceremonia diseñada para honrar el cierre de una etapa —duelo, ruptura, mudanza, transición vital— y abrir espacio consciente a lo nuevo.",
    benefits: [
      "Diseño ritual a medida según tu proceso",
      "Elementos simbólicos y consagración de objetos personales",
      "Acompañamiento antes y después de la ceremonia",
    ],
  },

  // ── MENTORÍA ───────────────────────────────────────────────────────────
  {
    id: "atelier-prive",
    title: "Atelier Privé: Mentoría Holística",
    subtitle: "Acompañamiento exclusivo 1 a 1",
    duration: "120 min",
    price: "$160 USD",
    category: "Mentoría",
    featured: true,
    description:
      "Una sesión inmersiva de alta vibración que fusiona lectura de oráculos, diagnóstico energético y canalización intuitiva de arte/talismán personal.",
    benefits: [
      "Sesión personalizada de 2 horas",
      "Talismán digital consagrado con geometría sagrada",
      "Seguimiento por mensajería privada durante 14 días",
    ],
  },
];
