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
            <h2>{{ this.title }}</h2>
        </header>
        <main>
            <section v-for="day in days" class="events">
                <h3 v-if="day.date">{{ day.date.format('MMM D') }}</h3>
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
    moment = require('moment');
    now    = moment();
    then   = moment().subtract(1,'hours');

    module.exports = {
        data : () => {

            return {
                title: 'This Week',
                now: now,
                days: [
                    {
                        date: now,
                        events: [
                            {
                                id: 1,
                                title: 'Explore the Science of Space at Your Library!',
                                start: then,
                                end: then,
                                parent: {
                                    title: 'NASA @ My Library'
                                },
                                description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration."
                            },
                            {
                                id: 2,
                                title: 'Brass Roots Movement',
                                parent: {
                                    title: 'Monmouth Music in the Park Series'
                                },
                                start: now,
                                end: now,
                                description: 'Brass Roots Movement brings New Orleans jazz to Music In The Park. Music, food, beer & wine, fun for the kids.'
                            },
                            {
                                id: 3,
                                title: 'Pop-up Puppet Theater Workshop',
                                start: now,
                                end: now,
                                description: 'Bring your own snowy story to life in this fun workshop. Using art materials, participants will learn how to create their own paper puppets and table-top scenery inspired by the colorful pop-up book art of The Snowflake Man. Space is limited. Sign up 5:30-6:30 pm the day of the event.'
                            }
                        ]
                    },
                    {
                        date: moment().add(1,'days'),
                        events: [
                            {
                                id: 1,
                                title: 'Explore the Science of Space at Your Library!',
                                start: then,
                                end: then,
                                parent: {
                                    title: 'NASA @ My Library'
                                },
                                description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration."
                            },
                            {
                                id: 2,
                                title: 'Brass Roots Movement',
                                parent: {
                                    title: 'Monmouth Music in the Park Series'
                                },
                                start: now,
                                end: now,
                                description: 'Brass Roots Movement brings New Orleans jazz to Music In The Park. Music, food, beer & wine, fun for the kids.'
                            },
                            {
                                id: 3,
                                title: 'Pop-up Puppet Theater Workshop',
                                start: now,
                                end: now,
                                description: 'Bring your own snowy story to life in this fun workshop. Using art materials, participants will learn how to create their own paper puppets and table-top scenery inspired by the colorful pop-up book art of The Snowflake Man. Space is limited. Sign up 5:30-6:30 pm the day of the event.'
                            }
                        ]

                    }
                ]
            };
        },
        components: {
            event: require('./components/event.vue')
        }
    };
</script>