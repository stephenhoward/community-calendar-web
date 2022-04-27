import { VueRouterMock, createRouterMock,  injectRouterMock } from 'vue-router-mock'
import { mount, config } from '@vue/test-utils';
import { vi } from 'vitest';
import { createI18n } from 'vue-i18n'
import datetimeFormats from '../../lib/i18n.mjs';
import Config from '../../lib/config.mjs';
import Authentication from '../../lib/authentication.mjs';


export default async function mountComponent(component,props) {

    const router = createRouterMock({
        spy: {
            create: fn => vi.fn(fn),
            reset: spy => spy.mockReset()
        }
    });
    injectRouterMock(router);
    config.plugins.VueWrapper.install(VueRouterMock);

    const site_config = await Config.init();

    const authentication = new Authentication(window.sessionStorage);
    config.global.provide.authentication = authentication;

    config.global.provide.site_config = site_config;

    const i18n = createI18n({
        legacy: false,
        globalInjection: false,
        locale: 'en',
        fallbackLocale: 'en',
        datetimeFormats
    });

    const app = mount(component,{
        props,
        global: {
            plugins: [ i18n ],
        }
    });
    app.authentication = authentication;

    return app;
}
