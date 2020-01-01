<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.editor div.event {
        padding: 0;
    }

    div.event {

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
        div.error {
            color: #f50;
            font-size: 90%;
            margin-top: 20px;
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

        div.info {
            input[type=text] {
                width: 100%;
                font-size: 100%;
            }
            textarea {
                width: 100%;
                min-height: 200px;
            }
        }
        input[type=time] {
            font-size: 100%;
            border-radius: 4px;
            border: 1px solid $light-mode-border;
            @include dark-mode {
                border-color: $dark-mode-border;
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
        <translation-control v-bind:model="mod" @update="updateInfo"></translation-control>
        <section class="datetimes">
            <h4>{{ $t('event_dates') }}</h4>
                    <button
                        ref="start"
                        :aria-label="dateLabel"
                        aria-describedby="dateButtonInstructions"
                        @click="loadCalendar('start')"
                        type="button"
                    >
                        {{ $d( start.date, 'long' ) }}
                    </button>
                <label>
                    <span class="aria-hidden">{{ $t('from') }}</span>
                    <time-input :selected_time="start.time" :label="'start'" @change="setTime"></time-input>
                </label>
                <label>
                    <span class="aria-hidden">{{ $t('to')   }}</span>
                    <button v-if="showEndDate"
                        ref="end"
                        :aria-label="dateLabel"
                        aria-describedby="dateButtonInstructions"
                        @click="loadCalendar('end')"
                        type="button"
                    >{{ $d( end.date, 'long' ) }}</button>
                    <time-input :selected_time="end.time" :label="'end'" @change="setTime"></time-input>
                </label><br>
                <label><input type="checkbox" @click="setEventTime('end')" v-model="showEndDate"> End on a different day</label>
                <div class="error" v-if="showDateRangeError">{{ $t('date_range_error') }}</div>
        </section>
        <section class="options">
        <category-picker @change="updateCategories"></category-picker>
        </section>
        <calendar v-if="showCalendar" :selected_date="calendarDate" @close="hideCalendar" ref="datepicker" ></calendar>
    </div>
</template>

<script>
const translatableForm = require('./translatable.vue');
const compose  = require('../../../lib/compose');
const calendarVue = require('../../components/calendar.vue');
const categoryPicker = require('../components/category_picker.vue');
const timeVue = require('../../components/time-input.vue');
const moment = require('moment');

module.exports = {
    extends: translatableForm,
    data: function() {

        let data = {
            mod: this.model,
            showCalendar: false,
            showEndDate: false,
            showDateRangeError: false,
            start: {},
            end: {}
        };

        let default_start = moment().add(1,'hours').startOf('hour');

        data.mod.start = this.model.start || default_start;
        data.mod.end   = this.model.end   || moment(default_start).add(1,'hours');

        data.start.date = data.mod.start;
        data.end.date   = data.mod.end;
        data.start.time = moment(data.start.date);
        data.end.time   = moment(data.end.date);

        return data;
    },
    i18n: {
        messages: {
            en: {
                from:       'from',
                to:         'to',
                aria_date_start: 'starting',
                aria_date_end: 'ending',
                date_range_error: 'start time must be before end time',
                event_dates: 'Event Date and Time'
            },
            es: {
                from:       'de',
                to:         'a',                
            },
            fr: {}
        }
    },
    components: {
        'translation-control': compose.translationVue( require('./translate/event.vue') ),
        'calendar': calendarVue,
        'time-input': timeVue,
        'category-picker': categoryPicker
    },
    computed: {
        dateLabel: function() {
            return this.$t('aria_date_start') + ' ' + this.$d( this.start.date, 'long');
        },
    },
    methods: {
        loadCalendar: function(which) {
            console.log('loadCalendar');
            this.whichCalendarDate = which;
            this.showCalendar = true;
        },
        hideCalendar: function(day) {
            if ( day ) {
                this[this.whichCalendarDate].date = day;
                this.setEventTime(this.whichCalendarDate);
            }
            this.showCalendar = false;
        },
        setTime: function(which,time) {
            this[which].time = time;
            this.setEventTime(which);
        },
        setEventTime(which) {
            console.log('setting');
            let newTime = moment(this[which].date);
            newTime.hours( this[which].time.hours() );
            newTime.minutes( this[which].time.minutes() );

            this.mod[which] = newTime;

            this.showDateRangeError = ( this.mod.start.isAfter( this.mod.end ) )
                ? true
                : false;

            if ( ! this.showEndDate && this.end.date.format('YYYY-MM-DD') != this.start.date.format('YYYY-MM-DD') ) {
                this.end.date = moment(this.start.date);
                this.setEventTime('end');
            }
        },
        updateCategories(categories) {
            this.mod.categories = categories;
            console.log(this.mod.categories);
        }

    }
};
</script>