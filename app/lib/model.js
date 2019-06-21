class Model {
    constructor(attrs) {
        this.attrs = attrs;

        for ( var attr in attrs) {
            this[attr] = attrs[attr];
        }
    }
}

class Translatable extends Model {

    get(key) {
        if ( key in this ) {
            return this[key];
        }
        if ( this.info ) {
            let languages = [ i18n.locale, 'en' ];
            for( const lang of languages ) {
                if ( lang in this.info && key in this.info[lang] ) {
                    return this.info[lang][key];
                }
            }
        }
        return '';
    }
}

module.exports = {
    Model: Model,
    Translatable: Translatable
}
