const axios  = require('axios');

class Model {
    constructor(attrs) {

        this.initEmpty();
        this.attrs = attrs;

        for ( var attr in attrs) {
            this[attr] = attrs[attr];
        }
    }

    static apiVersion() { return '/v1' }

    static fetch(id) {

        let cls = this;

        return new Promise( ( resolve, reject ) => {

            // eventually need a baseUrl class property
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
