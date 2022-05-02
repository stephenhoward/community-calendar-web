<template>
<div class="list">
    <h2>{{ t( state.page_title ) }}</h2>
    <input type="search" v-model="state.search_terms" />
    <ul v-for="item in state.items">
        <li><component :item="item" :is="components[route.name].component"></component></li>
    </ul>
</div>
</template>

<i18n>
{
    en: {
        'Events': 'Events',
        'Categories': 'Categories'
    }
}
</i18n>

<script setup>
    import { reactive, onBeforeMount, shallowRef, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    import Category from '../../lib/model/category.mjs';
    import Event from '../../lib/model/event.mjs';

    import EventSummary from './event_summary.vue';
    import CategorySummary from './category_summary.vue';

    const route = useRoute();
    const { t } = useI18n({});
    const props = defineProps(['type']);

    const components = {
        'list_events': {
            title: 'Events',
            type: Event,
            component: EventSummary
        },
        'list_categories': {
            title: 'Categories',
            type: Category,
            component: CategorySummary
        }
    };
    const state = reactive({
        items: [],
        search_terms: '',
        page_title: components[route.name].title,
    });

    onBeforeMount( async() => {
        try {
            state.items = await components[route.name].type.list({});
        }
        catch( error ) {
            console.log(error);
        }
    });

    function doSearch() {

    }
</script>