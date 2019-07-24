import test from 'ava';
import Vue from 'vue';
import { createLocalVue, mount } from '@vue/test-utils';
import calendar from '../app/vues/components/calendar.vue';
import moment from 'moment';

const localVue = createLocalVue( Vue.extend({
    i18n: require('../app/lib/i18n').i18n
}) );

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

test( 'escape key', t => {

        const wrapper = initCalendar();

        wrapper.find('div.calendar').trigger('keyup', { key: 'Escape' } );
        t.true( 'close' in wrapper.emitted() );
        t.true( wrapper.emitted().close[0].length == 0 );
});

function initCalendar() {
    return mount(calendar,{
        localVue,
        attachToDocument: true,
        propsData: {
            selected_date: now
        }
    });
}

function keyTest(direction,date) {

    let new_date = cases[direction];

    test('calendar navigate ' + direction, t => {

        const wrapper = initCalendar();
        const cal     = wrapper.find('div.calendar');

        checkSelectedDay(t,wrapper,now);

        cal.trigger('keyup',{ key: direction });

        checkSelectedDay(t,wrapper,new_date);

        cal.trigger('keyup',{ key: 'Enter' });
        t.true( 'close' in wrapper.emitted() );
        t.true( new_date.isSame( wrapper.emitted().close[0][0] ) );

    });
}

function checkSelectedDay(t,wrapper,date) {

        t.true( date.isSame( wrapper.vm.selected ) );
        wrapper.vm.$nextTick().then(() => {

            t.is(wrapper.findAll('div.selected').length, 1 );
            t.is( wrapper.find('div.selected').text(), ''+date.date() );
        });

}
