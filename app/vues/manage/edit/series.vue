<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.editor div.series {
        padding: 0;
    }

    div.series {

        h3 {
            margin: 0;
            font-size: 18pt;
            div.parent-series {
                font-size: 14pt;
                font-weight: 400;
            }
        }
        div.datetime {
          margin: 10px 0 0 0;
        }

        div.series-body {
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

        ul.series-footer {
            list-style-type: none;
            @include hstack;
            margin: 0;
            padding: 10px 0 0 0;

            li {
                margin: 0;
                padding: 0;
                @include flexible;
            }
        }
    }
</style>

<template>
    <div class="series">
        <translation-control v-bind:model="series" @update="updateInfo"></translation-control>
        <section class="datetimes">
        </section>
        <section class="options">
        </section>
    </div>
</template>

<script>
const moment  = require('moment');
const Series   = require('../../../lib/model/series');
const compose = require('../../../lib/compose');

module.exports = {
    props: ['model'],
    components: {
        'translation-control': compose.translationVue( require('./translate/series.vue') )
    },
    data: function() {
        return {
            now: moment(),
            series: this.model
        };
    },
    methods: {
        updateInfo: function(lang,info) {
            this.series.info[lang] = info;
        }
    },
    watch: {
        series: {
            handler: function(newVal,oldVal) {
                this.$emit('update',this.series);
            },
            deep: true
        }
    }

}
</script>