<style lang="scss">
@import '../../../assets/css/mixins.scss';

section.events {

    div.event {
        margin:            15px 0;
        padding:           10px;
        border-bottom:     1px solid $light-mode-border;

        @include dark-mode {
            border-bottom-color: $dark-mode-border;
        }

        &:last-child {
            border: none;
        }

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
            cursor: pointer;

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
                    width: 200px;
                }
            }
        }

        ul.event-footer {
            @include hstack;
            list-style-type: none;
            margin:          0;
            padding:         10px 0 0 0;

            li {
                @include flexible;
                margin:  0;
                padding: 0;
            }
        }

        &.past {
            font-size:  14pt;
            opacity:    .7;
            border:     none;
            box-shadow: none;

            h3 {
                font-size: 14pt;
            }

            @media (prefers-color-scheme: dark) {
                background-color: transparent;
            }

            @media (min-width: 550px) {
                div.info {
                    @include hstack;
                    align-items: baseline;
                    h3 {
                        @include flexible;
                    }
                    time {
                        display: block;
                        margin-left: 10px;
                    }
                }
            }

        }
    }
}
</style>

<template>
    <div v-bind:class="'event' + ( props.event.end.isBefore(now) ? ' past' : '')">
        <router-link :to="'/events/' + props.event.id" class="event-body" tag="div">
            <div class="info">
                <h3>
                    {{ mt(event,'title') }}
                    <div v-if="props.event.parent" class="parent-event">{{ mt(props.event.parent,'title') }}</div>
                </h3>
                <time role="text" v-if="props.event.end.isBefore(now)">{{ d( props.event.start.toDate(), 'time' ) }}</time>
                <div v-if="props.event.end.isSameOrAfter(now)" class="description">
                  {{ mt(event,'description') }}
                </div>
            </div>
            <img v-if="props.event.end.isSameOrAfter(now)" src="">
        </router-link>
        <ul v-if="props.event.end.isSameOrAfter(now)" class="event-footer">
          <li class="datetime">
            <time role="text" :aria-label="t('aria_time_label') + d( props.event.start.toDate(), 'time')">{{ d( props.event.start.toDate(), 'time' ) }}</time>
          </li>
        </ul>
    </div>
</template>

<i18n>
{
    'en': {
        aria_time_label: 'Event Time '
    }
}
</i18n>

<script setup>
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../../lib/mt.mjs';
    import datetimeFormats from '../../lib/i18n.mjs';

    const props = defineProps(['event', 'now']);
    const { d,t, locale, fallbackLocale } = useI18n({ datetimeFormats });
    const mt = useModelTranslate( locale, fallbackLocale );

</script>