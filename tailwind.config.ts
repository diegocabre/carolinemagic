import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBF7F4", // Lienzo principal: Marfil místico / Lino cálido
        surface: {
          DEFAULT: "#FFFFFF", // Blanco puro para tarjetas principales
          soft: "#F5EFF7", // Lavanda muy sutil
          container: "#EFE6F0", // Amatista translúcido para inputs y fondos suaves
          glass: "rgba(255, 255, 255, 0.75)",
        },
        primary: {
          DEFAULT: "#9A2E65", // Magenta / Berry profundo elegante para CTAs
          hover: "#7D2251",
          soft: "#F8E6EE", // Rosa cuarzo suave para pills y fondos activos
        },
        secondary: {
          DEFAULT: "#523B68", // Amatista real profundo para títulos
          accent: "#8B6F9E", // Amatista medio
        },
        text: {
          primary: "#281D33", // Amatista noche (contraste WCAG AAA sobre marfil)
          secondary: "#685876", // Lavanda oscuro para párrafos y descripciones
          muted: "#8C7C99", // Para labels y metadatos
        },
        border: {
          subtle: "rgba(98, 67, 127, 0.12)",
          accent: "rgba(154, 46, 101, 0.25)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        "luxe-sm": "0 2px 8px -2px rgba(98, 67, 127, 0.08)",
        "luxe-md": "0 8px 24px -4px rgba(98, 67, 127, 0.1)",
        "luxe-lg": "0 16px 36px -6px rgba(98, 67, 127, 0.14)",
        "berry-glow": "0 0 25px 2px rgba(154, 46, 101, 0.25)",
      },
      borderRadius: {
        card: "1rem",
        modal: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
