module.exports = class Event {
    constructor(attrs) {
        this.attrs = attrs;

        for ( var attr in attrs) {
            this[attr] = attrs[attr];
        }
    }

    get(key) {
        if ( key in this ) {
            return this[key];
        }
        if ( this.info ) {
            for( const lang of ['en','es'] ) {
                if ( lang in this.info && key in this.info[lang] ) {
                    return this.info[lang][key];
                }
            }
        }
        return '';
    }
}
