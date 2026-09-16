export interface Sesion {
  id: string;
  nombre: string;
  emoji: string;
  /** Ruta dentro de public/images/sesiones. Si no existe aún la foto, se omite y la tarjeta muestra un ícono de reemplazo. */
  imagen?: string;
  /** Frase gancho, se muestra en la tarjeta. */
  descripcionBreve: string;
  /** Párrafos completos separados por doble salto de línea, se muestran en el modal "Ver más". */
  descripcionLarga: string;
  /** Texto del bloque "Ideal para ti si...", sin el prefijo. */
  idealPara: string;
  /** Pilar(es) Caroline Magic asociados, ej: "CLARIDAD" o "CLARIDAD + MEDICINA". */
  pilares: string;
  duracion: string;
  modalidad: string;
  precio: string;
  destacado?: boolean;
}

export const sesionesIndividuales: Sesion[] = [
  {
    id: "tarot-magico",
    nombre: "Tarot Mágico",
    emoji: "🔮",
    imagen: "/images/sesiones/tarotmagico.jpeg",
    descripcionBreve: "Claridad para ver lo que hoy no estás pudiendo ver.",
    descripcionLarga:
      "Tarot Mágico es el método de Caroline Magic que integra Tarot terapéutico, sistémico, predictivo y espiritual.\n\nNo se trata solamente de preguntar qué va a pasar. La lectura permite observar tu energía actual, patrones, vínculos, posibilidades y caminos disponibles para que puedas tomar decisiones con mayor claridad.\n\nPodemos trabajar: amor y vínculos, trabajo, dinero, proyectos, decisiones, bloqueos, procesos personales y energía presente.",
    idealPara:
      "Estás atravesando una decisión, necesitas respuestas o sientes que hay algo que no estás logrando ver con claridad.",
    pilares: "CLARIDAD",
    duracion: "60 min",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
    destacado: true,
  },
  {
    id: "sesion-mediumnidad",
    nombre: "Mediumnidad",
    emoji: "🕯️",
    imagen: "/images/sesiones/mediunidad.jpeg",
    descripcionBreve: "Hay mensajes que no llegan desde la mente.",
    descripcionLarga:
      "Una sesión individual de conexión y percepción espiritual en la que abrimos un espacio para recibir información, imágenes, sensaciones o mensajes que puedan surgir durante el encuentro.\n\nLa sesión no busca forzar una comunicación ni garantizar el contacto con una persona específica. Trabajamos con aquello que se presenta y con la información que pueda ser significativa para tu proceso.",
    idealPara:
      "Sientes la necesidad de explorar una conexión espiritual, comprender determinadas experiencias o recibir un mensaje desde otra perspectiva.",
    pilares: "MEDICINA",
    duracion: "60 min",
    modalidad: "Online (Zoom)",
    precio: "Consultar",
  },
  {
    id: "constelaciones-individuales",
    nombre: "Constelaciones Familiares Individuales",
    emoji: "🌳",
    imagen: "/images/sesiones/constelaciones.jpeg",
    descripcionBreve: "A veces lo que estás viviendo no comenzó contigo.",
    descripcionLarga:
      "Una sesión para observar dinámicas familiares, patrones repetitivos, vínculos y lealtades que pueden estar influyendo en tu presente.\n\nA través de una mirada sistémica exploramos el lugar que ocupas dentro de tu historia familiar y aquello que puede necesitar ser reconocido, ordenado o mirado de una manera diferente.\n\nPodemos trabajar pareja, familia, maternidad, dinero, trabajo, pérdidas, decisiones, repeticiones y conflictos vinculares, entre otros temas.",
    idealPara:
      "Reconoces historias que se repiten, cargas que parecen no pertenecerte o situaciones que racionalmente comprendes pero continúan apareciendo.",
    pilares: "ORIGEN",
    duracion: "90 min",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
  },
  {
    id: "registros-akashicos",
    nombre: "Registros Akáshicos y Canalización",
    emoji: "✨",
    imagen: "/images/sesiones/registro.jpeg",
    descripcionBreve: "Una pregunta puede abrir una información completamente nueva.",
    descripcionLarga:
      "Esta sesión crea un espacio de introspección y canalización alrededor de las preguntas que hoy son importantes para ti.\n\nTrabajamos desde la percepción intuitiva y espiritual para explorar información relacionada con tu momento actual, aprendizajes, vínculos, decisiones, propósito y procesos personales.\n\nNo buscamos decirte qué debes hacer. La información recibida funciona como una herramienta para ampliar tu mirada y conectar con tus propias elecciones.",
    idealPara:
      "Estás buscando comprender profundamente un proceso, conectar con tu intuición o explorar preguntas relacionadas con tu camino personal y espiritual.",
    pilares: "CLARIDAD + MEDICINA",
    duracion: "60 min",
    modalidad: "Online (Zoom)",
    precio: "Consultar",
  },
  {
    id: "barras-de-access",
    nombre: "Barras de Access",
    emoji: "💜",
    imagen: "/images/sesiones/barrasdeacces.jpeg",
    descripcionBreve: "¿Y si por un momento dejaras de sostenerlo todo?",
    descripcionLarga:
      "Barras de Access® es una práctica corporal que consiste en tocar suavemente determinados puntos de la cabeza mientras permaneces cómodamente recostado/a.\n\nLa experiencia está orientada a generar un espacio de relajación, pausa y mayor percepción personal.\n\nDentro de Caroline Magic la integramos como una experiencia para bajar el ruido, detener el hacer constante y regalarle al cuerpo un espacio para recibir.",
    idealPara:
      "Buscas un momento de relajación, descanso y desconexión de la exigencia cotidiana.",
    pilares: "MEDICINA",
    duracion: "75 min",
    modalidad: "Presencial",
    precio: "Consultar",
  },
  {
    id: "limpieza-energetica-personal",
    nombre: "Limpieza Energética Personal",
    emoji: "🔥",
    imagen: "/images/sesiones/limpieza.jpeg",
    descripcionBreve: "Limpia. Libera. Expande.",
    descripcionLarga:
      "Una experiencia ritual y energética personalizada creada para marcar un momento de limpieza, cierre, renovación e intención.\n\nDependiendo del objetivo podemos integrar diferentes elementos rituales y simbólicos, prácticas energéticas, velas, intención y canalización.\n\nCada trabajo se diseña específicamente para la persona y el proceso que está atravesando.\n\nPuede acompañar momentos de cierre de ciclos, cambios, sensación de estancamiento, nuevos comienzos o necesidad de renovación personal.",
    idealPara:
      "Sientes que necesitas hacer un corte simbólico con una etapa anterior y abrir espacio para una nueva energía e intención.",
    pilares: "MEDICINA + EXPANSIÓN",
    duracion: "60 min",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
  },
  {
    id: "acompanamientos-personalizados",
    nombre: "Acompañamiento Personalizado",
    emoji: "🌙",
    imagen: "/images/sesiones/acompañamiento.jpeg",
    descripcionBreve:
      "No siempre necesitas una sesión. A veces necesitas un proceso.",
    descripcionLarga:
      "Este es el espacio más integral de Caroline Magic.\n\nEstá pensado para personas que están atravesando una transformación y desean trabajarla con continuidad, en lugar de abordar solamente una situación puntual.\n\nDiseñamos un recorrido personalizado y podemos integrar diferentes herramientas de Caroline Magic según cada etapa: Tarot, coaching, mirada sistémica, prácticas energéticas, canalización, rituales, trabajo corporal y herramientas de consciencia.\n\nNo existe un protocolo idéntico para todos porque cada proceso necesita algo diferente.",
    idealPara:
      "Estás atravesando un cambio importante, quieres profundizar en tu desarrollo personal o sientes que llegó el momento de trabajar contigo de una manera más comprometida y sostenida.",
    pilares: "CLARIDAD · ORIGEN · MEDICINA · EXPANSIÓN",
    duracion: "A definir según proceso",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
  },
];
