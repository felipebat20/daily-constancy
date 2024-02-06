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
    manifestOptions: {
      name: 'Daily Constancy',
      short_name: 'Daily Constancy',
      description: 'Aplicativo para manter sequências',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#093f6e',
      theme_color: '#093f6e',
      categories: ['tools', 'productivity', 'finance'],
      lang: 'en',
      icons: [
        {
          "src": "img/treker.png",
          "sizes": "any"
        },
      ]
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: { skipWaiting: true, clientsClaim: true },
  }
});
