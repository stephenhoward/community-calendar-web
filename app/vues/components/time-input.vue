<style lang="sass">

@import 'app/scss/_mixins.scss';

span.time-input {
    span.manual {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 3px;
        border-radius: 4px;

        select {
            -webkit-appearance: none;
            padding: 4px;
            margin-right: 4px;
            font-size: 100%;
            border: none;
            background-color: #eee;
        }
        span.hour::after {
            content: ':';
        }
    }
}
</style>

<template>
    <span class="time-input">
        <input v-if="use_native_control" type="time" v-model="current_time">
        <span class="manual" v-else>
            <span class="hour"><select v-model="hour"><option v-for="hour in hours">{{ hour }}</option></select></span>
            <select v-model="minute"><option v-for="minute in minutes">{{ minute }}</option></select>
            <select v-model="am_pm">
                <option>AM</option>
                <option>PM</option>
            </select>
        </span>
    </span>
</template>

<script>
    const moment = require('moment');

    module.exports = {
        props: [ 'selected_time','label' ],

        data: function() {

            let native_support = true;

            try {
                var input = document.createElement("input");

                input.type = "time";

                if (input.type === "time") {
                    native_support = true;
                } else {
                    native_support = false;
                }
            } catch(e) {
                native_support = false;
            }

            let thisTime = this.selected_time || moment();

            return {
                use_native_control: native_support,
                time: thisTime,
                hours:   Array.from(Array(12).keys()).map( (n) => { h = '' + (n + 1); return h.length == 1 ? '0' + h : h } ),
                minutes: Array.from(Array(60).keys()).map( (n) => { m = '' + n;       return m.length == 1 ? '0' + m : m } ),
                current_time:   thisTime.format('HH:mm'),
                hour:   thisTime.format('hh'),
                minute: thisTime.format('mm'),
                am_pm:  thisTime.format('A')
            };
        },
        watch: {
            current_time: function(newVal,oldVal) { this.time = moment(newVal,'HH:mm'); this.$emit('change', this.label, this.time) },
            hour:   function(newVal,oldVal) { this.setHour(); this.$emit('change', this.label, this.time ) },
            minute: function(newVal,oldVal) { this.time.minute( parseInt(newVal) ); this.$emit('change', this.label, this.time) },
            am_pm:  function(newVal,oldVal) { this.setHour(); this.$emit('change', this.label, this.time) }
        },
        methods: {
            setHour: function() {
                let h = parseInt( this.hour );

                if( this.am_pm == 'AM' ) {
                    this.time.hour( h == 12 ? 0 : h );
                }
                else {
                    this.time.hour( h < 12 ? h + 12 : h );
                }
            }
        },
        i18n: {
            messages: {
                en: {
                    next_month:     'next month (page down)',
                    previous_month: 'previous month (page up)',
                    close_calendar: 'close calendar (escape)',
                    calendar_instructions: 'Use arrow keys to navigate, press enter to select date'
                },
                es: {
                    next_month:     'próximo mes (página abajo)',
                    previous_month: 'mes anterior (página arriba)',
                    close_calendar: 'cerrar calendario (escapar)'
                }
            }
        }
    };
</script>
