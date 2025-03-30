import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  theme: {
    extend: {
      colors: {
        gray : "#5A5959",
        yellow : "#FFEAAE",
        "dark-yellow": "#FCCA3F",
        orange: "#F6820C"
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})