<style lang="sass">

section.events {
    max-width: 500px;
    border: 1px solid #ccc;
    padding: 15px;
}



</style>

<template>
    <div>
        <header>
            <h2>{{ this.title }}</h2>
        </header>
        <main>
            <section class="events">
                <h3 v-if="context">{{ this.context }}</h3>
                <event
                    v-for="event in events"
                    v-bind:event="event"
                    v-bind:key="event.id"
                >
                </event>
            </section>
        </main>
    </div>
</template>

<script>
    moment = require('moment');

    module.exports = {
        data : () => {

            return {
                title: 'Today',
                context: moment().format('MMM D'),
                now: moment(),
                events: [
                    {
                        title: 'Event A',
                        start: moment(),
                        end: moment(),
                        description: 'test text'
                    },
                    {
                        title: 'Event B',
                        parent: {
                            title: 'Music in the Park'
                        },
                        start: moment(),
                        end: moment(),
                        description: 'test text 2'
                    }
                ]
            };
        },
        components: {
            event: require('./components/event.vue')
        }
    };
</script>