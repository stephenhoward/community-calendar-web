const moment = require('moment');

let Translatable = require('lib/model').Translatable;

module.exports = class Category extends Translatable {

    static baseUrl() { return this.apiVersion() + '/categories' }

    modelUrl() { return this.id ? Category.baseUrl() + '/' + this.id : Category.baseUrl() }

    initEmpty() {

        this.id    = null;
        this.info  = { en: { name: '', description: '' } };
    }
}
