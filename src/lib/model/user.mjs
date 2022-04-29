import { Model } from '../model.mjs';

export default class User extends Model {

    static baseUrl() { return '/site/users' }
        // return config.settings().needs_setup
        //     ? this.apiVersion() + '/site/initialize'
        //     : this.apiVersion() + '/site/users'

    hasRole(...roles) {
        for (var role of roles) {
            if ( this.roles[role] ) {
                return true;
            }
        }
        return false;
    }

    initEmpty() {
        this.email    = '';
        this.language = '';
        this.roles    = [];
    }

    setPassword(password) {
        this.password = password;
        return this.save();
    }

}
