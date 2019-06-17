const axios  = require('axios');
const moment = require('moment');
const Event  = require('lib/model/event');

function search(params) {

    return new Promise( ( resolve, reject ) => {

        axios.get( '/v1/events', {
            repsonseType: 'json',
            query: params
        })
            .then( (response) => {
                let json = response.data;
                let now  = moment();
                let then = moment().subtract(1,'hours');

                json = [
                    {
                        date: moment('2019/01/05', 'YYYY/MM/DD' ),
                        events: [
                            new Event({
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

                                start: then,
                                end: then,
                                parent: new Event({
                                    info: {
                                        en: {
                                            title: 'NASA @ My Library'
                                        },
                                        es: {
                                            title: 'NASA @ Mi Biblioteca'
                                        }
                                    }
                                }),
                            }),
                            new Event({
                                id: 2,
                                info: {
                                    en: {
                                        description: 'Brass Roots Movement brings New Orleans jazz to Music In The Park. Music, food, beer & wine, fun for the kids.'
                                    },
                                    es: {

                                    }
                                },
                                title: 'Brass Roots Movement',
                                parent: new Event({
                                    info: {
                                        en: {
                                            title: 'Monmouth Music in the Park Series'
                                        },
                                        es: {
                                            title: 'Musica en el parque'
                                        }
                                    },
                                }),
                                start: now,
                                end: now,
                            }),
                            new Event({
                                id: 3,
                                info: {
                                    en: {
                                        title: 'Pop-up Puppet Theater Workshop',
                                        description: 'Bring your own snowy story to life in this fun workshop. Using art materials, participants will learn how to create their own paper puppets and table-top scenery inspired by the colorful pop-up book art of The Snowflake Man. Space is limited. Sign up 5:30-6:30 pm the day of the event.'
                                    },
                                    es: {

                                    }
                                },
                                start: now,
                                end: now
                            })
                        ]
                    },
                    {
                        date: moment().add(1,'days'),
                        events: [
                            new Event({
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

                                start: then,
                                end: then,
                                parent: new Event({
                                    info: {
                                        en: {
                                            title: 'NASA @ My Library'
                                        },
                                        es: {
                                            title: 'NASA @ Mi Biblioteca'
                                        }
                                    }
                                }),
                            }),
                            new Event({
                                id: 2,
                                info: {
                                    en: {
                                        description: 'Brass Roots Movement brings New Orleans jazz to Music In The Park. Music, food, beer & wine, fun for the kids.'
                                    },
                                    es: {

                                    }
                                },
                                title: 'Brass Roots Movement',
                                parent: new Event({
                                    info: {
                                        en: {
                                            title: 'Monmouth Music in the Park Series'
                                        },
                                        es: {

                                        }
                                    },
                                }),
                                start: now,
                                end: now,
                            }),
                            new Event({
                                id: 3,
                                info: {
                                    en: {
                                        title: 'Pop-up Puppet Theater Workshop',
                                        description: 'Bring your own snowy story to life in this fun workshop. Using art materials, participants will learn how to create their own paper puppets and table-top scenery inspired by the colorful pop-up book art of The Snowflake Man. Space is limited. Sign up 5:30-6:30 pm the day of the event.'
                                    },
                                    es: {

                                    }
                                },
                                start: now,
                                end: now,
                            })
                        ]
                    }
                ]

                resolve(json)
            })
            .catch( (error) => {
                console.log(error);
                reject(error)
                // TODO
            });

    });
}

module.exports = search;