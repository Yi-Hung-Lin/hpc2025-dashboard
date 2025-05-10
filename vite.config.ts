import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hpc2025-dashboard/', // 🔁 這裡請改成你 GitHub 的 repo 名稱
})