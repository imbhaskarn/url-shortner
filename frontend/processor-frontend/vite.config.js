import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'OrgPro CRM',
        short_name: 'OrgPro',
        description: 'Turn Leads to Gold.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/signin',
        icons: [
          { src: 'icons/logo-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/logo-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  server: {
    host: true
  },
  preview: {
     host: '0.0.0.0',
      port: 8080,
    allowedHosts: ['starfish-app-kt7a2.ondigitalocean.app']
  }
})
