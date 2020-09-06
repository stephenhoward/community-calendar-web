let Model = require('lib/model').Model;

module.exports = class Org extends Model {

    static baseUrl() {
        return this.apiVersion() + '/site/orgs'
    };

    modelUrl() { return this.id ? Org.baseUrl() + '/' + this.id : Org.baseUrl() }

    initEmpty() {
        this.name = '';
    }
}
