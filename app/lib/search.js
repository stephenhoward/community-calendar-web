const axios = require('axios');

function search(params) {

    return new Promise( ( resolve, reject ) => {

        axios.get( '/v1/events', {
            repsonseType: 'json',
            query: params
        })
            .then( (response) => {
                let json = response.data;

                resolve(json)
            })
            .catch( (error) => {
                console.log(error);
                reject(error)
                // TODO
            });

    });
}