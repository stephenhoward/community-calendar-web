<template>
    <div class="event">
        <h3>{{ event.get('title') }}</h3>
    </div>
</template>

<script>
const moment = require('moment');
const Event  = require('lib/model/event');

module.exports = {
    props: ['model'],
    data: function() {
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