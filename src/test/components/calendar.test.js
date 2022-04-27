/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import { createI18n } from 'vue-i18n'
import moment from 'moment';
import calendar from '../../components/calendar.vue';
import datetimeFormats from '../../lib/i18n.mjs';


const now   = moment().startOf('day');
const cases = {
    'ArrowLeft':  moment(now).subtract(1,'days'),
    'ArrowRight': moment(now).add(1,'days'),
    'ArrowUp':    moment(now).subtract(7,'days'),
    'ArrowDown':  moment(now).add(7,'days'),
    'PageUp':     moment(now).subtract(1,'months'),
    'PageDown':   moment(now).add(1,'months')
};

for( var direction in cases ) {

    keyTest(direction, cases[direction] );
}

test( 'escape key', () => {

    const wrapper = initCalendar();
    const cal     = wrapper.find('div.calendar');

    cal.trigger('keyup', { key: 'Escape' } );
    expect( 'close' in wrapper.emitted() ).toBe(true);
    expect( wrapper.emitted() ).toHaveProperty('close');
});

function initCalendar() {

    const i18n = createI18n({
        legacy: false,
        globalInjection: false,
        locale: 'en',
        fallbackLocale: 'en',
    });

    const app = mount(calendar,{
        props: {
            selectedDate: now
        },
        global: {
            plugins: [ i18n ],
        }
    });
    return app;
}

function keyTest(direction,date) {

    let new_date = cases[direction];

    test('calendar navigate ' + direction, async () => {

        const wrapper = initCalendar();
        const cal     = wrapper.find('div.calendar');

        await checkSelectedDay(wrapper,now);

        cal.trigger('keyup',{ key: direction });

        await checkSelectedDay(wrapper,new_date);

        cal.trigger('keyup',{ key: 'Enter' });

        expect( wrapper.emitted() ).toHaveProperty('close');
        expect( new_date.isSame( wrapper.emitted().close[0][0] ) ).toBe(true);

    });
}

async function checkSelectedDay(wrapper,date) {

        const currentDate = await wrapper.vm.getCurrentDate();

        expect( date.isSame( currentDate ) ).toBe(true);

        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('div.selected').length ).toBe(1);
        expect( wrapper.find('div.selected').text() ).toBe(''+date.date());

}
