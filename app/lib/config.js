const axios = require('axios');
const Settings = require('./model/settings');

class Config {

    init() {
        return Promise.all([
            axios.get('/v1/site'),
            axios.get('/v1/site/languages')
        ])
        .then( (values) => {
            Config._settings  = new Settings( values[0].data );
            Config._languages = values[1].data;
        });
    }
    
    settings() {
        return Config._settings;
    }

    languages() {
        return Config._languages;
    }
}

module.exports = new Config();