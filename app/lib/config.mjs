import axios from 'axios';
import Settings from './model/settings.mjs';

export default class Config {

    static apiVersion = 'v1';

    constructor() {
        this.apiVersion = Config.apiVersion;
    }

    async init() {

        let settings_response = await axios.get('/'+this.apiVersion + '/site');
        let languages_response = await axios.get('/'+this.apiVersion + '/site/languages');
        Config._settings = settings_response.data;
        Config._languages = languages_response.data;

    }
    
    settings() {
        return Config._settings;
    }

    languages() {
        return Config._languages;
    }
}
