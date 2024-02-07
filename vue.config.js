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
          "src": "img/icons/android-launchericon-512-512.png",
          "sizes": "512x512"
        },
        {
          "src": "img/icons/android-launchericon-192-192.png",
          "sizes": "192x192"
        },
        {
          "src": "img/icons/android-launchericon-144-144.png",
          "sizes": "144x144"
        },
        {
          "src": "img/icons/android-launchericon-96-96.png",
          "sizes": "96x96"
        },
        {
          "src": "img/icons/android-launchericon-72-72.png",
          "sizes": "72x72"
        },
        {
          "src": "img/icons/android-launchericon-48-48.png",
          "sizes": "48x48"
        },
      ]
    },
    iconPaths: {
      faviconSVG: 'img/icons/android-launchericon-48-48.png',
      favicon32: 'img/icons/android-launchericon-48-48.png',
      favicon16: 'img/icons/android-launchericon-48-48.png',
      appleTouchIcon: 'img/icons/android-launchericon-144-144.png',
      maskIcon: 'img/icons/android-launchericon-48-48.png',
      msTileImage: 'img/icons/android-launchericon-144-144.png'
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: { skipWaiting: true, clientsClaim: true },
  }
});
