<style lang="sass">
section.events {

    @import 'app/scss/_mixins.scss';

    div.event {
        border: 1px solid #aaa;
        border-top-color: #ddd;
        border-left-color: #ddd;
        background-color: $light-mode-background;
        @media (prefers-color-scheme: dark) {
            background-color: $dark-mode-background;
        }
        margin: 15px 0;
        padding: 10px;
        box-shadow: 2px 2px 5px rgba(100,100,100,.3);
        @media (prefers-color-scheme: dark) {
            box-shadow: 2px 2px 5px rgba(0,0,0,.3);
            background-color: #222;
            border-color: #000;
            border-top-color: #444;
            border-left-color: #444;
        }

        &.past {
            @media (prefers-color-scheme: dark) {
                background-color: transparent;
            }
            font-size: 14pt;
            opacity: .7;
            border: none;
            box-shadow: none;
            h3 {
                font-size: 14pt;
            }
            @media (min-width: 550px) {
                div.info {
                    @include hstack;
                    align-items: baseline;
                    h3 {
                        @include flexible;
                    }
                }
            }
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
            cursor: pointer;
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
}
</style>

<template>
    <div v-bind:class="'event' + ( event.end.isBefore(now) ? ' past' : '')">
        <router-link :to="'/events/' + event.id" class="event-body" tag="div">
            <div class="info">
                <h3>
                    {{ event.get('title') }}
                    <div v-if="event.parent" class="parent-event">{{ event.parent.get('title') }}</div>
                </h3>
                <div v-if="event.end.isBefore(now)" class="datetime">{{ $d( event.start.toDate(), 'time' ) }}</div>
                <div v-if="event.end.isSameOrAfter(now)" class="description">
                  {{ event.get('description') }}
                </div>
            </div>
            <img v-if="event.end.isSameOrAfter(now)" src="">
        </router-link>
        <ul v-if="event.end.isSameOrAfter(now)" class="event-footer">
          <li class="datetime">
            {{ $d( event.start.toDate(), 'time' ) }}
          </li>
        </ul>
    </div>
</template>

<script>

    module.exports = {
        props: ['event','now'],
    }
</script>