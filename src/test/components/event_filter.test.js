/**
 * @vitest-environment jsdom
 */

import mountComponent from '../../lib/test/mount_component.mjs';
import { test, expect } from 'vitest';
import sinon from 'sinon';
import flushPromises from 'flush-promises';

import EventFilterView from '../../components/public/event_filter.vue';
import Event from '../../lib/model/event.mjs';
import { Model } from '../../lib/model.mjs';

const model_list = sinon.stub(Model,'fetch');
model_list.returns(Promise.resolve([]));

test( 'filter toggle', async () => {

    const wrapper = await mountComponent(EventFilterView,{ query: {} });

    await flushPromises();
    expect(wrapper.get('div[role=search] form').isVisible()).toBeFalsy();

    await wrapper.find('#filter-toggle').trigger('click');
    expect(wrapper.get('div[role=search] form').isVisible()).toBeTruthy();
});


test( 'basic search', async () => {

    const wrapper = await mountComponent(EventFilterView,{ query: { search_terms: "foo" } });

    await wrapper.find('#filter-results').trigger('click');
    await flushPromises();
    expect(wrapper.router.push.called).toBeTruthy();
    expect(wrapper.router.push.calls[0][0]).toMatchObject({ path: 'events', query: {search: 'foo'}});
});

test( 'search with base url', async () => {

    const wrapper = await mountComponent(EventFilterView,{ query: { search_terms: "bar" }, baseQuery: { category: 43 } });

    await wrapper.find('#filter-results').trigger('click');
    await flushPromises();
    expect(wrapper.router.push.called).toBeTruthy();
    expect(wrapper.router.push.calls[0][0]).toMatchObject({ path: '/', query: {search: 'bar'}});
});
