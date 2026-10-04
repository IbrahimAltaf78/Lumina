/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nebula: {
          bg:      "#070312",
          surface: "#100B24",
          surface2:"#180F30",
          border:  "#2D1D5E",
          primary: "#A855F7",
          pink:    "#F472B6",
          cyan:    "#22D3EE",
          green:   "#4ADE80",
          gold:    "#FCD34D",
          text:    "#F8FAFC",
          dim:     "#E9D5FF",
          muted:   "#6D28D9",
        }
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      }
    },
  },
  plugins: [],
}