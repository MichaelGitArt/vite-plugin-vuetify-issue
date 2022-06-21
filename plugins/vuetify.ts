import { defineNuxtPlugin } from '#app';
import { createVuetify } from 'vuetify';

import '@/scss/main.scss'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({});
  nuxtApp.vueApp.use(vuetify);
});
