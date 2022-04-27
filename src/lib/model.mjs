import axios from  'axios';

export class Model {
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

    static modelUrl(id) {
        let url = this.apiVersion() + this.baseUrl();
        if ( id ) {
            url = url + '/' + id
        }

        return url;
    }

    modelUrl(id) {
        let cls = this.constructor;
        return cls.modelUrl(this.id);
    }

    static apiVersion() { return '/v1' }

    static async fetch(id) {
        try {
            let response = await axios.get( this.modelUrl(id), { repsonseType: 'json' });
            if ( response.status >= 300 ) {
                return null;
            }
            return this.newFromJson(response.data);
        }
        catch (error) {
            console.log(error);
            throw(error);
        }
    }

    dump() {
        let json = {};

        for ( var attr in this ) {
            if ( Array.isArray(this[attr]) ) {
                json[attr] = this[attr].map( (i) => {
                    if ( i instanceof Model ) {
                        if ( i.id ) {
                            return i.id
                        }
                        else {
                            return i.dump()
                        }
                    }
                    else {
                        return i
                    }
                });
            }
            else if ( this[attr] instanceof Model ) {
                json[attr] = this[attr].dump()
            }
            else if ( this[attr] !== null ) {
                json[attr] = this[attr];
            }
        }

        if ( json.id == null ) {
            delete json.id;
        }

        return json;
    }

   async save() {

        try {
            let response = await axios.post( this.modelUrl(this.id), this.dump() );

            this.updateFromJson(response.data);
            return this;
        }
        catch (error) {
            console.log(error);
            throw(error);
        }
    }

    static async list(params) {

        let cls = this;

        try {
            let response = await axios.get( cls.modelUrl(), { responseType: 'json', params: params } )
            return response.data.map( json => cls.newFromJson(json) );
        }
        catch (error) {
            throw(error);
        }
    }

    static newFromJson(json) {
        return new this(json);
    }
}

export class Translatable extends Model {

    get(locales, key) {
        if ( this.strings ) {
            for( const locale of locales ) {
                if ( locale in this.strings && key in this.strings[locale] ) {
                    return this.strings[locale][key];
                }
            }
        }
        return '';
    }

}
