<style lang="scss">

@import '../../../assets/css/mixins.scss';

div.search {
    @include hstack;
    display: inline-flex;
    border: 1px solid #ccc;
    box-shadow: inset 2px 2px 4px rgba(0,0,0,.3);
    border-radius: 8px;

    input[type=text] {
        font-size: 14pt;
        @include flexible;
        border: none;
        background-color: transparent;
        padding: 5px 10px;
        &:focus {
            outline: none;
        }
    }
    button {
        @include inflexible;
        border: none;
        background-color: transparent;
    }
}

</style>

<template>
<div class="search" >
    <input role="searchbox" type="text" v-model="state.search_terms" :placeholder="t('search_placeholder')" @keyup="checkSearch($event)" />
    <button v-if="state.search_terms" :class="{ 'icofont-close': true, 'hidden': ! state.search_terms.length }" :aria-label="t('clear_search')" type="button" @click="clearSearch"></button>
</div>
</template>

<i18n>
{
    en: {
        search_placeholder: 'search events',
        clear_search: 'clear search'
    },
    es: {
        search_placeholder: 'buscar eventos',
        clear_search: 'borrar búsqueda'
    }
}
</i18n>


<script setup>
    import { reactive, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t, d } = useI18n({});

    const props = defineProps([ 'query' ]);
    const emit  = defineEmits(['search','update-search']);

    const state = reactive({
        search_terms: props.query || '',
    });

    watch( () => props.query, (newVal, oldVal) => {
        state.search_terms = newVal;
    });

    function checkSearch($event) {
        switch( $event.key ) {
            case 'Escape':
                clearSearch();
                break;
            case 'Enter':
                emit('search',state.search_terms);
                break;
            default:
                emit('update-search',state.search_terms);
                break;
        }
    }

    function clearSearch() {
        state.search_terms = '';
        emit('update-search',state.search_terms);
    }

</script>
