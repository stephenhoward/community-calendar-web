/**
 * @vitest-environment jsdom
 */

import { VueRouterMock, createRouterMock,  injectRouterMock } from 'vue-router-mock'
import flushPromises from 'flush-promises';
import { mount, config } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import Authentication from '../../lib/authentication.mjs';
import Config from '../../lib/config.mjs';
import sinon from 'sinon';

import LogoutView from '../../components/auth/logout.vue';

test( 'logout is automatic', async () => {

    await Config.init();

    const authentication = new Authentication(window.sessionStorage);
    const router = createRouterMock({
        spy: {
            create: fn => vi.fn(fn),
            reset: spy => spy.mockReset()
        }
    });

    injectRouterMock(router);
    config.plugins.VueWrapper.install(VueRouterMock);
    config.global.provide.authentication = authentication;

    sinon.stub(authentication,'logout');

    const wrapper = mount(LogoutView, {});
    const onBeforeMount = wrapper.vm.$options.beforeCreate;

    onBeforeMount.call(wrapper.vm);
    await flushPromises();

    expect( authentication.logout.called ).toBeTruthy();
    expect( router.replace.called ).toBeTruthy();
 });
