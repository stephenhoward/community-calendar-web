<style lang="sass">

@import 'app/scss/_mixins.scss';

div.events {
    @include vstack;

    & > h2 {
        order: 1;
    }
    div.days {
        order: 3;
    }
    div.filter-component {
        order: 2;
    }

    section.events {
        max-width:     700px;
        padding:       15px;
        margin-bottom: 25px;
        border-radius: 4px;
        border:        1px solid #ccc;

        @include dark-mode {
            background-color: #111;
            border-color:     #222;
        }
    }

    @include large-size-device {
        @include hstack;
        flex-wrap: wrap;
        & > h2 {
            @include inflexible;
            width: 100%;
        }
        div.days {
            order: 2;
            @include flexible;
            max-width: 70%;
        }
        div.filter-component {
            order: 3;
            @include flexible;
            max-width: 30%;
            form,h3 {
                display: block;
            }
            #filter-toggle {
                display: none;
            }
        }
    }


}

</style>

<template>
    <div class="events">
        <h2 ref="heading" tabindex="-1" v-if="title      == 'today_title'">{{ $t('today_title') }}</h2>
        <h2 ref="heading" tabindex="-1" v-else-if="title == 'week_title'">{{  $t('week_title')  }}</h2>
        <h2 ref="heading" tabindex="-1" v-else>{{ $t('search_title') }}</h2>
        <a href="#filters" @click.prevent="skipTo('filters')" class="sr-only">{{ $t('aria_skip_to_filters') }}</a>
        <div class="days">
            <section v-for="day in days" class="events">
                <h3 v-if="day.date">{{ $d( day.date.toDate(), 'short' ) }}</h3>
                <event
                    v-for="event in day.events"
                    v-bind:event="event"
                    v-bind:now="now"
                >
                </event>
            </section>
        </div>
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
                    search_title: 'Search',
                    aria_skip_to_filters: 'Skip to Search Filters'
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
                        let query = this.$route.query;

                        for ( let date of ['to','from'] ) {

                            if ( query[date] ) {
                                query[date] = moment(query[date],'YYYY-MM-DD');
                            }
                            else {
                                query[date] = date == 'from'
                                    ? moment()
                                    : moment().add(30,'days');
                            }
                        }

                        this.fetchData(query);
                        this.$nextTick().then(() => this.$refs.heading.focus() );
                }
            },
            fetchData: function(params) {
                let self = this;
                search(params).then( results => self.days = results );
            },
            toggleFilters: function() {
                this.filterExpanded = ! this.filterExpanded;
            },
            focusTitle: function() {
                this.$refs.heading.focus();
            },
            skipTo: function(id) {
                document.getElementById(id).focus();
            }
        }
    };
</script>