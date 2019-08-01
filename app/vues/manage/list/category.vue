<template>
    <div class="category">
        <h3>{{ category.get('title') }}</h3>
    </div>
</template>

<script>
const moment = require('moment');
const Event  = require('lib/model/category');

module.exports = {
    props: ['model'],
    data: function() {
        return {
            now: moment(),
            category: this.model
        };
    },
    computed: {
        endOnDifferentDay: function() {

            if ( ! this.category.end ) {
                return false;
            }
            let start_day = moment(this.category.start).startOf('day');
            let end_day   = moment( this.category.end ).startOf('day');

            return ! start_day.isSame(end_day);
        },
        endOnDifferentTime: function() {
            return this.category.end && ! this.category.start.isSame( this.category.end );
        }
    },

}
</script>