<style lang="sass">

    @import 'app/scss/_mixins.scss';

    section.events {
        max-width: 700px;
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 25px;
        @media (prefers-color-scheme: dark) {
            background-color: #111;
            border-color: #222;
        }
    }

</style>

<template>
    <div>
        <header>
            <h2>{{ $t('title') }}</h2>
        </header>
        <main>
            <section v-for="day in days" class="events">
                <h3 v-if="day.date">{{ $d( day.date.toDate(), 'short' ) }}</h3>
                <event
                    v-for="event in day.events"
                    v-bind:event="event"
                    v-bind:now="now"
                >
                </event>
            </section>
        </main>
    </div>
</template>

<script>
    let moment = require('moment');
    let search = require('lib/search');
    let now    = moment();

    module.exports = {
        i18n: {
            messages: {
                en: {
                    title: 'This Week'
                },
                es: {
                    title: 'Esta Semana'
                }
            }
        },
        data : () => {

            return {
                now: now,
                days: []
            };
        },
        created: function() {
            this.fetchData();
        },
        methods: {

            fetchData: function() {
                let self = this
                search({}).then( json => self.days = json );
            }
        },
        components: {
            event: require('./components/event.vue')
        }
    };
</script>