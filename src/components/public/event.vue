<style lang="scss">

@import '../../../assets/css/mixins.scss';

div.event {
    margin:  15px 0;
    padding: 10px;

    h3 {
        margin:    0;
        font-size: 18pt;
        div.parent-event {
            font-size:   14pt;
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
            order:       2;
            height:      100px;
            width:       100px;
            margin-left: 15px;
            border:      1px solid #eee;

            @media (min-width: 550px) {
                height: 200px;
                width:  200px;
            }
        }
    }

    ul.event-footer {
        @include hstack;
        margin:          0;
        padding:         10px 0 0 0;
        list-style-type: none;

        li {
            @include flexible;
            margin:  0;
            padding: 0;
        }
    }
}
</style>

<template>
    <div v-if="state.event" class="event">
        <div class="event-body">
            <div class="info">
                <h2>
                    {{ mt(state.event,'title') }}
                    <div v-if="state.event.parent" class="parent-event">{{ mt(state.event.parent,'title') }}</div>
                </h2>
                <div class="description">
                  {{ mt(state.event,'description') }}
                </div>
                <div v-if="mt(state.event,'accessibility_information')">
                    <h3>{{ t('accessibility_information') }}</h3>
                    {{ mt(state.event, 'accessibility_information') }}
                </div>
            </div>
            <img src="">
        </div>
        <ul class="event-footer">
          <li class="datetime">
            {{ d( state.event.start.toDate(), 'long-datetime' ) }}
            <span v-if="endOnDifferentDay">to {{ d( state.event.end.toDate(), 'long-datetime') }}</span>
            <span v-else-if="endOnDifferentTime">to {{ d( state.event.end.toDate(), 'time') }}</span>
          </li>
        </ul>
    </div>
    <div v-else>
        {{ t('not_found') }}
    </div>
</template>

<i18n>
{            
    en: {
        accessibility_information: 'Accessibility Information',
        not_found: 'No event found'
    }
}
</i18n>


<script setup>
    import { reactive, computed, onBeforeMount } from 'vue';
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../../lib/mt.mjs';
    import moment from 'moment';
    import Event from '../../lib/model/event.mjs';


    const route = useRoute();
    const { t,d, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );
    const props = defineProps(['id']);
    const state = reactive({
        now: moment(),
        event: new Event({
            id: 1,
            strings: {
                en: {
                    title: 'Explore the Science of Space at Your Library!',                                        
                    description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration.",
                    accessibility_information: 'Ramp available at the northwest corner of the building',
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
    });

    const endOnDifferentDay = computed(() => {
            if ( ! state.event.end ) {
                return false;
            }
            let start_day = moment(state.event.start).startOf('day');
            let end_day   = moment( state.event.end ).startOf('day');

            return ! start_day.isSame(end_day);
    });

    const endOnDifferentTime = computed(() => {
        return state.event.end && ! state.event.start.isSame( state.event.end );
    });

    onBeforeMount(() => {

        Event.fetch(route.params.id)
            .then( event => state.event = event )
            .catch( err => state.event = null );
    });
</script>