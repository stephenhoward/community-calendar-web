/**
 * @vitest-environment jsdom
 */

import mountComponent from '../../lib/test/mount_component.mjs';
import flushPromises from 'flush-promises';
import { test, expect } from 'vitest';
import sinon from 'sinon';

import PasswordForgotView from '../../components/auth/password_forgot.vue';


test( 'reset_password works', async () => {

    const test_email = 'example@example.com';
    const wrapper = await mountComponent(PasswordForgotView,{ em: test_email });
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

    const wrapper = await mountComponent(PasswordForgotView,{});
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

    const test_email = 'example@example.com';
    const wrapper = await mountComponent(PasswordForgotView,{ em: test_email });
    sinon.stub(wrapper.authentication,'reset_password');
    wrapper.authentication.reset_password.returns(Promise.reject({ response: { data: "Test Error"}}));

    const button = wrapper.find('div.forgot_password button');
    await button.trigger('click');
    await flushPromises();

    expect( wrapper.authentication.reset_password.calledOnce ).toBeTruthy();
    expect( wrapper.router.push.called ).toBeFalsy();
    expect( wrapper.get('div.error').text()).toBe('Test Error');

});
