<style lang="sass">

@import 'app/scss/_mixins.scss';

div.calendar {
    padding: 5px;
    @include hstack;
    flex-wrap: wrap;
    max-width: 300px;
    justify-content: flex-start;

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
        }
    }
}
</style>

<template>
    <div aria-role="lisbox" aria-labelledby="" class="calendar">
        <div class="header">
            <h4 v-if="current_month.isSame(today,'year')">{{ $d( month, 'month' ) }}</h4>
            <h4 v-else>{{ $d( month, 'month-year' ) }}</h4>
            <button type="button" class="prev" v-on:click="previousMonth">prev</button>
            <button type="button" class="next" v-on:click="nextMonth">next</button>
        </div>
        <div aria-role="option"
            class="day"
            :class="{
                today: day.isSame(today)                 ? true  : false,
                skip:  day.isSame(current_month,'month') ? false : true,
                selected: day.isSame(selected)           ? true  : false
            }"
            v-for="day in days"
        >{{ day.isSame(current_month,'month') ? day.date() : '' }}</div>
    </div>
</template>

<script>
    let moment = require('moment');

    module.exports = {
        props: [ 'selected_date' ],

        data: function() {

            let today = moment().startOf('day');

            return {
                selected: moment(this.selected_date,'YYYY-MM-DD'),
                today: today,
                current_month: null,
                month:         null,
                days:          [],
            };
        },
        created: function() {
            this.current_month = moment().startOf('month');
            this.buildMonth()
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
            }
        }
    };
</script>