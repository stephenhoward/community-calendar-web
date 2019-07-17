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

        axios.get( '/v1/events', {
            repsonseType: 'json',
            params: params
        })
            .then( (response) => {
                let json                = response.data;
                let current_date        = null;
                let current_date_string = null;
                let events              = {};

                json = [
                    {
                        id: 1,
                        info: {
                            en: {
                                title: 'Explore the Science of Space at Your Library!',                                        
                                description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration."
                            },
                            es: {
                                title: '¡Explora la ciencia del espacio en tu biblioteca!',                                        
                                description: "Este evento ha sido diseñado para revisar los principios de los viajes espaciales, con un énfasis en el 50 aniversario del aterrizaje del primer humano en la Luna durante la misión Apolo 11 de la NASA. También destaca los beneficios derivados de la misión Apollo que los terrícolas han obtenido de la investigación sobre la exploración espacial."
                            }
                        },

                        start: '2019-06-10 12:00',
                        end: '2019-06-10 13:00',
                        parent: {
                            info: {
                                en: {
                                    title: 'NASA @ My Library'
                                },
                                es: {
                                    title: 'NASA @ Mi Biblioteca'
                                }
                            }
                        },
                    },
                    {
                        id: 2,
                        info: {
                            en: {
                                description: 'Brass Roots Movement brings New Orleans jazz to Music In The Park. Music, food, beer & wine, fun for the kids.'
                            },
                            es: {

                            }
                        },
                        title: 'Brass Roots Movement',
                        parent: {
                            info: {
                                en: {
                                    title: 'Monmouth Music in the Park Series'
                                },
                                es: {
                                    title: 'Musica en el parque'
                                }
                            },
                        },
                        start: '2019-06-11 8:00',
                        end: '2019-06-11 10:00',
                    },
                    {
                        id: 3,
                        info: {
                            en: {
                                title: 'Pop-up Puppet Theater Workshop',
                                description: 'Bring your own snowy story to life in this fun workshop. Using art materials, participants will learn how to create their own paper puppets and table-top scenery inspired by the colorful pop-up book art of The Snowflake Man. Space is limited. Sign up 5:30-6:30 pm the day of the event.'
                            },
                            es: {

                            }
                        },
                        start: '2019-06-11 12:30',
                        end: '2019-06-11 3:00'
                    },
                    {
                        id: 1,
                        info: {
                            en: {
                                title: 'Explore the Science of Space at Your Library!',                                        
                                description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration."
                            },
                            es: {
                                title: '¡Explora la ciencia del espacio en tu biblioteca!',                                        
                                description: "Este evento ha sido diseñado para revisar los principios de los viajes espaciales, con un énfasis en el 50 aniversario del aterrizaje del primer humano en la Luna durante la misión Apolo 11 de la NASA. También destaca los beneficios derivados de la misión Apollo que los terrícolas han obtenido de la investigación sobre la exploración espacial."
                            }
                        },

                        start: '2019-06-10 14:00',
                        end: '2019-06-10 14:45',
                        parent: {
                            info: {
                                en: {
                                    title: 'NASA @ My Library'
                                },
                                es: {
                                    title: 'NASA @ Mi Biblioteca'
                                }
                            }
                        },
                    },
                    {
                        id: 2,
                        info: {
                            en: {
                                description: 'Brass Roots Movement brings New Orleans jazz to Music In The Park. Music, food, beer & wine, fun for the kids.'
                            },
                            es: {

                            }
                        },
                        title: 'Brass Roots Movement',
                        parent: {
                            info: {
                                en: {
                                    title: 'Monmouth Music in the Park Series'
                                },
                                es: {

                                }
                            },
                        },
                        start: '2019-06-10 17:00',
                        end: '2019-06-10 19:00',
                    },
                    {
                        id: 3,
                        info: {
                            en: {
                                title: 'Pop-up Puppet Theater Workshop',
                                description: 'Bring your own snowy story to life in this fun workshop. Using art materials, participants will learn how to create their own paper puppets and table-top scenery inspired by the colorful pop-up book art of The Snowflake Man. Space is limited. Sign up 5:30-6:30 pm the day of the event.'
                            },
                            es: {

                            }
                        },
                        start: moment().add(1,'hours'),
                        end: moment().add(2,'hours')
                    }
                ];

                for ( var e of json ) {

                    let event      = Event.newFromJson(e);
                    let start_date = moment( event.start ).startOf('day');

                    if ( ! current_date || ! current_date.isSame( start_date ) ) {

                        current_date                = start_date;
                        current_date_string         = current_date.format('YYYY-MM-DD');
                        events[current_date_string] = { date: current_date, events: [] };
                    }

                    events[current_date_string].events.push(event);
                }

                resolve(events)
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