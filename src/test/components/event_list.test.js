/**
 * @vitest-environment jsdom
 */

import mountComponent from '../../lib/test/mount_component.mjs';
import { test, expect } from 'vitest';
import sinon from 'sinon';
import moment from 'moment';
import flushPromises from 'flush-promises';

import EventListView from '../../components/public/event_list.vue';
import Event from '../../lib/model/event.mjs';

const event_list = sinon.stub(Event,'list');

test( 'empty list', async () => {

    event_list.returns(Promise.resolve([]))
    const wrapper = await mountComponent(EventListView,{});

    await flushPromises();
    expect(wrapper.findAll('div.event').length).toBe(0);
});

test( 'list with events', async () => {

    event_list.returns(Promise.resolve([
        new Event({ id: 2, start: moment(), end: moment().add(1,'hours') }),
        new Event({ id: 3, start: moment().add(1,'hours'), end: moment().add(2,'hours') })
    ]));
    const wrapper = await mountComponent(EventListView,{});
    await flushPromises();

    expect(wrapper.findAll('div.event').length).toBe(2);
});
