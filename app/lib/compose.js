const listVue        = require('../vues/manage/list.vue');
const editVue        = require('../vues/manage/edit.vue');
const editorVue      = require('../vues/manage/components/editor.vue');
const translationVue = require('../vues/manage/components/translate.vue');

const composeVue = function(type,templateVue,componentVues) {

    let component = Object.assign( { components: componentVues }, templateVue );

    component.methods.type = () => { return type };

    return component;
};

const composeListVue = function(type,vues) {

    let components = {
        'model-summary': vues['model-summary'],
        'model-create':  composeVue( type, editorVue, { 'model-form': vues['model-form'] } )
    };

    return composeVue( type, listVue, components );
};

const composeEditVue = function(type,formVue) {

    let components = {
        'model-edit':  composeVue( type, editorVue, { 'model-form': formVue } )
    };

    return composeVue( type, editVue, components );
};

const composeTranslationVue = function(type,formVue) {

    return composeVue( type, translationVue, {'translate-form': formVue } );
}

module.exports = {
    Vue:            composeVue,
    ListVue:        composeListVue,
    editVue:        composeEditVue,
    translationVue: composeTranslationVue
};
