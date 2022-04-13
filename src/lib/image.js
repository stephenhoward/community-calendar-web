const axios  = require('axios');

module.exports = class Image {
    constructor(file) {

        this.file     = null;
        this.filename = '';
    }

    static apiVersion() { return '/v1' }

    static uploadUrl() { return '/site/image' }

    save(){
        let self = this;

        return new Promise( ( resolve, reject ) => {

            data = new FormData();
            data.append('file', this.file, this.file.name);

            axios.post( self.uploadUrl(), data, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
            } )
                .then(  response => resolve( json => self.updateFromJson(json) ) )
                .catch( error    => reject(  error ) );
        });
    }

}
