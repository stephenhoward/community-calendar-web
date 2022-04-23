/**
 * @vitest-environment jsdom
 */

import { VueRouterMock, createRouterMock,  injectRouterMock } from 'vue-router-mock'
import flushPromises from 'flush-promises';
import { mount, config } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import { createI18n } from 'vue-i18n'
import Authentication from '../../lib/authentication.mjs';
import Config from '../../lib/config.mjs';
import sinon from 'sinon';

import PasswordForgotView from '../../components/auth/password_forgot.vue';


test( 'reset_password works', async () => {

    await Config.init();

    const test_email = 'example@example.com';
    const wrapper = await initTestApp(PasswordForgotView,{ em: test_email });
    sinon.stub(wrapper.authentication,'reset_password');
    wrapper.authentication.reset_password.returns(Promise.resolve());

    const button = wrapper.find('div.forgot_password button');
    await button.trigger('click');
    await flushPromises();

    expect( wrapper.get('input[type=email]').element.value).toBe(test_email);
    expect( wrapper.authentication.reset_password.calledOnce ).toBeTruthy();
    expect( wrapper.router.push.calls[0][0] ).toEqual({ name:'reset_password', params: { email: test_email }});
    expect(() => wrapper.get('div.error')).toThrowError();

});

test( 'reset_password no email', async () => {

    await Config.init();

    const wrapper = await initTestApp(PasswordForgotView,{});
    sinon.stub(wrapper.authentication,'reset_password');
    wrapper.authentication.reset_password.returns(Promise.reject("no_email_provided"));

    const button = wrapper.find('div.forgot_password button');

    await button.trigger('click');
    await flushPromises();

    expect( wrapper.authentication.reset_password.called ).toBeTruthy();
    expect( wrapper.router.push.called ).toBeFalsy();
    expect( wrapper.get('input[type=email]').element.value).toBe('');
    expect( wrapper.get('div.error').text()).toBe('Please enter your email address');

});

test( 'reset_password fails', async () => {

    await Config.init();

    const test_email = 'example@example.com';
    const wrapper = await initTestApp(PasswordForgotView,{ em: test_email });
    sinon.stub(wrapper.authentication,'reset_password');
    wrapper.authentication.reset_password.returns(Promise.reject({ response: { data: "Test Error"}}));

    const button = wrapper.find('div.forgot_password button');
    await button.trigger('click');
    await flushPromises();

    expect( wrapper.authentication.reset_password.calledOnce ).toBeTruthy();
    expect( wrapper.router.push.called ).toBeFalsy();
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
