import { createApp } from 'vue';

import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue';

import router from './router';
import { store, key } from './store';
import { Quasar } from 'quasar';
import { quasarConfig } from './quasar-user-options';

createApp(App).use(Quasar, quasarConfig)
  .use(router)
  .use(store, key)
  .mount('#app');
