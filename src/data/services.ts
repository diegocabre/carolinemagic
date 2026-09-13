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
    | "Talleres"
    | "Ritos & Ceremonias";
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

  // ── TALLERES (Portal Talleres de Instagram) ──────────────────────────────
  {
    id: "reiki-de-hadas",
    title: "Reiki de Hadas",
    subtitle: "Una experiencia mágica",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Un taller iniciático para conectar con la energía sutil de las hadas y canalizar sanación a través de este linaje de reiki.",
    benefits: [
      "Sintonización/iniciación en Reiki de Hadas",
      "Práctica guiada de canalización energética",
      "Material de apoyo para continuar tu práctica",
    ],
  },
  {
    id: "formacion-registros-akashicos",
    title: "Formación en Registros Akáshicos",
    subtitle: "Nivel 1, 2 y Maestría",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Formación espiritual progresiva para aprender a acceder y leer los Registros Akáshicos, desde los fundamentos hasta el nivel de maestría.",
    benefits: [
      "Recorrido completo: Nivel 1, Nivel 2 y Maestría",
      "Herramientas para lecturas propias y de terceros",
      "Certificación al completar cada nivel",
    ],
  },
  {
    id: "vidas-pasadas",
    title: "Vidas Pasadas",
    subtitle: "Iniciación y práctica",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Un taller para explorar la técnica de regresión y acceso a vidas pasadas como herramienta de sanación y autoconocimiento.",
    benefits: [
      "Fundamentos teóricos y prácticos",
      "Ejercicio guiado de regresión",
      "Espacio grupal de integración",
    ],
  },
  {
    id: "tarot-y-oraculos-taller",
    title: "Tarot & Oráculos",
    subtitle: "Formación grupal",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Taller formativo para aprender a interpretar el tarot y otros oráculos, desde los arquetipos hasta la lectura intuitiva propia.",
    benefits: [
      "Fundamentos simbólicos de los arcanos",
      "Práctica de lectura en grupo",
      "Guía para iniciar tu propia práctica",
    ],
  },
  {
    id: "clarividencia",
    title: "Clarividencia",
    subtitle: "Desarrollo de percepción sutil",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Un espacio para despertar y entrenar la percepción clarividente, ampliando tu capacidad de ver más allá de lo evidente.",
    benefits: [
      "Ejercicios progresivos de apertura perceptiva",
      "Práctica guiada en grupo",
      "Herramientas para integrar en tu día a día",
    ],
  },
  {
    id: "limpiezas-energeticas",
    title: "Limpiezas Energéticas",
    subtitle: "Taller práctico",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Aprende técnicas de limpieza energética para espacios y personas, y cómo mantener tu campo energético en equilibrio.",
    benefits: [
      "Técnicas de limpieza para hogar y espacios",
      "Limpieza energética personal",
      "Recomendaciones de mantenimiento regular",
    ],
  },
  {
    id: "expansion-de-consciencia",
    title: "Expansión de Consciencia",
    subtitle: "Taller vivencial",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Un taller diseñado para ampliar tu percepción de la realidad y abrir nuevas posibilidades de elección consciente en tu vida.",
    benefits: [
      "Ejercicios de expansión perceptiva",
      "Reflexión guiada en grupo",
      "Herramientas de integración post-taller",
    ],
  },
  {
    id: "coaching-holistico",
    title: "Coaching Holístico",
    subtitle: "Acompañamiento integral",
    duration: "Por confirmar",
    price: "Consultar",
    category: "Talleres",
    description:
      "Un enfoque de coaching que integra herramientas espirituales, energéticas y de desarrollo personal para acompañar tus procesos de cambio.",
    benefits: [
      "Sesiones estructuradas de acompañamiento",
      "Integración de herramientas holísticas",
      "Seguimiento de objetivos personales",
    ],
  },

  // ── RITOS & CEREMONIAS ────────────────────────────────────────────────────
  {
    id: "ritual-cierre-de-ciclo",
    title: "Ritual de Cierre de Ciclo",
    subtitle: "Ceremonia personalizada",
    duration: "90 min",
    price: "Consultar",
    category: "Ritos & Ceremonias",
    description:
      "Una ceremonia diseñada para honrar el cierre de una etapa —duelo, ruptura, mudanza, transición vital— y abrir espacio consciente a lo nuevo.",
    benefits: [
      "Diseño ritual a medida según tu proceso",
      "Elementos simbólicos y consagración de objetos personales",
      "Acompañamiento antes y después de la ceremonia",
    ],
  },

  // ── MENTORÍA ───────────────────────────────────────────────────────────────
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
