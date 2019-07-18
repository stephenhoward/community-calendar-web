<style lang="sass">

@import 'app/scss/_mixins.scss';

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
    <input type="text" v-model="search_terms" :placeholder="$t('search_placeholder')" @keyup="checkSearch($event)" />
    <button :class="{ 'icofont-close': true, 'hidden': ! search_terms.length }" :aria-label="$t('clear_search')" type="button" @click="clearSearch"></button>
</div>
</template>

<script>

    module.exports = {
        props: [ 'query' ],

        data: function() {

            return {
                search_terms: this.query || '',
            };
        },
        i18n: {
            messages: {
                en: {
                    search_placeholder: 'search events',
                    clear_search: 'clear search'
                },
                es: {
                    search_placeholder: 'buscar eventos',
                    clear_search: 'borrar búsqueda'
                }
            }
        },
        watch: {
            query: function (newVal, oldVal) {
                this.search_terms = newVal;
            }
        },
        methods: {
            checkSearch($event) {
                switch( $event.key ) {
                    case 'Escape':
                        this.clearSearch();
                        break;
                    case 'Enter':
                        this.$emit('search',this.search_terms);
                        break;
                    default:
                        this.$emit('update-search',this.search_terms);
                        break;
                }
            },
            clearSearch() {
                this.search_terms = '';
                this.$emit('update-search',this.search_terms);
            }
        }
    };
</script>
