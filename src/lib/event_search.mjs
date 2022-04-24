import axios from 'axios';
import moment from 'moment';
import Event from './model/event.mjs';

export default class EventSearch {
    constructor(base_query) {
        this.current_query = {};
        this.base_query = base_query || {};
        this.events = [];
    }

    setParams(params) {

        this.current_query = {};

        for ( let key in params ) {
            this.current_query[key] = params[key];
        }

        console.log(params);
        for ( let date of [ 'from','to' ] ) {
            if ( params[date] ) {
                this.current_query[date] = params[date].format('YYYY-MM-DD');
            }
        }

        for ( let key in this.base_query ) {
            this.current_query[key] = this.base_query[key];
        }
    }

    eventsByDate() {
        const events_by_date    = {};
        let current_date        = null;
        let current_date_string = null;

        for ( var event of this.events ) {

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

    async search(params) {

        params ||= {};

        this.setParams(params);

        try {

            this.events = await Event.list(this.current_query);

            return this.eventsByDate();

        }
        catch (error) {
            console.log(error);
        }
    }
}