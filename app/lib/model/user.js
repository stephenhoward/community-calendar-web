let Model = require('lib/model').Model;

module.exports = class User extends Model {

    static baseUrl() { return this.apiVersion() + '/users' };

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
        this.roles = [];
    }

}
