import axios from 'axios';
import moment from 'moment';
import Event from './model/event.mjs';

export default class EventSearch {
    constructor() {
        this.current_query = {
            from: moment().startOf("day"),
            to: moment().startOf("day")

        };
    }

    async search(params) {

        this.current_query = {};

        for ( let key in params ) {
            this.current_query[key] = params[key];
        }

        for ( let date of [ 'from','to' ] ) {
            if ( params[date] ) {
                this.current_query[date] = params[date].startOf('day');
                params[date]        = params[date].format('YYYY-MM-DD');
            }
        }

        try {

            let events = await Event.list(params);

            let current_date        = null;
            let current_date_string = null;
            let events_by_date      = {};


            for ( var event of events ) {

                let start_date = moment( event.start ).startOf('day');

                if ( ! current_date || ! current_date.isSame( start_date ) ) {

                    current_date                = start_date;
                    current_date_string         = current_date.format('YYYY-MM-DD');
                    events_by_date[current_date_string] = { date: current_date, events: [] };
                }

                events_by_date[current_date_string].events.push(event);
            }

            return events_by_date;
        }
        catch (error) {
            console.log(error);

            return {
                '2022-04-03': {
                    date: moment(),
                    events: [
                        new Event({
                            start: moment(),
                            end: moment().add(1,'hours'),
                            strings: {
                                'en': {
                                    title: 'Test Event',
                                    description: 'Some longer text describing the event'
                                }
                            }
                        })
                    ]

                }
            }
            // TODO
        }
    }
}