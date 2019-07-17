import test from 'ava';
import { mount } from '@vue/test-utils';
import calendar from '../app/vues/components/calendar.vue';

test('calendar', t => {
    const wrapper = mount(calendar);

    t.true( wrapper );
});