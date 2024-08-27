import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
