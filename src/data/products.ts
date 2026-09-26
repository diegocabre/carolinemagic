/**
 * Colecciones de la Galería & Tienda. Las fotos viven en
 * /public/images/galeria/<carpeta>/ y se listan en `fotos`: si hay varias,
 * rotan solas. Mientras no haya fotos se muestra un marcador elegante con
 * el emoji de la colección.
 */
export interface FotoColeccion {
  src: string;
  titulo: string;
}

export interface Coleccion {
  id: string;
  nombre: string;
  emoji: string;
  bajada: string;
  items: string[];
  fotos?: FotoColeccion[];
}

const ARTE = "/images/galeria/arte";
const TAROT = "/images/galeria/tarotyoraculo";

export const colecciones: Coleccion[] = [
  {
    id: "arte",
    nombre: "Arte Caroline Magic",
    emoji: "🎨",
    bajada: "Para todas tus creaciones artísticas.",
    items: [
      "Obras Originales — cuadros y piezas únicas",
      "Arte Canalizado — obras creadas desde procesos intuitivos y espirituales",
      "Mini Obras — pequeños formatos para altares, espacios personales y regalos",
      "Arte Digital — piezas digitales y obras personalizadas cuando estén disponibles",
    ],
    fotos: [
      { src: `${ARTE}/obras-originales.jpeg`, titulo: "Obras Originales" },
      { src: `${ARTE}/arte-canalizado.jpeg`, titulo: "Arte Canalizado" },
      { src: `${ARTE}/mini-obras.jpeg`, titulo: "Mini Obras" },
      { src: `${ARTE}/arte-digital.jpeg`, titulo: "Arte Digital" },
    ],
  },
  {
    id: "tarot-oraculos",
    nombre: "Tarot & Oráculos",
    emoji: "🔮",
    bajada:
      "Una categoría propia, porque es parte fuerte del universo creativo Caroline Magic.",
    items: [
      "Oráculos Caroline Magic",
      "Tarot Caroline Magic",
      "Ediciones especiales",
      "Sets y complementos para lectura",
    ],
    fotos: [
      { src: `${TAROT}/tarots.jpeg`, titulo: "Tarots Caroline Magic" },
      { src: `${TAROT}/lenormand.jpeg`, titulo: "Tarot Lenormand" },
      { src: `${TAROT}/guias.jpeg`, titulo: "Oráculo Guías Espirituales" },
      { src: `${TAROT}/constelaciones.jpeg`, titulo: "Oráculo Constelaciones Mágicas" },
      { src: `${TAROT}/mensajes.jpeg`, titulo: "Oráculo Mensajes del Universo" },
      { src: `${TAROT}/mensajes-cuadrada.jpeg`, titulo: "Oráculo Mensajes del Universo" },
    ],
  },
  {
    id: "tienda-ritual",
    nombre: "Tienda Ritual",
    emoji: "🕯️",
    bajada: "Productos físicos creados para acompañar prácticas personales.",
    items: [
      "Velas rituales",
      "Baños rituales",
      "Sahumerios e inciensos",
      "Hierbas y preparados",
      "Cristales / piedras",
      "Kits rituales",
    ],
  },
  {
    id: "box",
    nombre: "Box Caroline Magic",
    emoji: "🎁",
    bajada:
      "Productos que combinan varias piezas y funcionan muy bien también como regalo.",
    items: [
      "Box Rituales",
      "Box por intención",
      "Box de limpieza",
      "Box abundancia / abre caminos",
      "Box amor propio y vínculos",
      "Ediciones especiales y estacionales",
    ],
  },
  {
    id: "objetos-con-arte",
    nombre: "Objetos con Arte",
    emoji: "🧉",
    bajada: "La parte más artesanal del trabajo de Caroline.",
    items: [
      "Mates pintados a mano",
      "Objetos decorativos",
      "Piezas intervenidas",
      "Ediciones únicas Caroline Magic",
    ],
  },
];
