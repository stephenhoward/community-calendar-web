<style lang="sass">

@import 'app/scss/_mixins.scss';

div.calendar-wrapper {
    width: 100%;
    height: 100%;
    @include hstack;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
}
div.calendar {
    padding: 5px;
    @include hstack;
    flex-wrap: wrap;
    max-width: 300px;
    justify-content: flex-start;
    background: #fff;

    div.header {
        text-align: center;
        width: 100%;
        margin-bottom: 8px;
        @include hstack;
        h4 {
            @include flexible;
            order: 2;
        }
        button.prev {
            order: 1;
        }
        button.next {
            order: 3;
        }
    }
    div.day {
        width: 14%;
        box-sizing: border-box;
        height: 35px;
        padding: 4px;
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
            font-weight: 700;
            background-color: red;
            color: white;
        }
    }
}
</style>

<template>
<div class="calendar-wrapper">
    <div
        aria-role="lisbox"
        tabindex="0"
        aria-labelledby=""
        class="calendar"
        @keyup="navigateCalendar($event)"
    >
        <button tabindex="3" type="button" @click="$emit('close')">close</button>
        <div class="header">
            <h4 v-if="current_month.isSame(today,'year')">{{ $d( month, 'month' ) }}</h4>
            <h4 v-else>{{ $d( month, 'month-year' ) }}</h4>
            <button tabindex="1" type="button" class="prev" @click="previousMonth">prev</button>
            <button tabindex="2" type="button" class="next" @click="nextMonth">next</button>
        </div>
        <div aria-role="option"
            class="day"
            v-for="day in days"
            :class="{
                today: day.isSame(today)                 ? true  : false,
                skip:  day.isSame(current_month,'month') ? false : true,
                selected: day.isSame(selected)           ? true  : false
            }"
            @click="$emit('close',day)"
        >{{ day.isSame(current_month,'month') ? day.date() : '' }}</div>
    </div>
</div>
</template>

<script>
    let moment = require('moment');

    let calendar_is_active      = false;
    let cancel_window_scrolling = function(e) {
        // space and arrow keys
        if( calendar_is_active && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }
    window.addEventListener("keydown", cancel_window_scrolling, false );

    module.exports = {
        props: [ 'selected_date' ],

        data: function() {

            let today = moment().startOf('day');

            return {
                selected: this.selected_date,
                today: today,
                current_month: null,
                month:         null,
                days:          [],
            };
        },
        created: function() {
            this.current_month = moment(this.selected).startOf('month');
            this.buildMonth();
        },
        mounted: function() {
            this.$el.firstChild.focus();
            calendar_is_active = true;
        },
        beforeDestroy: function() {
            calendar_is_active = false;
        },
        methods: {
            buildMonth() {

                let current_day = moment(this.current_month).startOf('week');
                let last_day    = moment(this.current_month).endOf('month');
                let days        = [];

                while ( current_day.isSameOrBefore(last_day) ) {
                    days.push( moment(current_day) );
                    current_day.add(1,'days');
                }

                this.days  = days;
                this.month = this.current_month.toDate();
            },
            previousMonth: function() {
                this.current_month = moment(this.current_month).subtract(1,'months');
                this.buildMonth();
            },
            nextMonth: function() {
                this.current_month = moment(this.current_month).add(1,'months');
                this.buildMonth();
            },
            navigateCalendar($event) {
                switch( $event.key ) {
                    case 'Escape':
                        this.$emit('close');
                        break;
                    case 'ArrowUp':
                        this.selected.subtract(7,'days');
                        break;
                    case 'ArrowDown':
                        this.selected.add(7,'days');
                        break;
                    case 'ArrowLeft':
                        this.selected.subtract(1,'days');
                        break;
                    case 'ArrowRight':
                        this.selected.add(1,'days');
                        break;
                    case 'PageUp':
                        this.selected.subtract(1,'months');
                        break;
                    case 'PageDown':
                        this.selected.add(1,'months');
                        break;
                    case 'Home':
                        this.selected.startOf('week');
                        break;
                    case 'End':
                        this.selected.endOf('week');
                        break;
                    case 'Enter':
                        this.$emit('close',this.selected);
                        break;
                }
                if ( ! this.current_month.isSame( moment(this.selected).startOf('month') ) ) {
                    this.current_month = moment( this.selected ).startOf('month');
                }
                this.buildMonth();
            }
        }
    };
</script>
