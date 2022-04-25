import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vueI18n } from '@intlify/vite-plugin-vue-i18n';
import viteMockServer from 'vite-plugin-mock-server';

const mockServer = viteMockServer.default;

export default defineConfig({
  plugins: [
    vue(),
    vueI18n(),
    mockServer({
      logLevel: 'info',
      urlPrefixes: ['/v1'],
      mockRootDir: './src/test/data',
      mockJsSuffix: '.mock.cjs'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        outDir: "/var/www/html"
      }
    }
  }
})