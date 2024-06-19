import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/amadeus-api': {
        target: 'https://test.api.amadeus.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/amadeus-api/, '')
      },
    }
  }
})
