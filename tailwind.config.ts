import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
// const { colors: defaultColors } = require('tailwindcss/defaultTheme')

// const colors = {
//   ...defaultColors,
//   ...{'primary': {
//         light: "#F7F7F7",
//         dark: "#0C0C0E",
//         DEFAULT: "#F7F7F7",
//       },
//       'secondary': {
//         light: "#FFFFFF",
//         dark: "#1E1F22",
//         DEFAULT: "#FFFFFF",
//       },
//       'textPrimary': {
//         light: "#000000",
//         dark: "#E1E3E6",
//         DEFAULT: "#000000",
//       },
//       'textSecondary': {
//         light: "neutral-500",
//         dark: "#5D5F61",
//         DEFAULT: "#neutral-500",
//       },
//       'accent': {
//         light: "#EFC89C",
//         dark: "#EFC89C",
//         DEFAULT: "#EFC89C",
//       },}
// }

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    // colors: colors,
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".scrolling-touch": { "-webkit-overflow-scrolling": "touch" },
      });
    }),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
