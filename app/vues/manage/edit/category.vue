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
        <translation-control v-bind:model="category" @update="updateInfo"></translation-control>
        <section class="datetimes">
        </section>
        <section class="options">
        </section>
    </div>
</template>

<script>
const moment  = require('moment');
const Event   = require('../../../lib/model/category');
const compose = require('../../../lib/compose');

module.exports = {
    props: ['model'],
    components: {
        'translation-control': compose.translationVue( require('./translate/category.vue') )
    },
    data: function() {
        return {
            now: moment(),
            category: this.model
        };
    },
    methods: {
        updateInfo: function(lang,info) {
            this.category.info[lang] = info;
        }
    },
    watch: {
        category: {
            handler: function(newVal,oldVal) {
                this.$emit('update',this.category);
            },
            deep: true
        }
    }

}
</script>