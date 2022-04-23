/**
 * @vitest-environment jsdom
 */

import { VueRouterMock, createRouterMock,  injectRouterMock } from 'vue-router-mock'
import flushPromises from 'flush-promises';
import { mount, config } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import { createI18n } from 'vue-i18n'
import sinon from 'sinon';

import Authentication from '../../lib/authentication.mjs';
import Config from '../../lib/config.mjs';
import LoginView from '../../components/auth/login.vue';


test( 'login works', async () => {

    const wrapper = await initTestApp(LoginView,{});
    sinon.stub(wrapper.authentication,'login');
    wrapper.authentication.login.returns(Promise.resolve());

    const login = wrapper.find('div.login button');
    await login.trigger('click');
    await flushPromises();

    expect( wrapper.authentication.login.calledOnce ).toBeTruthy();
    expect( wrapper.router.push ).toHaveBeenCalledWith('/manage');
    expect(() => wrapper.get('div.error')).toThrowError();

});

test( 'login fails', async () => {

    const wrapper = await initTestApp(LoginView,{});
    sinon.stub(wrapper.authentication,'login');
    wrapper.authentication.login.returns(Promise.reject({ response: { data: "Test Error"}}));

    const login = wrapper.find('div.login button');
    await login.trigger('click');
    await flushPromises();

    expect( wrapper.authentication.login.calledOnce ).toBeTruthy();
    expect( wrapper.router.push ).not.toHaveBeenCalled();
    expect( wrapper.get('div.error').text()).toBe('Test Error');

});


async function initTestApp(component,props) {

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
