let Model = require('lib/model').Model;

module.exports = class User extends Model {

    static baseUrl() { return this.apiVersion() + '/users' };

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
