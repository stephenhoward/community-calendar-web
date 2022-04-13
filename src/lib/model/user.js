let Model = require('lib/model').Model;
const config = require('lib/config');

module.exports = class User extends Model {

    static baseUrl() {
        return config.settings().needs_setup
            ? this.apiVersion() + '/site/initialize'
            : this.apiVersion() + '/site/users'
    };

    modelUrl() { return this.id ? User.baseUrl() + '/' + this.id : User.baseUrl() }

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
        return this.save()
    }

}
