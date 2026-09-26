/**
 * Colecciones de la Galería & Tienda. Cuando lleguen las fotos, deja el
 * archivo en /public/images/galeria/ y completa `imagen` (ej:
 * "/images/galeria/arte.jpeg"). Mientras no haya foto se muestra un
 * marcador elegante con el número de la colección.
 */
export interface Coleccion {
  id: string;
  nombre: string;
  emoji: string;
  bajada: string;
  items: string[];
  imagen?: string;
}

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
