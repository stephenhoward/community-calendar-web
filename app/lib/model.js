const axios  = require('axios');

class Model {
    constructor(attrs) {

        this.initEmpty();
        this.updateFromJson(attrs);
    }

    updateFromJson(json) {
        for ( var attr in json) {
            this[attr] = json[attr];
        }
    }

    initEmpty() {
        // override me
    }

    static apiVersion() { return '/v1' }

    static fetch(id) {

        let cls = this;

        return new Promise( ( resolve, reject ) => {

            axios.get( cls.baseUrl() + '/' + id , {
                repsonseType: 'json',
            })
                .then( (response) => {
                    resolve( this.newFromJson(response.data) );
                })
                .catch( (error) => {
                    console.log(error);
                    reject(error);
                    // TODO
                });

        });

    }

    dump() {
        let json = {};

        for ( var attr in this ) {
            if ( typeof this[attr] == 'array' ) {
                json[attr] = [
                    this[attr].map( i => i instanceof Model ? i.dump() : i )
                ];
            }
            else if ( typeof this[attr] instanceof Model ) {
                json[attr] = this[attr].dump()
            }
            else {
                json[attr] = this[attr];
            }
        }

        if ( json.id == null ) {
            delete json.id;
        }

        return json;
    }

    save(){
        let self = this;

        return new Promise( ( resolve, reject ) => {

            axios.post( self.modelUrl(), self.dump() )
                .then(  (response) => {
                    self.updateFromJson(response.data);
                    resolve( self );
                } )
                .catch( (error) => {
                    console.log(error);
                    reject(error);
                } );
        });
    }

    static list(params) {

        let cls = this;

        return new Promise( (resolve, reject ) => {

            axios.get( cls.baseUrl(), { responseType: 'json', params: params } )
                .then(  response => resolve( response.data.map( json => cls.newFromJson(json) )  ) )
                .catch( error    => reject(  error  ) );
        });
    }

    static newFromJson(json) {
        return new this(json);
    }
}

class Translatable extends Model {

    updateFromJson(attrs) {
        super.updateFromJson(attrs);

        if ( 'info' in attrs ) {
            let info = {};

            for( var i=0; i < attrs.info.length; i++ ) {
                let lang   = attrs.info[i].language;
                delete attrs.info[i].language;
                info[lang] = attrs.info[i];
            }

            this.info = info;
        }
    }

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

    dump() {
        let json = super.dump();

        if( 'info' in json ) {
            let info = [];
            for( var lang in json.info ) {
                let i = json.info[lang];

                i.language = lang;

                info.push(i);
            }

            json.info = info;
        }

        return json;
    }
}

module.exports = {
    Model: Model,
    Translatable: Translatable
}
