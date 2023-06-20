export default defineNuxtConfig({
  css: [
    '~/assets/global.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  target:'static',
  plugins: [
  ]
})
