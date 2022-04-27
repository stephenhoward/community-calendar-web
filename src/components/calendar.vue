<style lang="scss">

@import '../../assets/css/mixins.scss';

div.calendar {
    @include hstack;
    flex-wrap:       wrap;
    justify-content: flex-start;
    max-width:       300px;
    padding:         5px;
    background:      #fff;
    box-shadow:      3px 3px 5px rgba(0,0,0,.5);

    @media (prefers-color-scheme: dark) {
        background-color: $dark-mode-background;
        color:            $dark-mode-text;
        button.nav {
            color: $dark-mode-text;
        }
    }

    button.nav {
        width:            30px;
        height:           30px;
        padding:          0;
        font-size:        16pt;
        text-align:       center;
        background-color: transparent;
        border:           none;
    }
    button.close {
        font-size: 12pt;
        border:    none;
    }
    div.header {
        @include hstack;
        align-items:   baseline;
        text-align:    center;
        width:         100%;
        margin-bottom: 8px;
        background:    #eee;

        @media (prefers-color-scheme: dark) {
            background: #555;
        }
        h4 {
            @include flexible;
            order:  2;
            margin: 0;
        }
        button.prev {
            order: 1;
        }
        button.next {
            order: 3;
        }
    }
    div.day {
        width:      14%;
        box-sizing: border-box;
        height:     35px;
        padding:    4px;
        text-align: right;
        border-radius: 5px;
        &.skip { }
        &.today {
            color: red;
            &.selected {
                color: white;
            }
        }
        &.selected {
            font-weight:      700;
            background-color: red;
            color:            white;
        }
    }
}
</style>

<template>
<div class="popup-wrapper" @click="emit('close')" ref="el">
    <div
        tabindex="-1"
        aria-labelledby=""
        class="calendar"
        @keyup="navigateCalendar($event)"
    >
        <div class="header" @click.stop="">
            <h4 v-if="state.current_month.isSame(state.today,'year')">{{ d( state.month, 'month' ) }}</h4>
            <h4 v-else>{{ d( state.month, 'month-year' ) }}</h4>
            <button :aria-label="t('previous_month')" tabindex="1" type="button" class="nav prev icofont-arrow-left" @click="previousMonth"></button>
            <button :aria-label="t('next_month')"     tabindex="2" type="button" class="nav next icofont-arrow-right" @click="nextMonth"></button>
        </div>
        <span class="sr-only" id="calendarInstructions">{{ t('calendar_instructions') }}</span>
        <div role="button"
            class="day"
            tabindex="-1"
            :aria-label="day.date() + ' ' + d( state.month, 'month' )"
            aria-describedby="calendarInstructions"
            v-for="day in state.days"
            :class="{
                today:    day.isSame(state.today)                 ? true  : false,
                skip:     day.isSame(state.current_month,'month') ? false : true,
                selected: day.isSame(state.selected)              ? true  : false
            }"
            :aria-selected="day.isSame(state.selected) ? 'true' : 'false'"
            @click.stop="emit('close',day)"
        >{{ day.isSame(state.current_month,'month') ? day.date() : '' }}</div>
    </div>
</div>
</template>

<i18n>
{
    en: {
        "next_month":     "next month (page down)",
        "previous_month": "previous month (page up)",
        "close_calendar": "close calendar (escape)",
        "calendar_instructions": "Use arrow keys to navigate, press enter to select date"
    },
    es: {
        "next_month":     "próximo mes (página abajo)",
        "previous_month": "mes anterior (página arriba)",
        "close_calendar": "cerrar calendario (escapar)"
    }
}
</i18n>

<script setup>
    import moment from 'moment';
    import { ref, reactive, onBeforeMount, onMounted, onUnmounted, nextTick } from 'vue';
    import { useI18n } from 'vue-i18n';
    import datetimeFormats from '../lib/i18n.mjs';

    const el    = ref(null);
    const props = defineProps(['selectedDate']);
    const emit  = defineEmits(['close','currentDate']);
    const { t, d } = useI18n({ datetimeFormats });

    const state = reactive({
        selected:      moment(props.selectedDate),
        today:         moment().startOf('day'),
        current_month: moment(props.selectedDate).startOf('month'),
        month:         moment(props.selectedDate).toDate(),
        days:          [],
        is_active:     false,
    });

    const cancel_window_scrolling = function(e) {
        // space and arrow keys
        if( state.is_active && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    };

    onBeforeMount(()  => {
        state.current_month = moment(state.selected).startOf('month');
        state.month         = moment(state.selected).toDate();
        buildMonth();
    });

    onMounted(()  => {
        state.is_active = true;
        window.addEventListener("keydown", cancel_window_scrolling );

        el.value.firstChild.focus();        
    });

    onUnmounted(() => {
        state.is_active = false;
        window.removeEventListener("keydown", cancel_window_scrolling );
    });


    function buildMonth() {

        let current_day = moment(state.current_month).startOf('week');
        let last_day    = moment(state.current_month).endOf('month');
        let days        = [];

        while ( current_day.isSameOrBefore(last_day) ) {
            days.push( moment(current_day) );
            current_day.add(1,'days');
        }

        state.days  = days;
        state.month = state.current_month.toDate();
        nextTick().then(() => {
            let selectedDay = el.value.getElementsByClassName('selected')[0];
            if ( selectedDay ) {
                selectedDay.focus();
            }
        });

    }

    function previousMonth() {
        state.current_month = moment(state.current_month).subtract(1,'months');
        state.selected      = moment(state.current_month).startOf('month');
        buildMonth();
    }

    function nextMonth() {
        state.current_month = moment(state.current_month).add(1,'months');
        state.selected      = moment(state.current_month).startOf('month');
        buildMonth();
    }

    function navigateCalendar(event) {
        switch( event.key ) {
            case 'Escape':
                emit('close');
                break;
            case 'ArrowUp':
                state.selected.subtract(7,'days');
                break;
            case 'ArrowDown':
                state.selected.add(7,'days');
                break;
            case 'ArrowLeft':
                state.selected.subtract(1,'days');
                break;
            case 'ArrowRight':
                state.selected.add(1,'days');
                break;
            case 'PageUp':
                state.selected.subtract(1,'months');
                break;
            case 'PageDown':
                state.selected.add(1,'months');
                break;
            case 'Home':
                state.selected.startOf('week');
                break;
            case 'End':
                state.selected.endOf('week');
                break;
            case 'Enter':
                emit('close',state.selected);
                break;
        }
        if ( ! state.current_month.isSame( moment(state.selected).startOf('month') ) ) {
            state.current_month = moment( state.selected ).startOf('month');
        }
        buildMonth();
    }

    function getCurrentDate() {
        return state.selected;
    }

</script>
