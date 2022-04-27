import axios from 'axios';
import Settings from './model/settings.mjs';
import { Model } from './model.mjs';

export default class Config {

    static async init() {

        if( Config._settings && Config._languages ) {
            return new Config();
        }

        await Config._load_settings();
        return new Config();
    }

    static async _load_settings() {

        try {
            let languages_response = await axios.get( Model.apiVersion() + '/site/languages');
            Config._settings = await Settings.fetch();
            Config._languages = languages_response.data;
        }
        catch( error ) {
            Config._settings = new Settings({});
            Config._languages = [];
        }

    }
    
    settings() {
        return Config._settings;
    }

    languages() {
        return Config._languages;
    }
}
