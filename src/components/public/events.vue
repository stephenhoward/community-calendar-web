<style lang="scss">

@import '../../../assets/css/mixins.scss';

div.events {
    @include vstack;

    & > h2 {
        order: 1;
    }
    div.days {
        order: 3;
    }
    div.filter-component {
        order: 2;
    }

    section.events {
        max-width:     700px;
        padding:       15px;
        margin-bottom: 25px;
        border-radius: 4px;
        border:        1px solid $light-mode-border;
        box-shadow:    2px 2px 5px rgba(100,100,100,.3);

        @include dark-mode {
            background-color: $dark-mode-panel-background;
            border-color:     $dark-mode-border;
        }
    }

    @include large-size-device {
        @include hstack;
        flex-wrap: wrap;
        & > h2 {
            @include inflexible;
            width: 100%;
        }
        div.days {
            order: 2;
            @include flexible;
            max-width: 70%;
        }
        div.filter-component {
            order: 3;
            @include flexible;
            max-width: 30%;
            form,h3 {
                display: block;
            }
            #filter-toggle {
                display: none;
            }
        }
    }


}

</style>

<template>
    <div class="events">
        <h2 ref="heading" tabindex="-1" v-if="state.title      == 'today_title'">{{ t('today_title') }}</h2>
        <h2 ref="heading" tabindex="-1" v-else-if="state.title == 'week_title'">{{  t('week_title')  }}</h2>
        <h2 ref="heading" tabindex="-1" v-else>{{ t('search_title') }}</h2>
        <a href="#filters" @click.prevent="skipTo('filters')" class="sr-only">{{ t('aria_skip_to_filters') }}</a>
        <div class="days">
            <section v-for="day in state.days" class="events">
                <h3 v-if="day.date">{{ d( day.date.toDate(), 'short' ) }}</h3>
                <eventView
                    v-for="event in day.events"
                    v-bind:event="event"
                    v-bind:now="state.now"
                />
            </section>
        </div>
        <searchFilter :query="state.search.current_query"/>
    </div>
</template>

<i18n>
{
    en: {
        "today_title":  "Today",
        "week_title":   "This Week",
        "search_title": "Search",
        "aria_skip_to_filters": "Skip to Search Filters"
    },
    es: {
        "today_title":  "Hoy",
        "week_title":   "Esta Semana",
        "search_title": "Búsqueda"
    }
}
</i18n>

<script setup>
    import { reactive, ref, onBeforeMount, nextTick, watch } from 'vue';
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import moment from 'moment';

    import eventView from './event_summary.vue';
    import searchFilter from './filter.vue';
    import EventSearch from '../../lib/search.mjs';

    const state = reactive({
        title: '',
        now:   moment(),
        days:  [],
        search: new EventSearch()
    });

    const route = useRoute();
    const { t,d } = useI18n({});

    const heading = ref(null);

    watch(route, (to, from) => {
        initData(to.name);
    });

    onBeforeMount(() => {
        initData(route.name);
    });

    function initData(name) {
        switch( name ) {
            case 'today':
                state.title  = 'today_title';
                fetchData({
                    from: moment(),
                    to:   moment()
                });
                break;
            case 'this-week':
                state.title  = 'week_title';
                fetchData({
                    from: moment(),
                    to:   moment().day(7)
                });
                break;
            default:
                state.title = 'search_title';
                let query = route.query;

                for ( let date of ['to','from'] ) {

                    if ( query[date] ) {
                        query[date] = moment(query[date],'YYYY-MM-DD');
                    }
                    else {
                        query[date] = date == 'from'
                            ? moment()
                            : moment().add(30,'days');
                    }
                }

                fetchData(query);
                nextTick().then(() => heading.value.focus() );
        }
    }
    function fetchData(params) {
        console.log('searching');
        state.search.search(params).then( results => state.days = results );
    }
    function toggleFilters() {
        state.filterExpanded = ! state.filterExpanded;
    }
    function focusTitle() {
        heading.value.focus();
    }
    function skipTo(id) {
        document.getElementById(id).focus();
    }

</script>