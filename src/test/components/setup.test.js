/**
 * @vitest-environment jsdom
 */

import { test, expect } from 'vitest';
import flushPromises from 'flush-promises';
import sinon from 'sinon';

import Config from '../../lib/config.mjs';
import mountComponent from '../../lib/test/mount_component.mjs';
import SetupView from '../../components/auth/setup.vue';


test( 'set fields', async () => {

    const config = await Config.init();
    Config._languages = {
        'en': {name:"English"},
        'es': {name:'Español'},
        'fr': {name:'Français'}
    };

    const wrapper = await mountComponent(SetupView,{});

    expect( wrapper.findAll('#set-language').length ).toBe(1);
    expect( wrapper.findAll('#set-email').length ).toBe(0);
    expect( wrapper.findAll('#set-password').length ).toBe(0);

    await wrapper.find('#set-language button').trigger('click');
    expect( wrapper.findAll('#set-language').length ).toBe(1);
    expect( wrapper.findAll('#set-email').length ).toBe(0);
    expect( wrapper.findAll('#set-password').length ).toBe(0);

    await wrapper.find('#set-language select').findAll('option').at(1).setSelected();
    await wrapper.find('#set-language button').trigger('click');
    expect( wrapper.findAll('#set-language').length ).toBe(0);
    expect( wrapper.findAll('#set-email').length ).toBe(1);
    expect( wrapper.findAll('#set-password').length ).toBe(0);

    await wrapper.find('#set-email input').setValue('test@email.com');
    await wrapper.find('#set-email button').trigger('click');
    expect( wrapper.findAll('#set-language').length ).toBe(0);
    expect( wrapper.findAll('#set-email').length ).toBe(0);
    expect( wrapper.findAll('#set-password').length ).toBe(1);

});
