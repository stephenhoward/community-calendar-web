<style lang="sass">

    @import 'app/scss/_mixins.scss';

    footer {
        @include hstack;
        justify-content: flex-end;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        h3 {
            height: 40px;
            width: 40px;
            border-radius: 21px;
            background-color: red;
            margin: 0 42px 42px 0;
            box-shadow: 3px 3px 5px rgba(0,0,0,.2);
            overflow: hidden;
            cursor: pointer;
        }
        form {
            display: none;
        }
        &.expanded {
            display: block;
            padding: 15px;
            background-color: rgba(255,255,255,.9);
            box-shadow: 0px -2px 5px rgba(0,0,0,.2);

            @media (prefers-color-scheme: dark) {
                background-color: rgba(34,34,34,.9);
            }
            h3 {
                width: auto;
                height: auto;
                border-radius: 0;
                background-color: transparent;
                margin: 0 0 15px 0;
                box-shadow: none;
            }
            form {
                display: block;
            }
        }
    }

</style>

<template>
<div class="filter-component">
    <footer v-bind:class="{ expanded: filterExpanded }">
        <h3 v-on:click="toggleFilters">{{ $t('filter') }}</h3>
        <form>
            <fieldset>
                <legend>{{ $t('date_range') }}:</legend>
                <label>{{ $t('from') }} <button @click="loadCalendar('from')" type="button">{{ $d( from, 'long' ) }}</button></label>
                <label>{{ $t('to')   }} <button @click="loadCalendar('to')" type="button">{{ $d( to, 'long' ) }}</button></label>
            </fieldset>
            <label>Categories</label>
            <label>Age Range</label>
            <button type="button">{{ $t('filter') }}</button>
        </form>
    </footer>
    <calendar v-if="showCalendar" :selected_date="calendarDate" @close="hideCalendar" ref="datepicker" ></calendar>
</div>
</template>

<script>
    let moment = require('moment');
    let current_query = require('lib/search').current_query;
    let calendar = require('./calendar.vue');

    module.exports = {
        components: {
            calendar
        },
        i18n: {
            messages: {
                en: {
                    date_range: 'date range',
                    from:       'from',
                    to:         'to',
                    filter:     'filter'
                },
                es: {
                    date_range: 'dias',
                    from:       'de',
                    to:         'a',
                    filter:     'filtrar'
                }
            }
        },
        data : function() {

            return {
                now:   moment(),
                from: moment().toDate(),
                to: moment().toDate(),
                filterExpanded: false,
                showCalendar: false,
                calendarDate: moment()
            };
        },
        methods: {

            toggleFilters: function() {
                this.filterExpanded = ! this.filterExpanded;
            },
            loadCalendar: function(which) {
                this.whichCalendarDate = which;
                this.calendarDate = current_query[which];
                this.showCalendar = true;
            },
            hideCalendar: function(day) {
                if ( day ) {
                    current_query[ this.whichCalendarDate ] = day;
                    this[ this.whichCalendarDate ] = day.toDate();
                }
                this.showCalendar = false;
            }
        }
    };
</script>
