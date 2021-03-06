const moment = require('moment');

let Translatable = require('lib/model').Translatable;

module.exports = class Event extends Translatable {

    static baseUrl() { return this.apiVersion() + '/events' }

    modelUrl() { return this.id ? Event.baseUrl() + '/' + this.id : Event.baseUrl() }

    static newFromJson(json) {

        for( var date of [ 'start', 'end' ] ) {

            if ( json[date] ) {
                json[date] = moment(json[date],'YYYY-MM-DD HH:mm');
            }
        }

        if ( json.parent ) {
            json.parent = new Event(json.parent);
        }

        return new Event(json);
    }

    initEmpty() {

        this.id    = null;
        this.info  = { en: { title: '', description: '', accessibility_information: '' } };
        this.start = null;
        this.end   = null;
    }
}
