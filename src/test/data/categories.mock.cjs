module.exports = [
  {
    pattern: '/v1/categories',
    handle: (req, res) => {
        const data = [
            {
                id: 1,
                strings: {
                    en: {
                        name: 'Music',
                        description: "Local concerts and music events",
                    },
                    es: {
                        name: 'Música',
                        description: "Conciertos locales y eventos musicales"
                    }
                }
            },
            {
                id: 2,
                strings: {
                    en: {
                        name: 'Sports',
                        description: "Games to watch, games to play",
                    },
                    es: {
                        name: 'Deportes',
                        description: "Juegos para ver, juegos para jugar"
                    }
                }
            }
        ];
        res.end(JSON.stringify(data));
    }
  },
  {
    pattern: '/v1/categories/1',
    handle: (req, res) => {
        const data = {
            id: 1,
            strings: {
                en: {
                    name: 'Music',
                    description: "Local concerts and music events",
                },
                es: {
                    name: 'Música',
                    description: "Conciertos locales y eventos musicales"
                }
            }
        };
        res.end(JSON.stringify(data));
    }
  },
  {
    pattern: '/v1/categories/2',
    handle: (req, res) => {
        const data = {
            id: 2,
            strings: {
                en: {
                    name: 'Sports',
                    description: "Games to watch, games to play",
                },
                es: {
                    name: 'Deportes',
                    description: "Juegos para ver, juegos para jugar"
                }
            },
        };
        res.end(JSON.stringify(data));
    }
  }
];