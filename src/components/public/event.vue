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
        event: new Event(),
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