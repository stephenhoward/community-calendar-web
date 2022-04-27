module.exports = [
  {
    pattern: '/v1/site/languages',
    handle: (req, res) => {
        const data ={
            'en': {name:"English"},
            'es': {name:'Español'},
            'fr': {name:'Français'}
        };
        res.end(JSON.stringify(data));
    }
  },
  {
    pattern: '/v1/site',
    handle: (req, res) => {
        const data = {
            strings: {
                'en' : {
                    site_title: 'Event Calendar',
                }
            },
            languages: ['en','es']
        };
        res.end(JSON.stringify(data));
    }
  }
];