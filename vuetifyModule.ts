import { defineNuxtModule } from '@nuxt/kit';
import vuetify from 'vite-plugin-vuetify';
import type { UserConfig } from 'vite';

export default defineNuxtModule({
  async setup(_, nuxt) {
    nuxt.options.build.transpile.push('vuetify');

    nuxt.hook('vite:extendConfig', (config: UserConfig) => {
      config.plugins = [
        ...(config.plugins || []),
        vuetify({
          styles: 'expose',
        }),
      ];

      config.define = {
        ...(config.define || {}),
        'process.env.DEBUG': 'false',
      };

      // ERROR  Cannot start nuxt:  Vuetify plugin must be loaded after the vue plugin
      const vuePluginIndex = config.plugins.findIndex(
        (p: any) => p.name === 'vite:vue'
      );
      if (vuePluginIndex !== -1) {
        const vuePlugin = config.plugins.splice(vuePluginIndex, 1)[0];
        config.plugins.unshift(vuePlugin);
      }
    });
  },
});
