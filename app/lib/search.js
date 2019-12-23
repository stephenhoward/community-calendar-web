const axios  = require('axios');
const moment = require('moment');
const Event  = require('lib/model/event');

let current_query = {};

function search(params) {

    return new Promise( ( resolve, reject ) => {

        current_query.search = '';

        for ( let key in params ) {
            current_query[key] = params[key];
        }

        for ( let date of [ 'from','to' ] ) {
            if ( params[date] ) {
                current_query[date] = params[date].startOf('day');
                params[date]        = params[date].format('YYYY-MM-DD');
            }
        }

        Event.list(params)
            .then( (events) => {
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

                resolve(events_by_date)
            })
            .catch( (error) => {
                console.log(error);
                reject(error);
                // TODO
            });

    });
}

module.exports = {

    search: search,
    current_query: current_query
};