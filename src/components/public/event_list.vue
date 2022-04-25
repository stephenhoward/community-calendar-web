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
        }
    }


}

</style>

<template>
    <div class="events">
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
        <searchFilter :query="search.current_query"/>
    </div>
</template>

<script setup>
    import { reactive, onBeforeMount, nextTick, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import moment from 'moment';

    import eventView from './event_summary.vue';
    import searchFilter from './event_filter.vue';
    import EventSearch from '../../lib/event_search.mjs';

    const { d,t, locale, fallbackLocale } = useI18n({});
    const props = defineProps(['query','baseQuery']);
    const state = reactive({
        now:   moment(),
        days:  [],
    });
    const search = new EventSearch(props.baseQuery)

    onBeforeMount(() => {
        fetchData(props.query);
    });

    async function fetchData(params) {
        try {
            const results = await search.search(params);
            state.days = results;
        }
        catch (error) {
            console.log(error);
        }
    }
    function toggleFilters() {
        state.filterExpanded = ! state.filterExpanded;
    }

</script>