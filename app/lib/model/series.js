const moment = require('moment');

let Translatable = require('lib/model').Translatable;

module.exports = class Series extends Translatable {

    static baseUrl() { return this.apiVersion() + '/series' }

    modelUrl() { return this.id ? Series.baseUrl() + '/' + this.id : Series.baseUrl() }

    static newFromJson(json) {

        for( var date of [ 'start', 'end' ] ) {

            if ( json[date] ) {
                json[date] = moment(json[date],'YYYY-MM-DD HH:mm');
            }
        }

        if ( json.parent ) {
            json.parent = new Series(json.parent);
        }

        return new Series(json);
    }

    initEmpty() {

        this.id    = null;
        this.info  = { en: { title: '', description: '', accessibility: '' } };
        this.start = null;
        this.end   = null;
    }
}
