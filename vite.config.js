import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const WP_PROXY_TARGET = 'https://app.ilolas.com'
const MEDIA_KIT_PROXY_TARGET = 'https://prod-base-api.ilolas.com'

function createProxyConfig(ssoSystemToken) {
  return {
    '/wp-json': {
      target: WP_PROXY_TARGET,
      changeOrigin: true,
      secure: true,
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          if (ssoSystemToken) {
            proxyReq.setHeader('sso-system-token', ssoSystemToken)
          }
        })
      },
    },
    '/base-api': {
      target: MEDIA_KIT_PROXY_TARGET,
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/base-api/, ''),
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_SSO_SYSTEM_TOKEN': JSON.stringify(env.SSO_SYSTEM_TOKEN ?? ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@network': path.resolve(__dirname, 'src/network'),
        '@validations': path.resolve(__dirname, 'src/validations'),
        '@store': path.resolve(__dirname, 'src/store'),
      },
    },
    server: {
      host: true,
      proxy: createProxyConfig(env.SSO_SYSTEM_TOKEN),
    },
    preview: {
      proxy: createProxyConfig(env.SSO_SYSTEM_TOKEN),
    },
  }
})
