import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouveau schéma de couleurs spirituel noir/or/blanc
        // Couleur de fond principale (noir)
        dark: {
          DEFAULT: "#0A0A0A",
          light: "#1A1A1A",
          lighter: "#2A2A2A",
        },
        // Couleur or pour accents et titres
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#B8962E",
        },
        // Blanc pour texte
        light: {
          DEFAULT: "#FFFFFF",
          muted: "#E5E5E5",
          dimmed: "#A0A0A0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
