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
    <div v-if="event" class="event">
        <section class="translations" v-for="info in event.information">
            <h3>{{ info.lang }}</h3>
            <div class="info">
                <label>Title <input :model="info.title" name="title" placeholder="title"></label>
                <label>Event Description <textarea :model="info.description"></textarea></label>
                <label>Accessibility Information <textarea :model="info.accessibility_information"></textarea></label>
            </div>
        </section>
        <section class="datetimes">
        </section>
        <section class="options">
        </section>
    </div>
    <div v-else>
        No event with that id found.
    </div>
</template>

<script>
    let moment = require('moment');
const Event  = require('lib/model/event');


module.exports = {
    props: ['model'],
    data: function() {
        console.log(this.model);
        return {
            now: moment(),
            event: this.model
        };
    },
    computed: {
        endOnDifferentDay: function() {

            if ( ! this.event.end ) {
                return false;
            }
            let start_day = moment(this.event.start).startOf('day');
            let end_day   = moment( this.event.end ).startOf('day');

            return ! start_day.isSame(end_day);
        },
        endOnDifferentTime: function() {
            return this.event.end && ! this.event.start.isSame( this.event.end );
        }
    },

}
</script>