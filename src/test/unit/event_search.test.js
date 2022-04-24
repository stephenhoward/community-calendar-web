import { test, expect } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';
import moment from 'moment';
import EventSearch from '../../lib/event_search.mjs';
import Event from '../../lib/model/event.mjs';

const event_list = sinon.stub(Event,"list");

test('constructor', () => {
    const search = new EventSearch();

    expect(search.base_query).toEqual({});
    expect(search.events).toEqual([]);
});

test ('constructor with base query', () => {
    const search = new EventSearch({ category: "Sports" });

    expect(search.base_query).toEqual({ category: "Sports"});
    expect(search.events).toEqual([]);
});

test('default search', async () => {

    const search = new EventSearch();

    event_list.returns(Promise.resolve([]));

    const default_date = moment().startOf('day');

    const results = await search.search({});

    expect( search.current_query ).toEqual( {});
    expect( event_list.lastCall.args ).toEqual([{}]);
});

test('search with query', async () => {

    const search = new EventSearch();

    event_list.returns(Promise.resolve([ new Event({ id: 42 }) ]));

    const start = moment().add(1,'days');
    const end = moment().add(3,'days');

    const results = search.search({ from: start, to: end, "category": "Music" });

    expect( search.current_query ).toEqual( { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD'), "category": "Music" });
    expect( event_list.lastCall.args ).toEqual([{ from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD'), "category":"Music" }]);
});

test('search with base query', async () => {

    const search = new EventSearch({ "category": "Movies" });

    event_list.returns(Promise.resolve([ new Event({ id: 42 }) ]));

    const start = moment().add(1,'days');
    const end = moment().add(3,'days');

    const results = search.search({ from: start, to: end, "category":"Theater" });

    expect( search.current_query ).toEqual( { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD'), "category": "Movies" });
    expect( event_list.lastCall.args ).toEqual([{ from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD'), "category": "Movies" }]);
});


test('eventsByDate', () => {

    const search = new EventSearch();

    search.events = [
        new Event({ id: 1, start: moment() }),
        new Event({ id: 2, start: moment().add(1,'days') }),
        new Event({ id: 3, start: moment().add(1,'days') }),
        new Event({ id: 4, start: moment().add(2,'days') }),
        new Event({ id: 5, start: moment().add(4,'days') }),
    ];

    const sorted_days = search.eventsByDate();

    expect( Object.keys(sorted_days).length ).toBe(4);
    expect( sorted_days[search.events[0].start.format('YYYY-MM-DD')].events.length ).toBe(1);
    expect( sorted_days[search.events[1].start.format('YYYY-MM-DD')].events.length ).toBe(2);
    expect( sorted_days[search.events[3].start.format('YYYY-MM-DD')].events.length ).toBe(1);
    expect( sorted_days[search.events[4].start.format('YYYY-MM-DD')].events.length ).toBe(1);
});
