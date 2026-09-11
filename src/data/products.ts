export interface Product {
  id: string;
  name: string;
  category: "Barajas de Autor" | "Obras Originales" | "Talismanes";
  price: string;
  description: string;
  badge?: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: "oraculo-velo-violeta",
    name: "El Oráculo del Velo Violeta",
    category: "Barajas de Autor",
    price: "$58 USD",
    badge: "Edición Limitada",
    description:
      "Mazo de 44 cartas impreso en papel de algodón de 400g con bordes laminados en magenta holográfico y libro guía encuadernado en tela.",
    imageAlt: "Baraja de autor con tonalidades amatista y magenta",
  },
  {
    id: "obra-emperatriz-cosmica",
    name: "La Emperatriz Cósmica (Óleo & Pan de Oro)",
    category: "Obras Originales",
    price: "$420 USD",
    badge: "Pieza Única",
    description:
      "Pintura canalizada de 60x80cm. Pigmentos orgánicos, amatista pulverizada y hojas de oro de 24k sobre lienzo de lino curado.",
    imageAlt: "Pintura mística con la figura de la Emperatriz cósmica",
  },
  {
    id: "talisman-obsidiana-sagrada",
    name: "Talismán de Obsidiana Dorada & Cobre Alquímico",
    category: "Talismanes",
    price: "$95 USD",
    badge: "Consagrado",
    description:
      "Amuleto protector forjado a mano durante luna llena. Canaliza la energía de enraizamiento y protección psíquica profunda.",
    imageAlt: "Talismán de piedra obsidiana engarzada a mano",
  },
];
