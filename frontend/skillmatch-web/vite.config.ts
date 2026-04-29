import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/SkillMatch/', // Substitua '/SkillMatch/' pelo nome exato do seu repositório no GitHub
  plugins: [
    react(),
    tailwindcss(),
  ],
})