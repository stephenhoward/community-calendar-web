import { Model } from '../../../app/lib/model.js';

module.exports = class MockModel extends Model {

    static baseUrl() { return this.apiVersion() + '/mock' }

    modelUrl() { return this.id ? Event.baseUrl() + '/' + this.id : Event.baseUrl() }

    list() {
        return new Promise( (resolve, reject) => {
            resolve([]);
        });
    }

    save() {
        return new Promise( (resolve, reject) => {
            resolve({});
        });        
    }

}
