module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-useless-constructor': 'off',
    'no-useless-escape': 'off',
    'prettier/prettier': 'error',
    camelcase: 'off'
  }
}
