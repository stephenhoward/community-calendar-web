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
        <div class="event-body">
            <div class="info">
                <h2>
                    {{ event.get('title') }}
                    <div v-if="event.parent" class="parent-event">{{ event.parent.get('title') }}</div>
                </h2>
                <div class="description">
                  {{ event.get('description') }}
                </div>
                <div v-if="event.get('accessibility_information')">
                    <h3>{{ $t('accessibility_information') }}</h3>
                    {{ event.get('accessibility_information') }}
                </div>
            </div>
            <img src="">
        </div>
        <ul class="event-footer">
          <li class="datetime">
            {{ $d( event.start.toDate(), 'long-datetime' ) }}
            <span v-if="this.endOnDifferentDay">to {{ $d( event.end.toDate(), 'long-datetime') }}</span>
            <span v-else-if="this.endOnDifferentTime">to {{ $d( event.end.toDate(), 'time') }}</span>
          </li>
        </ul>
    </div>
    <div v-else>
        No event found.
    </div>
</template>

<script>
let moment = require('moment');
const Event  = require('lib/model/event');


module.exports = {
    props: ['id'],
    i18n: {
        messages: {            
            en: {
                accessibility_information: 'Accessibility Information'
            }
        }
    },
    data: function() {
        return {
            now: moment(),
            event: new Event({
                id: 1,
                info: {
                    en: {
                        title: 'Explore the Science of Space at Your Library!',                                        
                        description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration.",
                        accessibility_information: 'Ramp available at the northwest corner of the building'
                    },
                    es: {
                        title: '¡Explora la ciencia del espacio en tu biblioteca!',                                        
                        description: "Este evento ha sido diseñado para revisar los principios de los viajes espaciales, con un énfasis en el 50 aniversario del aterrizaje del primer humano en la Luna durante la misión Apolo 11 de la NASA. También destaca los beneficios derivados de la misión Apollo que los terrícolas han obtenido de la investigación sobre la exploración espacial."
                    }
                },

                start: moment('2019-06-10 12:00','YYYY-MM-DD HH:mm'),
                end: moment('2019-06-10 13:00','YYYY-MM-DD HH:mm'),
                parent: new Event({
                    info: {
                        en: {
                            title: 'NASA @ My Library'
                        },
                        es: {
                            title: 'NASA @ Mi Biblioteca'
                        }
                    }
                }),                
            })
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
    created: function() {
        let self = this;

        Event.fetch(this.$route.params.id)
            .then( event => self.event = event )
            .catch( err => self.event = null );
    }

}
</script>