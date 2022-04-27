/**
 * @vitest-environment jsdom
 */

import mountComponent from '../../lib/test/mount_component.mjs';
import flushPromises from 'flush-promises';
import { test, expect } from 'vitest';
import sinon from 'sinon';

import LoginView from '../../components/auth/login.vue';


test( 'login works', async () => {

    const wrapper = await mountComponent(LoginView,{});
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

    const wrapper = await mountComponent(LoginView,{});
    sinon.stub(wrapper.authentication,'login');
    wrapper.authentication.login.returns(Promise.reject({ response: { data: "Test Error"}}));

    const login = wrapper.find('div.login button');
    await login.trigger('click');
    await flushPromises();

    expect( wrapper.authentication.login.calledOnce ).toBeTruthy();
    expect( wrapper.router.push ).not.toHaveBeenCalled();
    expect( wrapper.get('div.error').text()).toBe('Test Error');

});