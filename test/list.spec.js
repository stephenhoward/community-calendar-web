import test from 'ava';
import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import list from '../app/vues/manage/list.vue';
import MockModel from './lib/mock/model.js';

const localVue = createLocalVue( Vue.extend({
    i18n: require('../app/lib/i18n').i18n
}) );

test( 'start new model', t => {

        const wrapper = initList();

        t.false( wrapper.vm.showNew );
        t.is( wrapper.vm.current_model, null );
        t.is( wrapper.vm.models.length, 0 );

        wrapper.vm.newModel();

        t.true( wrapper.vm.showNew );
       // t.true( wrapper.vm.current_model instanceOf Model );

        wrapper.vm.closeNew();

        t.false( wrapper.vm.showNew );
        t.is( wrapper.vm.current_model, null );
        t.is( wrapper.vm.models.length, 0 );
});

test( 'add created model', t => {

        const wrapper = initList();
        const model   = new MockModel();

        t.is( wrapper.vm.models.length, 0 );

        wrapper.vm.closeNew( model );

        t.is( wrapper.vm.models.length, 1 );
        t.true( model === wrapper.vm.models[0] );
});

function initList() {

    let composedList = Object.assign({ components: {
        'model-summary': {},
        'model-create':  {}
    }}, list );

    return shallowMount(composedList,{
        localVue,
        attachToDocument: true,
        propsData: {
            type: MockModel
        }
    });
}