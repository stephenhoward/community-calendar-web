/**
 * @vitest-environment jsdom
 */

import mountComponent from '../../lib/test/mount_component.mjs';
import flushPromises from 'flush-promises';
import { test, expect } from 'vitest';
import sinon from 'sinon';

import Authentication from '../../lib/authentication.mjs';
import Config from '../../lib/config.mjs';

import PasswordResetView from '../../components/auth/password_reset.vue';


test( 'submit reset code works', async () => {

    await Config.init();
    const wrapper = await mountComponent(PasswordResetView,{ email: "test@email.com" });

    await do_reset_code(true,wrapper,"testcode");

    expect( wrapper.authentication.check_password_reset_token.calledOnce ).toBeTruthy();
    expect(() => wrapper.get('div.error')).toThrowError();
    expect(wrapper.findAll('input[type=password]').length).toBe(2);

});

test( 'submit empty reset code fails', async () => {

    await Config.init();
    const wrapper = await mountComponent(PasswordResetView,{ email: "test@email.com" });

    await do_reset_code(false,wrapper,"");

    expect( wrapper.authentication.check_password_reset_token.calledOnce ).toBeTruthy();
    expect( wrapper.router.push.called ).toBeFalsy();
    expect( wrapper.get('div.error').text()).toBe('invalid or expired token');
    expect(wrapper.findAll('input[type=password]').length).toBe(0);

});

test( 'submit new password works', async () => {

    await Config.init();

    const wrapper = await mountComponent(PasswordResetView,{ email: "test@email.com" });
 
    await do_reset_code(true,wrapper,"testcode");
    await do_password_reset(true,wrapper,"newpassword","newpassword");
 
    expect( wrapper.authentication.use_password_reset_token.calledOnce ).toBeTruthy();
    expect( wrapper.router.push.callCount ).toBe(1);
    expect(() => wrapper.get('div.error')).toThrowError();

});

test( 'submit reset code without password fails', async () => {

    await Config.init();

    const wrapper = await mountComponent(PasswordResetView,{ email: "test@email.com" });
 
    await do_reset_code(true,wrapper,"testcode");
    await do_password_reset(true,wrapper,"","");
 
    expect( wrapper.authentication.use_password_reset_token.called ).toBeFalsy();
    expect( wrapper.router.push.called ).toBeFalsy();
    expect(wrapper.get('div.error').text()).toBe("please enter a password");

});


test( 'submit reset code handle lower level error', async () => {

    await Config.init();

    const wrapper = await mountComponent(PasswordResetView,{ email: "test@email.com" });
 
    await do_reset_code(true,wrapper,"testcode");
    await do_password_reset(false,wrapper,"password","password");
 
    expect( wrapper.authentication.use_password_reset_token.called ).toBeTruthy();
    expect( wrapper.router.push.called ).toBeFalsy();
    expect(wrapper.get('div.error').text()).toBe("Test Error");

});

async function do_reset_code(succeed,wrapper,test_code) {

    sinon.stub(wrapper.authentication,'check_password_reset_token');

    if ( succeed ) {
        wrapper.authentication.check_password_reset_token.returns(Promise.resolve());
    }
    else {
        wrapper.authentication.check_password_reset_token.returns(Promise.reject());
    }

    wrapper.get('input').setValue(test_code);
    const button = wrapper.find('div.password_reset button');
    await button.trigger('click');
    await flushPromises();
}

async function do_password_reset(succeed,wrapper,password1,password2) {

    sinon.stub(wrapper.authentication,'use_password_reset_token');
    if ( succeed ) {
        wrapper.authentication.use_password_reset_token.returns(Promise.resolve());
    }
    else {
        wrapper.authentication.use_password_reset_token.returns(Promise.reject("Test Error"));
    }

    const password_fields = wrapper.findAll('div.password_reset input[type=password]');

    password_fields[0].setValue(password1);
    password_fields[1].setValue(password2);

    const button = wrapper.find('div.password_reset button');
    await button.trigger('click');
    await flushPromises();
}
