module.exports = [
  {
    pattern: '/v1/events',
    handle: (req, res) => {
        const data = [
            {
                id: 1,
                strings: {
                    en: {
                        title: 'Explore the Science of Space at Your Library!',                                        
                        description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration.",
                        accessibility_information: 'Ramp available at the northwest corner of the building',
                    },
                    es: {
                        title: '¡Explora la ciencia del espacio en tu biblioteca!',                                        
                        description: "Este evento ha sido diseñado para revisar los principios de los viajes espaciales, con un énfasis en el 50 aniversario del aterrizaje del primer humano en la Luna durante la misión Apolo 11 de la NASA. También destaca los beneficios derivados de la misión Apollo que los terrícolas han obtenido de la investigación sobre la exploración espacial."
                    }
                },

                start: '2022-06-10 12:00',
                end: '2022-06-10 13:00',
                series: {
                    strings: {
                        en: {
                            title: 'NASA @ My Library'
                        },
                        es: {
                            title: 'NASA @ Mi Biblioteca'
                        }
                    }
                }
            }
        ];
        res.end(JSON.stringify(data));
    }
  },
  {
    pattern: '/v1/events/1',
    handle: (req, res) => {
        const data = {
            id: 1,
            strings: {
                en: {
                    title: 'Explore the Science of Space at Your Library!',                                        
                    description: "This event has been engineered to review the principles of space travel, with an emphasis on the 50th anniversary of the landing of the first human on the Moon during NASA's Apollo 11 mission. It also highlights the Apollo mission spinoffs that Earthlings have gained from research into space exploration.",
                    accessibility_information: 'Ramp available at the northwest corner of the building',
                },
                es: {
                    title: '¡Explora la ciencia del espacio en tu biblioteca!',                                        
                    description: "Este evento ha sido diseñado para revisar los principios de los viajes espaciales, con un énfasis en el 50 aniversario del aterrizaje del primer humano en la Luna durante la misión Apolo 11 de la NASA. También destaca los beneficios derivados de la misión Apollo que los terrícolas han obtenido de la investigación sobre la exploración espacial."
                }
            },

            start: '2022-06-10 12:00',
            end: '2022-06-10 13:00',
            series: {
                strings: {
                    en: {
                        title: 'NASA @ My Library'
                    },
                    es: {
                        title: 'NASA @ Mi Biblioteca'
                    }
                }
            }
        };
        res.end(JSON.stringify(data));
    }
  }
];