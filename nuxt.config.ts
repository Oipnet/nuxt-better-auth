// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  i18n: {
    customRoutes: 'config',
    lazy: true,
    langDir: './locales/',
    locales: [
      {
        code: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
      {
        code: 'en-US',
        name: 'English',
        file: 'en-US.json',
      },
    ],
    defaultLocale: 'fr-FR',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
    pages: {
      'sign-in': {
        'fr-FR': '/connexion',
        'en-US': '/sign-in',
      },
      'sign-up': {
        'fr-FR': '/inscription',
        'en-US': '/sign-up',
      },
      dashboard: {
        'fr-FR': '/tableau-de-bord',
        'en-US': '/dashboard',
      },
    },
  },
});
