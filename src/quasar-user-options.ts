import './styles/quasar.scss';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import {
  Notify,
  LocalStorage,
  SessionStorage,
  Cookies,
} from 'quasar';

// To be used on app.use(Quasar, { ... })
export const quasarConfig = {
  config: {},
  plugins: {
    Notify,
    LocalStorage,
    SessionStorage,
    Cookies,
  },
};
