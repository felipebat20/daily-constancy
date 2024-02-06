const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  pwa: {
    name: 'Daily Constancy',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      name: 'Quasar Notes',
      short_name: 'Quasar Notes',
      description: 'Aplicativo de anotações feito com Quasar Framework',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#093f6e',
      theme_color: '#093f6e',
      categories: ['tools', 'productivity', 'finance'],
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      faviconSVG: 'img/icons/favicon.svg',
      favicon32: 'img/icons/treker.png',
      favicon16: 'img/icons/treker.png',
      appleTouchIcon: 'img/icons/treker.png',
      maskIcon: 'img/icons/treker.svg',
      msTileImage: 'img/icons/treker.png'
    },

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: { skipWaiting: true, clientsClaim: true },
  }
});
