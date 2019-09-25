const moment = require('moment');

let Translatable = require('lib/model').Translatable;

module.exports = class Settings extends Translatable {

    static baseUrl() { return this.apiVersion() + '/site' }

    modelUrl() { return Settings.baseUrl() }

    initEmpty() {
        this.image            = null;
        this.default_language = null;
        this.languages        = [];
        this.info             = {};
    }
}
