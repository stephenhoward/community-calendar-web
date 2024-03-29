import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vueI18n } from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
  plugins: [
    vue(),
    vueI18n(),
  ],
  build: {
    rollupOptions: {
      output: {
        outDir: "/var/www/html"
      }
    }
  }
})