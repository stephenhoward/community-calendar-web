const listVue = require('../vues/components/list.vue');
const editVue = require('../vues/manage/editor.vue');

const composeVue = function(type,templateVue,componentVues) {

    let component = Object.assign( { components: componentVues }, templateVue );

    component.methods.type = () => { return type };

    return component;
};

const composeListVue = function(type,vues) {

    let components = {
        'model-summary': vues['model-summary'],
        'model-create':  composeVue( type, editVue, { 'model-form': vues['model-form'] } )
    };

    return composeVue( type, listVue, components );
};

module.exports = { Vue: composeVue, ListVue: composeListVue };
