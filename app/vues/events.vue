<style lang="sass">

    @import 'app/scss/_mixins.scss';

    section.events {
        max-width: 700px;
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 25px;
        @media (prefers-color-scheme: dark) {
            background-color: #111;
            border-color: #222;
        }
    }

</style>

<template>
    <div>
        <header>
            <h2 v-if="title      == 'today_title'">{{ $t('today_title') }}</h2>
            <h2 v-else-if="title == 'week_title'">{{  $t('week_title')  }}</h2>
            <h2 v-else>{{ $t('search_title') }}</h2>
        </header>
        <main>
            <section v-for="day in days" class="events">
                <h3 v-if="day.date">{{ $d( day.date.toDate(), 'short' ) }}</h3>
                <event
                    v-for="event in day.events"
                    v-bind:event="event"
                    v-bind:now="now"
                >
                </event>
            </section>
        </main>
        <search-filter></search-filter>
    </div>
</template>

<script>
    let moment = require('moment');
    let search = require('lib/search').search;

    module.exports = {
        components: {
            'event':         require('./components/event.vue'),
            'search-filter': require('./components/filter.vue')
        },
        i18n: {
            messages: {
                en: {
                    today_title:  'Today',
                    week_title:   'This Week',
                    search_title: 'Search'
                },
                es: {
                    today_title:  'Hoy',
                    week_title:   'Esta Semana',
                    search_title: 'Búsqueda'
                }
            }
        },
        data : function() {

            return {
                title: '',
                now:   moment(),
                days:  []
            };
        },
        watch: {
            '$route': function(to, from) {
                this.initData(to.name);
            }
        },
        created: function() {
            this.initData(this.$route.name);
        },
        methods: {

            initData: function(name) {
                switch( name ) {
                    case 'today':
                        this.title  = 'today_title';
                        this.fetchData({
                            from: moment(),
                            to:   moment()
                        });
                        break;
                    case 'this-week':
                        this.title  = 'week_title';
                        this.fetchData({
                            from: moment(),
                            to:   moment().day(7)
                        });
                        break;
                    default:
                        this.title = 'search_title';
                        this.fetchData({
                            from: moment(),
                            to:   moment().add( 30, 'days' )
                        });
                }
            },
            fetchData: function(params) {
                let self = this;
                search(params).then( json => self.days = json );
            },
            toggleFilters: function() {
                this.filterExpanded = ! this.filterExpanded;
            }
        }
    };
</script>