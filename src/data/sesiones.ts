export interface Sesion {
  id: string;
  nombre: string;
  emoji: string;
  /** Ruta dentro de public/images (sesiones/, familiares/ o academia/). Si no existe aún la foto, se omite y la tarjeta muestra un ícono de reemplazo. */
  imagen?: string;
  /** Frase gancho, se muestra en la tarjeta. */
  descripcionBreve: string;
  /** Párrafos completos separados por doble salto de línea, se muestran en el modal "Ver más". */
  descripcionLarga: string;
  /** Texto del bloque "Ideal para ti si...", sin el prefijo. */
  idealPara?: string;
  /** Pilar(es) Caroline Magic asociados, ej: "CLARIDAD" o "CLARIDAD + MEDICINA". */
  pilares?: string;
  /** Datos extra que se listan en el modal, ej: { etiqueta: "Lugar", valor: "Osorno, Chile" }. */
  detalles?: { etiqueta: string; valor: string }[];
  /** Frase de cierre destacada en el modal. */
  cierre?: string;
  /** Sub-programas que agrupa la tarjeta (ej: los cursos autogestionados), se listan en el modal. */
  items?: { nombre: string; descripcion: string; enfoque?: string }[];
  duracion: string;
  modalidad?: string;
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

export const encuentrosGrupales: Sesion[] = [
  {
    id: "constelaciones-familiares-magicas",
    nombre: "Constelaciones Familiares Mágicas",
    emoji: "🌳",
    imagen: "/images/familiares/constelacionesfamiliares.jpeg",
    descripcionBreve:
      "Una experiencia grupal para mirar tu lugar dentro del sistema familiar.",
    descripcionLarga:
      "Una experiencia grupal para mirar tu lugar dentro del sistema familiar, reconocer patrones, vínculos y dinámicas heredadas que hoy pueden estar influyendo en tu vida.\n\nIntegramos la mirada de las Constelaciones Familiares con el sello intuitivo, simbólico y espiritual de Caroline Magic, creando un espacio para observar, reconocer y abrir nuevos movimientos.\n\nUn encuentro para honrar tu historia, mirar tu origen y elegir qué quieres llevar contigo hacia la vida.",
    detalles: [
      { etiqueta: "Lugar", valor: "Osorno, Chile" },
      { etiqueta: "Reserva", valor: "Cupos limitados" },
    ],
    duracion: "4 horas",
    modalidad: "Presencial · Grupal",
    precio: "Consultar",
  },
  {
    id: "aquelarre",
    nombre: "Aquelarre · Encuentro de Tribu",
    emoji: "🔥",
    imagen: "/images/familiares/aquelarre.jpeg",
    descripcionBreve:
      "Un encuentro para reunirnos, conectar, compartir y experimentar la magia en comunidad.",
    descripcionLarga:
      "Un encuentro grupal para reunirnos, conectar, compartir y experimentar la magia en comunidad.\n\nAquelarre es un espacio vivo donde integramos rituales, Tarot, intuición, canalización, herramientas energéticas y prácticas de consciencia, creando una experiencia diferente en cada edición.\n\nNo es una clase tradicional. Es un espacio para experimentar, conectar con tu propia magia y compartir con una tribu consciente.",
    detalles: [{ etiqueta: "Cupos", valor: "Limitados" }],
    cierre: "La magia también se vive en comunidad.",
    duracion: "2 horas",
    modalidad: "Presencial · Grupal",
    precio: "Consultar",
  },
  {
    id: "portal-del-mes",
    nombre: "Portal del Mes",
    emoji: "🌙",
    imagen: "/images/familiares/portal.jpeg",
    descripcionBreve:
      "Cierra el ciclo anterior y elige conscientemente qué quieres crear en el nuevo mes.",
    descripcionLarga:
      "Un encuentro mensual para cerrar el ciclo anterior, conectar con la energía del nuevo mes y elegir conscientemente qué quieres crear.\n\nA través del Tarot y oráculo, canalización, ritual, intención y herramientas de consciencia, abrimos un espacio para observar qué dejamos atrás, qué energía está disponible y hacia dónde queremos dirigir nuestra atención.\n\nCada Portal es diferente porque trabajamos con la energía y temática del mes que comienza, transformándolo en un momento de conexión, claridad y creación consciente.",
    detalles: [
      { etiqueta: "Frecuencia", valor: "1 encuentro mensual" },
      {
        etiqueta: "Incluye",
        valor: "Material y ritual/práctica correspondiente al Portal del mes",
      },
    ],
    cierre: "Cierra · Conecta · Elige · Crea.",
    duracion: "90 min",
    modalidad: "Online",
    precio: "Consultar",
  },
  {
    id: "despierta-tu-don",
    nombre: "Despierta tu Don",
    emoji: "👁️",
    imagen: "/images/familiares/despiertatudon.jpeg",
    descripcionBreve:
      "Despierta tu intuición, reconoce tus capacidades y confía en lo que percibes.",
    descripcionLarga:
      "Una experiencia grupal creada para despertar tu intuición, reconocer tus capacidades y comenzar a confiar en aquello que percibes.\n\nA través de ejercicios prácticos, herramientas energéticas, percepción intuitiva y canalización, exploraremos diferentes maneras de recibir información y aprenderemos a distinguir entre intuición, pensamiento e interpretación.\n\nNo necesitas experiencia previa. Este encuentro es una invitación a explorar, experimentar y descubrir cómo se manifiesta tu propio don, sin compararte con la forma en que lo viven los demás.",
    detalles: [{ etiqueta: "Experiencia previa", valor: "No requerida" }],
    cierre: "Tu intuición ya habla. Es momento de aprender a escucharla.",
    duracion: "90 min",
    modalidad: "Online y presencial · Grupal",
    precio: "Consultar",
  },
];

export const programasAcademia: Sesion[] = [
  {
    id: "formacion-tarot-rider",
    nombre: "Formación Tarot Rider",
    emoji: "🃏",
    imagen: "/images/academia/tarotrider.jpeg",
    descripcionBreve:
      "Aprende a leer, interpretar y conectar con el Tarot Rider desde una mirada intuitiva, simbólica y consciente.",
    descripcionLarga:
      "Una formación completa para aprender a leer, interpretar y conectar con el Tarot Rider desde una mirada intuitiva, simbólica y consciente.\n\nDurante 8 clases recorreremos los Arcanos Mayores y Menores, sus símbolos, energías y mensajes, aprendiendo a construir lecturas claras y a desarrollar una forma propia de interpretar las cartas.\n\nLa propuesta combina teoría + práctica + intuición + canalización, para que no solo memorices significados, sino que aprendas a dialogar con el Tarot y confiar en tu propia percepción.\n\nTrabajaremos tiradas, formulación de preguntas, interpretación de combinaciones, práctica de lecturas y herramientas para utilizar el Tarot como instrumento de orientación y autoconocimiento.\n\nNo necesitas experiencia previa.",
    detalles: [
      { etiqueta: "Duración", valor: "8 clases · 1 clase semanal" },
      { etiqueta: "Duración por clase", valor: "2 horas" },
      { etiqueta: "Carga total", valor: "16 horas" },
      {
        etiqueta: "Incluye",
        valor: "Material de estudio en PDF y acompañamiento durante la formación",
      },
    ],
    cierre:
      "Aprende las cartas. Despierta tu intuición. Crea tu propia forma de leer el Tarot.",
    duracion: "8 clases",
    modalidad: "Online y presencial",
    precio: "$90.000 CLP",
  },
  {
    id: "formacion-constelaciones-familiares-magicas",
    nombre: "Formación en Constelaciones Familiares Mágicas",
    emoji: "🌳",
    imagen: "/images/academia/constelacionesfamiliares.jpeg",
    descripcionBreve:
      "Una formación integral de 10 meses para comprender y facilitar procesos desde la mirada sistémica.",
    descripcionLarga:
      "Una formación integral de 10 meses para aprender a comprender y facilitar procesos desde la mirada sistémica, incorporando el sello intuitivo, simbólico y espiritual de Caroline Magic.\n\nA lo largo de 10 módulos recorreremos las bases de las Constelaciones Familiares, órdenes y dinámicas sistémicas, vínculos, ancestros, lealtades y patrones transgeneracionales, movimiento sistémico y herramientas para acompañar procesos individuales y grupales.\n\nLa formación incorpora además el enfoque Caroline Magic: intuición, canalización como práctica espiritual complementaria, trabajo simbólico, Tarot/oráculo y ritual sistémico, siempre diferenciando estas herramientas de los fundamentos propios de las Constelaciones Familiares.\n\nNo es solo teoría. La propuesta incluye prácticas durante el proceso formativo, para integrar progresivamente las herramientas y desarrollar una manera propia, responsable y consciente de acompañar.",
    detalles: [
      { etiqueta: "Programa", valor: "10 módulos · 1 módulo mensual" },
      { etiqueta: "Forma de pago", valor: "10 cuotas de $45.000 CLP" },
      {
        etiqueta: "Incluye",
        valor:
          "Clases teórico-prácticas · prácticas · material PDF · manual completo de formación",
      },
    ],
    cierre: "Mira el origen. Comprende el sistema. Abre nuevos movimientos.",
    duracion: "10 meses",
    modalidad: "Presencial",
    precio: "$450.000 CLP",
  },
  {
    id: "formacion-magos-y-magas-nivel-1",
    nombre: "Formación Magos & Magas · Nivel 1",
    emoji: "🪄",
    imagen: "/images/academia/magosymagas.jpeg",
    descripcionBreve:
      "Reconoce, explora y desarrolla tu propia sensibilidad energética, intuitiva y espiritual.",
    descripcionLarga:
      "Una formación vivencial para comenzar a reconocer, explorar y desarrollar tu propia sensibilidad energética, intuitiva y espiritual, incorporando herramientas que puedas llevar a tu vida cotidiana.\n\nDurante 8 clases combinamos consciencia, energía, intuición, percepción, canalización, ritual y práctica, desde el enfoque mágico y espiritual de Caroline Magic.\n\nLa propuesta no busca que sigas una única manera de conectar, sino que descubras cómo funciona tu propia percepción, aprendas a confiar en ella y construyas una caja de herramientas que tenga sentido para ti.\n\nUn recorrido para pasar de “¿tendré un don?” a comenzar a conocer, practicar y habitar tu propia magia.\n\nNo necesitas experiencia previa.",
    detalles: [
      { etiqueta: "Frecuencia", valor: "1 clase semanal" },
      { etiqueta: "Duración por clase", valor: "2 horas" },
      { etiqueta: "Carga total", valor: "16 horas" },
      {
        etiqueta: "Forma de pago",
        valor: "Pago completo de $90.000 o 2 pagos de $45.000 CLP",
      },
      {
        etiqueta: "Incluye",
        valor: "Material PDF + ejercicios y prácticas durante la formación",
      },
    ],
    cierre:
      "Tu magia no comienza cuando aprendes algo nuevo. Comienza cuando reconoces lo que ya estaba en ti.",
    duracion: "8 clases",
    modalidad: "Presencial u online",
    precio: "$90.000 CLP",
  },
  {
    id: "cursos-autogestionados",
    nombre: "Cursos & Talleres Autogestionados",
    emoji: "📚",
    imagen: "/images/academia/autogestionados.jpeg",
    descripcionBreve:
      "Experiencias para realizar a tu propio ritmo, sin horarios ni clases en vivo.",
    descripcionLarga:
      "Son experiencias creadas para realizar a tu propio ritmo, sin horarios ni clases en vivo.\n\nAl comprar el curso recibes la clase/contenido grabado + material PDF, para acceder al aprendizaje de Caroline Magic desde cualquier lugar.",
    items: [
      {
        nombre: "Limpieza Energética Multidimensional",
        descripcion:
          "Herramientas para aprender a limpiar, armonizar y proteger energéticamente personas y espacios desde el enfoque Caroline Magic.",
      },
      {
        nombre: "Despierta tu Intuición",
        descripcion:
          "Una experiencia para explorar tu percepción, reconocer cómo se manifiesta tu intuición y comenzar a confiar en la información que recibes.",
      },
      {
        nombre: "Conecta con tu Oráculo",
        descripcion:
          "Un taller práctico para aprender a crear vínculo con tu oráculo, interpretar sus símbolos y desarrollar una lectura cada vez más intuitiva.",
      },
    ],
    duracion: "A tu ritmo",
    modalidad: "Clase grabada + material PDF",
    precio: "Consultar",
  },
  {
    id: "programas-21-dias",
    nombre: "Programas de 21 Días",
    emoji: "🌀",
    imagen: "/images/academia/programa21dias.jpeg",
    descripcionBreve:
      "21 días consecutivos para trabajar sobre un área específica de tu vida.",
    descripcionLarga:
      "Una experiencia de transformación para trabajar durante 21 días consecutivos sobre un área específica de tu vida.\n\nCada programa propone un recorrido progresivo con herramientas de consciencia, preguntas expansivas, ejercicios, prácticas energéticas, reflexión y propuestas de integración, para salir del piloto automático y comenzar a crear nuevas elecciones.",
    items: [
      {
        nombre: "21 Días · Pareja Ideal",
        descripcion:
          "Un recorrido para revisar cómo estás creando tus vínculos, reconocer patrones, creencias y elecciones repetitivas y comenzar a conectar con la relación que verdaderamente deseas construir. Trabajaremos amor propio, claridad en los vínculos, merecimiento, disponibilidad para recibir, elección consciente y la energía de la pareja que quieres atraer y crear.",
        enfoque: "Vínculos · amor propio · patrones · elección · pareja ideal",
      },
      {
        nombre: "21 Días · Abundancia",
        descripcion:
          "Un proceso para transformar tu relación con el dinero, el recibir y la abundancia. Durante los 21 días trabajaremos creencias y puntos de vista limitantes, capacidad de recibir, valoración personal, posibilidades, elección y creación, incorporando preguntas y herramientas expansivas. El objetivo no es prometer un resultado económico específico, sino desarrollar una relación más consciente y activa con tus decisiones y posibilidades.",
        enfoque: "Dinero · recibir · merecimiento · posibilidades · creación",
      },
      {
        nombre: "21 Días · Expansión de Consciencia",
        descripcion:
          "Un viaje de 21 días para comenzar a cuestionar lo automático, ampliar tu percepción y abrir nuevas posibilidades. A través de preguntas, ejercicios de observación, prácticas de consciencia e intuición, iremos identificando juicios, creencias y estructuras que pueden estar condicionando tus elecciones.",
        enfoque: "Consciencia · claridad · intuición · elección · expansión",
      },
    ],
    cierre: "21 días. Una intención. Una nueva forma de elegir.",
    duracion: "21 días",
    precio: "Consultar",
  },
];
