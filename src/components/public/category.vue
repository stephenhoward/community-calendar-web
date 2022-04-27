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
    <h2 ref="heading" tabindex="-1" >{{ mt(state.category,'name') }}</h2>
    <eventList :query="state.query" :base-query="state.baseQuery"></eventList>
</template>

<script setup>
    import { reactive, ref, onBeforeMount, nextTick } from 'vue';
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import moment from 'moment';
    import Category from '../../lib/model/category.mjs';
    import useModelTranslate from '../../lib/mt.mjs';

    import eventList from './event_list.vue';

    const route = useRoute();
    const { d,t, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );
    const heading = ref(null);

    const state = reactive({
        category: new Category,
        now:   moment(),
        days:  [],
        query: {
            from: moment(),
            to: moment().add(30,'days')
        },
        baseQuery: { category: route.params.id }
    });

    onBeforeMount(() => {
        initData();
    });

    async function initData(name) {
        let query = route.query;

        state.category = await Category.fetch(route.params.id);

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
        await nextTick();

        heading.value.focus();
    }

</script>