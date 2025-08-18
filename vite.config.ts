import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact()],
 test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/import" as *;`,
      },
    },
  },
})