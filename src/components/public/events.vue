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
    <div>
        <h2 ref="heading" tabindex="-1" v-if="state.title      == 'today_title'">{{ t('today_title') }}</h2>
        <h2 ref="heading" tabindex="-1" v-else-if="state.title == 'week_title'">{{  t('week_title')  }}</h2>
        <h2 ref="heading" tabindex="-1" v-else>{{ t('search_title') }}</h2>
        <eventList :query="state.query"></eventList>
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

    import eventList from './event_list.vue';

    const state = reactive({
        title: '',
        now:   moment(),
        days:  [],
        query: {},
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
                state.query = {
                    from: moment(),
                    to: moment()
                };
                break;
            case 'this-week':
                state.title  = 'week_title';
                state.query = {
                    from: moment(),
                    to: moment().day(7)
                };
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
                state.query = query;
                nextTick().then(() => heading.value.focus() );
        }
    }

</script>