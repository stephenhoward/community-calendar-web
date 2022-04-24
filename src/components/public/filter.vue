<style lang="scss">

    @import '../../../assets/css/mixins.scss';

    div.filter-component > div {
        @include hstack;
        justify-content: flex-end;
        width: 100%;
        #filter-toggle {
            height: 40px;
            width: 40px;
            font-size: 16pt;
            padding: 8px;
            color: $light-mode-text;
            border: none;
            background: transparent;
            margin: 0 42px 42px 0;
            overflow: hidden;
            cursor: pointer;
            @media (prefers-color-scheme: dark) {
                color: $dark-mode-text;
            }
        }
        form,h3 {
            display: none;
        }
        input.search {
            @include flexible;
            font-size: 12pt;
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
                    margin: 0;
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
    }

</style>

<template>
<div class="filter-component">
    <div role="search" v-bind:class="{ expanded: state.filterExpanded }">
        <div class="filter-header">
            <h3 id="filters" tabindex="-1">{{ t('filter') }}</h3>
            <searchBox
                :query="state.search_terms"
                @search="doFilter"
                @update-search="updateSearch"
            />
            <button type="button"
                id="filter-toggle"
                :class="state.filterExpanded ? 'icofont-close' : 'icofont-settings' "
                :aria-label=" state.filterExpanded ? t('close_button') : t('filter_button')"
                @click="toggleFilters"
            ></button>
        </div>
        <form>
            <fieldset class="dates" aria-labelledby="dates-legend">
                <legend id="dates-legend">{{ t('date_range') }}:</legend>
                <label>
                    <span class="aria-hidden">{{ t('from') }}</span>
                    <button
                        ref="from"
                        :aria-label="fromLabel"
                        aria-describedby="dateButtonInstructions"
                        @click="loadCalendar('from')"
                        type="button"
                    >
                        {{ d( state.from.toDate(), 'long' ) }}
                    </button>
                </label>
                <label>
                    <span class="aria-hidden">{{ t('to')   }}</span>
                    <button
                        ref="to"
                        :aria-label="t('aria_date_end') + d( state.to.toDate(), 'long')"
                        aria-describedby="dateButtonInstructions"
                        @click="loadCalendar('to')"
                        type="button"
                    >
                        {{  d( state.to.toDate(), 'long' ) }}
                    </button>
                </label>
                <span aria-hidden="true" class="sr-only" id="dateButtonInstructions">{{ t('aria_click_to_change') }}</span>
            </fieldset>
            <fieldset v-if="!props.base_query || (props.base_query && ! props.base_query.category)"><legend>{{ t('categories') }}</legend>
                <label v-for="category in state.categories">
                    <input v-model="category.selected" type="checkbox" name="category" /> {{ mt(category,'name') }}
                </label>
            </fieldset>
            <fieldset><legend>{{ t('ages') }}</legend></fieldset>
            <button type="button" @click="doFilter">{{ t('filter') }}</button>
        </form>
    </div>
    <calendar v-if="state.showCalendar" :selected-date="state.calendarDate" @close="hideCalendar" ref="datepicker" ></calendar>
</div>
</template>


<i18n>
{
    en: {
        date_range: 'Date Range',
        categories: 'Categories',
        ages:       'Ages',
        from:       'from',
        to:         'to',
        aria_date_start: 'starting',
        aria_date_end: 'ending',
        aria_click_to_change: 'click to change date',

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
        aria_click_to_change: 'haga clic para cambiar esta fecha',
        filter_button: 'filtrar eventos',
        close_button: 'ocultar filtros',
    }
}
</i18n>

<script setup>
    import { reactive, computed, ref, watch } from 'vue';
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../../lib/mt.mjs';
    import moment from 'moment';

    import searchBox from './search.vue';
    import calendar from '../calendar.vue';

    import Category from '../../lib/model/category.mjs';

    const props = defineProps(['query','base_query']);

    const to = ref(null);
    const from = ref(null);
    const refs = {
        to, from
    };

    const router = useRouter();
    const { t, d, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );
    const state = reactive({
        now:   moment(),
        from: props.query.from || moment(),
        to: props.query.to || moment(),
        search_terms: props.query.search_terms,
        filterExpanded: false,
        showCalendar: false,
        calendarDate: moment(),
        categories: [
            new Category({
                id: '12345',
                strings: {
                    en: {
                        name: 'Music',
                        description:'music desc'
                    },
                    es: {
                        name: 'Música',
                        description: 'no son aburrido'
                    }
                },
                selected: true
            }),
            new Category({
                id: '54321',
                strings: {
                    en: {
                        name: 'Sports',
                        description:'sports desc'
                    },
                    es: {
                        name: 'Deportes',
                        description: 'no son aburrido'
                    }
                }
            })
        ]
    });


    watch(() => props.query.from, (newVal, oldVal) => {
        state.from = newVal;
    });
    watch(() => props.query.to, (newVal, oldVal) => {
        state.to = newVal;
    });
    watch(() => props.query.search, (newVal, oldVal) => {
        state.search_terms = newVal;
    });

    const fromLabel = computed(() => t('aria_date_start') + ' ' + d( state.from.toDate(), 'long') );
    const toLabel   = computed(() => t('aria_date_end')   + ' ' + d( state.to.toDate(),   'long') );

    function toggleFilters() {
        state.filterExpanded = ! state.filterExpanded;
    }
    function loadCalendar(which) {
        state.whichCalendarDate = which;
        state.calendarDate = props.query[which];
        state.showCalendar = true;
    }
    function hideCalendar(day) {
        if ( day ) {
            state[ state.whichCalendarDate ]          = day;
            state[ state.whichCalendarDate + 'Label'] = t('aria_date_start') + ' ' +
                                                     + d( state[ state.whichCalendarDate ].toDate(), 'long');
            refs[ state.whichCalendarDate ].value.focus();
        }
        state.showCalendar = false;
    }
    function updateSearch(search) {

        if ( typeof search == 'string' ) {
            props.query.search = search;
        }
    }
    function doFilter(search) {

        let query = {
            search: state.search_terms,
            from: state.from.format('YYYY-MM-DD'),
            to: state.to.format('YYYY-MM-DD'),
        };

        query.categories = state.categories
            .filter( c => c.selected ? true : false )
            .map( c => c.id )
            .join(',');

        router.push({
            path: 'events',
            query: query
        });
    }

</script>
