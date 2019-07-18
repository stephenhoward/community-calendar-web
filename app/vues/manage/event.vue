<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.event {
        margin: 15px 0;
        padding: 10px;

        h3 {
            margin: 0;
            font-size: 18pt;
            div.parent-event {
                font-size: 14pt;
                font-weight: 400;
            }
        }
        div.datetime {
          margin: 10px 0 0 0;
        }

        div.event-body {
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

        ul.event-footer {
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
    <div class="event">
        <translation-control v-bind:model="event"></translation-control>
        <section class="datetimes">
        </section>
        <section class="options">
        </section>
    </div>
</template>

<script>
const moment = require('moment');
const Event  = require('../../lib/model/event');
const compose = require('../../lib/compose');

module.exports = {
    props: ['model'],
    components: {
        'translation-control': compose.Vue(Event,require('./components/translate.vue'),{
            'translate-form': require('./event-i18n.vue')
        })
    },
    data: function() {
        return {
            now: moment(),
            event: this.model
        };
    },

}
</script>