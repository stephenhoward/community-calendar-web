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
            @media (prefers-color-scheme: dark) {
                background-color: rgba(34,34,34,.9);
            }
            h3 {
                width: auto;
                height: auto;
                border-radius: 0;
                background-color: transparent;
                margin: 0 0 15px 0;
            }
            form {
                display: block;
            }
        }
    }

</style>

<template>
    <footer v-bind:class="{ expanded: filterExpanded }">
        <h3 v-on:click="toggleFilters">Filter</h3>
        <form>
            <label>Start Date <button @click="loadCalendar('from')" type="button">{{ current_query.from }}</button></label>
            <label>End Date   <button @click="loadCalendar('to')" type="button">{{ current_query.to   }}</button></label>
            <label>Categories</label>
            <label>Age Range</label>
            <calendar v-if="showCalendar" :selected_date="calendarDate" @close="hideCalendar" ref="datepicker" ></calendar>
            <button type="button">Filter</button>
        </form>
    </footer>
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
                    today_title:  'Today',
                    week_title:   'This Week',
                    search_title: 'Search'
                },
                es: {
                    today_title:  'Hoy',
                    week_title:   'Esta Semana',
                    search_title: 'Búsqueda'
                }
            }
        },
        data : function() {

            return {
                current_query: current_query,
                title: '',
                now:   moment(),
                days:  [],
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
                    console.log( day );
                    current_query[ this.whichCalendarDate ] = day.format('YYYY-MM-DD');
                }
                this.showCalendar = false;
            }
        }
    };
</script>
