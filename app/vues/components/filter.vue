<style lang="sass">

    @import 'app/scss/_mixins.scss';

    footer {
        @include hstack;
        justify-content: flex-end;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        #filter-toggle {
            height: 40px;
            width: 40px;
            font-size: 16pt;
            padding: 8px;
            color: #fff;
            border-radius: 21px;
            border: none;
            background-color: red;
            margin: 0 42px 42px 0;
            box-shadow: 3px 3px 5px rgba(0,0,0,.2);
            overflow: hidden;
            cursor: pointer;
        }
        form,h3 {
            display: none;
        }
        fieldset {
            border: none;
            padding: 0 0 0 10px;
            margin: 10px 0;
            legend {
                padding: 0;
                margin: 0 0 5px -10px;
            }
            label {
                font-size: 10pt;
                button {
                    font-size: 10pt;
                    border: 1px dashed $light-mode-border;
                    border-radius: 1px;
                    background: transparent;
                    color: $light-mode-text;
                    cursor: pointer;
                    @media (prefers-color-scheme: dark ) {
                        color: $dark-mode-text;
                        border-color: $dark-mode-border;

                    }
                }
            }
        }
        &.expanded {
            display: block;
            padding: 15px;
            background-color: rgba(255,255,255,.9);
            box-shadow: 0px -2px 5px rgba(0,0,0,.2);

            @media (prefers-color-scheme: dark) {
                background-color: rgba(34,34,34,.9);
            }
            div.filter-header {
                @include hstack;
                align-items: baseline;
                #filter-toggle {
                    font-size: 14pt;
                    @include inflexible;
                    background-color: transparent;
                    box-shadow: none;
                    margin: 0;
                    color: $light-mode-text;
                    @media (prefers-color-scheme: dark) {
                        color: $dark-mode-text;
                    }
                }
                h3 {
                    @include flexible;
                    margin: 0 0 15px 0;
                }
            }
            form,h3 {
                display: block;
            }
        }
        @media (min-width: 1024px ) {
            grid-area: body / filter / body-end / filter-end;
            position: static;
            display: block;
            form,h3 {
                display: block;
            }
            #filter-toggle {
                display: none;
            }
        }

    }

</style>

<template>
<div class="filter-component">
    <footer v-bind:class="{ expanded: filterExpanded }">
        <div class="filter-header">
            <h3>{{ $t('filter') }}</h3>
            <button type="button" :aria-label=" filterExpanded ? $t('close_button') : $t('filter_button')" @click="toggleFilters" id="filter-toggle" class="icofont-search-1"></button>
        </div>
        <form>
            <fieldset class="dates">
                <legend>{{ $t('date_range') }}:</legend>
                <label>{{ $t('from') }} <button @click="loadCalendar('from')" type="button">{{ $d( from, 'long' ) }}</button></label>
                <label>{{ $t('to')   }} <button @click="loadCalendar('to')" type="button">{{ $d( to, 'long' ) }}</button></label>
            </fieldset>
            <fieldset><legend>{{ $t('categories') }}</legend></fieldset>
            <fieldset><legend>{{ $t('ages') }}</legend></fieldset>
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
                    date_range: 'Date Range',
                    categories: 'Categories',
                    ages:       'Ages',
                    from:       'from',
                    to:         'to',
                    filter:     'filter events',
                    filter_button: 'filter events',
                    close_button: 'hide filters'
                },
                es: {
                    date_range: 'Dias',
                    categories: 'Las Categorías',
                    ages:       'Rango de edad',
                    from:       'de',
                    to:         'a',
                    filter:     'filtrar eventos',
                    filter_button: 'filtrar eventos',
                    close_button: 'ocultar filtros',
                }
            }
        },
        data : function() {

            return {
                now:   moment(),
                current_query: current_query,
                from: current_query.from.toDate(),
                to: current_query.to.toDate(),
                filterExpanded: false,
                showCalendar: false,
                calendarDate: moment()
            };
        },
        watch: {
            'current_query.from': function(newVal,oldVal) {
                this.from = newVal.toDate();
            },
            'current_query.to': function(newVal,oldVal) {
                this.to = newVal.toDate();
            },
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
