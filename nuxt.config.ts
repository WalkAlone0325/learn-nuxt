// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  experimental: {
    cookieStore: true
  },
  devtools: { enabled: true },
  vite: {
    // server: {
    //   proxy: {
    //     '/dev-api': {
    //       target: 'https://tt.sxnmggz.com:9446/specialposttest/dev-api',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/dev-api/, '')
    //     }
    //   }
    // }
  }
})
