import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createI18n } from 'vue-i18n'

import Config from './lib/config.mjs';
import Authentication from './lib/authentication.mjs';
import App from './components/app.vue';
import datetimeFormats from './lib/i18n.mjs';
import routes from './lib/routes.mjs';

Config.init().then( (config) => {

    const router = createRouter({
        history: createWebHistory(),
        routes
    });

    const i18n = createI18n({
        legacy: false,
        globalInjection: false,
        locale: navigator.language.substring(0,2) || config.settings().default_language,
        fallbackLocale: 'en',
        datetimeFormats,
    });

    const authentication = new Authentication(window.sessionStorage);

    const app = createApp(App);

    app.use(router);
    app.use(i18n);
    app.provide('i18n', i18n);
    app.provide('authentication',authentication);
    app.provide('site_config',config);
    app.mount('#app');

    if ( config.settings().needs_setup ) {
        console.log('needs setup');
        router.push({ name: 'setup' });
    }

});
