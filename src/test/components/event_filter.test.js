/**
 * @vitest-environment jsdom
 */

import { VueRouterMock, createRouterMock,  injectRouterMock } from 'vue-router-mock'
import { mount, config } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import EventFilterView from '../../components/public/event_filter.vue';
import Event from '../../lib/model/event.mjs';
import { createI18n } from 'vue-i18n'
import sinon from 'sinon';
import moment from 'moment';
import flushPromises from 'flush-promises';

test( 'filter toggle', async () => {

    const wrapper = initComponent({ query: {} });

    await flushPromises();
    expect(wrapper.get('div[role=search] form').isVisible()).toBeFalsy();

    await wrapper.find('#filter-toggle').trigger('click');
    expect(wrapper.get('div[role=search] form').isVisible()).toBeTruthy();
});


test( 'basic search', async () => {

    const wrapper = initComponent({ query: { search_terms: "foo" } });

    await wrapper.find('#filter-results').trigger('click');
    await flushPromises();
    console.log(wrapper.router.push.calls[0]);
    expect(wrapper.router.push.calls[0][0]).toMatchObject({ path: 'events', query: {search: 'foo'}});
});

test( 'search with base url', async () => {

    const wrapper = initComponent({ query: { search_terms: "bar" }, base_query: { category: 43 } });

    await wrapper.find('#filter-results').trigger('click');
    await flushPromises();
    console.log(wrapper.router.push.calls[0]);
    expect(wrapper.router.push.calls[0][0]).toMatchObject({ path: '/', query: {search: 'bar'}});
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
    const wrapper = mount(EventFilterView,{
        props,
        global: {
            plugins: [ i18n ],
        }
    });

    return wrapper;
}