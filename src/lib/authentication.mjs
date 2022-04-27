import axios from 'axios';
import Config from './config.mjs';


export default class Authentication {

    constructor(localStore) {

        if ( localStore == null ) {
            throw("Must provide a localStorage object");
        }

        this.localStore = localStore;

        if ( this.localStore.getItem('jwt') ) {
            this._set_token( this._storage().getItem('jwt') );
        }

        this._refresh_timer = null;

    }

    async login(email,password) {

        try {
            let response = await axios.post( this._authUrl('/token'), {
                email    : email,
                password : password
            });

            this._set_token(response.statusText);
            return response.data;
        }
        catch(error) {
            this._unset_token();
            throw( error );
        }
    }

    logout() {
        this._unset_token();
    }

    is_logged_in() {
        let token =  this.localStore.getItem('jw_token');

        if ( token ) {
            token = JSON.parse(token);
            if ( token.exp > Math.floor(Date.now() / 1000) ) {
                return true;
            }
        }
        return false;
    }

    async reset_password( email ) {

        if ( email == undefined || email == '' ) {
            throw("no_email_provided");
        }

        try {
            let response = await axios.post( this._authUrl('/reset'), {
                email: email
            });

            return response.data;

        }
        catch (error) {

            console.log(error);
            throw (error);
        }
    }

    async check_password_reset_token( token ) {

        if ( token == null || token == '' ) {
            throw("Must provide a password reset token");
        }

        try {
            let response = await axios.get( this._authUrl('/reset/' + token) );
            return response.data;
        }
        catch {
            console.log(error);
            throw(error.response.status);
        }
    }

    async use_password_reset_token( token, password ) {

        if ( token == null || token == '' ) {
            throw("no_token_provided");
        }

        if ( password == null || password == '' ) {
            throw("no_password_provided");
        }

        try {
            let response = await axios.post( this._authUrl('/reset/' + token), { password: password });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw(error.response.status);
        }
    }

    jwt() {
        return this.localStore.getItem('jwt');
    }

    _authUrl(path) {

        return '/' + Config.apiVersion + '/auth' + path;
    }

    _wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async _refresh_login(timeout) {

        let timer = timeout - Math.floor(Date.now() / 1000) - 20;

        if ( timer > 0 ) {

            try {
                this._refresh_timer = await this._wait( timer * 1000 );
                let response = await axios.get( this._authUrl('/token'), {} );

                if ( response.status >= 400 ) {
                    throw(response.statusText);
                }

                this._set_token(response.data);
            }
            catch (error) {
                this._unset_token();
                throw( error );
            }
        }
        else {
            this._unset_token();
        }
    }

    _set_token(data) {
        this.localStore.setItem('jwt',data);

        let jw_token = JSON.parse(
            atob( data.split('.')[1].replace('-','+').replace('_','/') )
        );
        this.localStore.setItem('jw_token', JSON.stringify(jw_token) );
        this._refresh_login( jw_token.exp );

    }

    _unset_token() {
        this.localStore.removeItem('jwt');
        this.localStore.removeItem('jw_token');
        if ( this._refresh_timer ) {
            clearTimeout(this._refresh_timer);
            this._refresh_timer = null;
        }
    }

}

// axios.interceptors.request.use( (config) => {
//     let jwt = authentication.jwt();
//     if ( jwt ) {
//         config.headers['Authorization'] = 'Bearer ' + jwt;
//     }
//     return config;
// });

// axios.interceptors.response.use(
//     (response) => { return response },
//     (error)    => {

//         // need to log in:
//         if ( error.response && error.response.status == 401 ) {
//             window.app.$router.push({ name: 'login', params: { error: error.response.status } });
//         }
//         return Promise.reject(error);
//     }
// );
