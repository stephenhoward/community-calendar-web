/**
 * @vitest-environment jsdom
 */

import { VueRouterMock, createRouterMock,  injectRouterMock } from 'vue-router-mock'
import { mount, config } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import EventListView from '../../components/public/event_list.vue';
import Event from '../../lib/model/event.mjs';
import { createI18n } from 'vue-i18n'
import sinon from 'sinon';
import moment from 'moment';
import flushPromises from 'flush-promises';

const event_list = sinon.stub(Event,'list');

test( 'empty list', async () => {

    event_list.returns(Promise.resolve([]))
    const wrapper = initComponent({});

    await flushPromises();
    expect(wrapper.findAll('div.event').length).toBe(0);
});

test( 'list with events', async () => {

    event_list.returns(Promise.resolve([
        new Event({ id: 2, start: moment(), end: moment().add(1,'hours') }),
        new Event({ id: 3, start: moment().add(1,'hours'), end: moment().add(2,'hours') })
    ]));
    const wrapper = initComponent({});
    await flushPromises();

    expect(wrapper.findAll('div.event').length).toBe(2);
});

function initComponent(props) {

    const router = createRouterMock({
        spy: {
            create: fn => vi.fn(fn),
            reset: spy => spy.mockReset()
        }
    });
    injectRouterMock(router);
    config.plugins.VueWrapper.install(VueRouterMock);

    const i18n = createI18n({
        legacy: false,
        globalInjection: false,
        locale: 'en',
        fallbackLocale: 'en',
    });
    const wrapper = mount(EventListView,{
        props,
        global: {
            plugins: [ i18n ],
        }
    });

    return wrapper;
}