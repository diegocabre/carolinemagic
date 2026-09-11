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
        background: "#120c18", // Obsidian Velvet
        surface: "#17111d",
        "surface-low": "#1f1926",
        "surface-container": "#241d2a",
        "surface-high": "#2e2734",
        primary: {
          DEFAULT: "#f26091", // Magic Magenta
          container: "#bc4891", // Deep Orchid
        },
        secondary: "#62437f", // Mystic Amethyst
        "accent-rose": "#e6b0c8", // Soft Rose
        "on-surface": "#ebdef0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        "mystic-glow": "0 0 20px 2px rgba(242, 96, 145, 0.35)",
        "mystic-glow-lg": "0 0 35px 5px rgba(242, 96, 145, 0.45)",
        "amethyst-glow": "0 0 25px 3px rgba(98, 67, 127, 0.4)",
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
