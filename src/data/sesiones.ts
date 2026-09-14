export interface Sesion {
  id: string;
  nombre: string;
  /** Ruta dentro de public/images/sesiones. Si no existe aún la foto, se omite y la tarjeta muestra un ícono de reemplazo. */
  imagen?: string;
  descripcionBreve: string;
  descripcionLarga: string;
  duracion: string;
  modalidad: string;
  precio: string;
  destacado?: boolean;
}

export const sesionesIndividuales: Sesion[] = [
  {
    id: "tarot-magico",
    nombre: "Tarot Mágico",
    imagen: "/images/sesiones/tarotmagico.jpeg",
    descripcionBreve:
      "Una lectura de tarot que ilumina el camino que tienes frente a ti y te devuelve claridad para decidir.",
    descripcionLarga:
      "A través de los 78 arcanos, esta sesión abre un espacio de escucha profunda para leer tus ciclos actuales, los bloqueos que te frenan y las puertas que ya están abiertas para ti. Es una lectura canalizada en tiempo real, adaptada a la pregunta o etapa vital que traigas, pensada para que salgas con una hoja de ruta simbólica y consciente.",
    duracion: "60 min",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
    destacado: true,
  },
  {
    id: "sesion-mediumnidad",
    nombre: "Sesión de Mediumnidad",
    imagen: "/images/sesiones/mediunidad.jpeg",
    descripcionBreve:
      "Un puente de conexión y mensajes con seres queridos que ya no están en el plano físico.",
    descripcionLarga:
      "Un espacio respetuoso y confidencial de conexión mediúmnica, donde se canalizan mensajes, símbolos y sensaciones provenientes de seres queridos que ya partieron. La sesión busca traer consuelo, cierre y comprensión, respetando siempre el tiempo y la disposición energética de quienes se manifiestan.",
    duracion: "60 min",
    modalidad: "Online (Zoom)",
    precio: "Consultar",
  },
  {
    id: "constelaciones-individuales",
    nombre: "Constelaciones Individuales",
    imagen: "/images/sesiones/constelaciones.jpeg",
    descripcionBreve:
      "Trabajo sistémico 1 a 1 para revelar las dinámicas familiares que aún operan en tu presente.",
    descripcionLarga:
      "Adaptación individual de las constelaciones familiares, útil cuando no es posible o no se desea trabajar en grupo. A través de representaciones simbólicas y preguntas guiadas, se identifican lealtades invisibles, patrones heredados y órdenes systémicos que influyen en la salud, los vínculos o el dinero, abriendo movimientos de sanación y reubicación.",
    duracion: "90 min",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
  },
  {
    id: "registros-akashicos",
    nombre: "Registros Akáshicos y Canalización",
    imagen: "/images/sesiones/registro.jpeg",
    descripcionBreve:
      "Acceso al archivo del alma para comprender el propósito, los dones y las lecciones de tu camino.",
    descripcionLarga:
      "Una lectura canalizada que abre los Registros Akáshicos —la memoria energética de tu alma— para revisar contratos, dones latentes y lecciones kármicas activas. Se combina con canalización intuitiva para traer mensajes claros y aplicables a tu momento presente, con foco en propósito de vida y toma de decisiones.",
    duracion: "60 min",
    modalidad: "Online (Zoom)",
    precio: "Consultar",
  },
  {
    id: "barras-de-access",
    nombre: "Barras de Access",
    imagen: "/images/sesiones/barrasdeacces.jpeg",
    descripcionBreve:
      "Una técnica suave de relajación profunda que libera pensamientos y creencias limitantes almacenadas.",
    descripcionLarga:
      "Access Bars® es una técnica manual suave que activa 32 puntos energéticos en la cabeza, vinculados a distintas áreas de la vida (dinero, cuerpo, creatividad, control, entre otras). La sesión invita a soltar cargas mentales y emocionales acumuladas, dejando una sensación de calma y liviandad que suele extenderse por varios días.",
    duracion: "75 min",
    modalidad: "Presencial",
    precio: "Consultar",
  },
  {
    id: "limpieza-energetica-personal",
    nombre: "Limpieza Energética Personal",
    imagen: "/images/sesiones/limpieza.jpeg",
    descripcionBreve:
      "Una sesión de limpieza y protección energética para liberar cargas ajenas y recuperar tu propio campo.",
    descripcionLarga:
      "Sesión dedicada a identificar y liberar cargas energéticas densas, apegos o interferencias acumuladas en tu campo personal. Se trabaja con técnicas de limpieza y sellado energético para que recuperes tu vibración natural, cerrando la sesión con recomendaciones simples de mantenimiento para tu día a día.",
    duracion: "60 min",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
  },
  {
    id: "acompanamientos-personalizados",
    nombre: "Sesiones / Acompañamientos Personalizados",
    imagen: "/images/sesiones/acompañamiento.jpeg",
    descripcionBreve:
      "Un acompañamiento a medida cuando tu proceso no encaja en un formato único.",
    descripcionLarga:
      "Espacio flexible para procesos que requieren un acompañamiento continuo o una combinación de herramientas (tarot, canalización, trabajo energético, entre otras) diseñada específicamente para tu momento. Se conversa primero tu necesidad para proponer una estructura de sesiones a tu medida.",
    duracion: "A definir según proceso",
    modalidad: "Online (Zoom) o presencial",
    precio: "Consultar",
  },
];
