export default {
  server: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 8000
  },
  env: {
    PAMCHAIN_API:
      process.env.APP_PAMCHAIN_API || 'https://stgx-index.pamchain.com'
  },
  head: {
    title:
      'PAM Index | Multi token investment index and risk diversification made easy',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: ['~assets/styles/reset.scss', '~assets/styles/main.scss'],

  plugins: [
    { src: '~/plugins/base-components', ssr: true },
    { src: '~/plugins/ssr', ssr: true },
    { src: '~/plugins/apexcharts', ssr: false }
  ],

  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '~/modules/vue-ethereum.js'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['cookie-universal-nuxt'],

  vuetify: {
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        options: {
          customProperties: true
        },
        light: {
          primary: '#A5A5A5'
        },
        dark: {
          primary: '#47EACC',
          secondary: '#F9B43C',
          tertiary: '#F9693C',
          error: '#EA6447',
          success: '#47EA9C',
          background: '#393C3E',
          backgroundLight: '#4A4E51',
          accent: '#A5A7A8',
          mainDark: '#1D1F20',
          mainLight: '#4A4E51',
          grayLight: '#E4E7EA'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
