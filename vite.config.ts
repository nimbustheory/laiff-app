import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['mapbox-gl'],
  },
  build: {
    commonjsOptions: {
      include: [/mapbox-gl/, /node_modules/],
    },
  },
})
