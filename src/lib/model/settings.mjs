import { Translatable } from '../model.mjs';

export default class Settings extends Translatable {

    static baseUrl() { return '/site' }

    initEmpty() {
        this.image            = null;
        this.default_language = null;
        this.languages        = [];
        this.strings          = {};
    }
}
