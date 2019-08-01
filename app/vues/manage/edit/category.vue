<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.editor div.category {
        padding: 0;
    }

    div.category {

        h3 {
            margin: 0;
            font-size: 18pt;
            div.parent-category {
                font-size: 14pt;
                font-weight: 400;
            }
        }
        div.datetime {
          margin: 10px 0 0 0;
        }

        div.category-body {
            @include hstack;

            div.info {
                @include flexible;
                order: 1;

                div.description {
                    margin-top: 10px;
                }
            }
            img {
                @include inflexible;
                order: 2;
                height: 100px;
                width: 100px;
                border: 1px solid #eee;
                margin-left: 15px;
                @media (min-width: 550px) {
                    height: 200px;
                    width: 200px;
                }
            }
        }
    }
</style>

<template>
    <div class="category">
        <translation-control v-bind:model="mod" @update="updateInfo"></translation-control>
        <section class="datetimes">
        </section>
        <section class="options">
        </section>
    </div>
</template>

<script>
const translatableForm = require('./translatable.vue');
const compose  = require('../../../lib/compose');

module.exports = {
    extends: translatableForm,
    components: {
        'translation-control': compose.translationVue( require('./translate/category.vue') )
    }
};
</script>