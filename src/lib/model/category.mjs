import moment from 'moment';

import { Translatable } from '../model.mjs';


export default class Category extends Translatable {

    static baseUrl() { return '/categories' }

    initEmpty() {

        this.id    = null;
        this.strings  = { en: { name: '', description: '' } };
    }
}
