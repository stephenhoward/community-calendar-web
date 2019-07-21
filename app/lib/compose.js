const listVue        = require('../vues/manage/list.vue');
const editVue        = require('../vues/manage/edit.vue');
const editorVue      = require('../vues/manage/components/editor.vue');
const translationVue = require('../vues/manage/components/translate.vue');

const composeVue = function(templateVue,componentVues) {

    return Object.assign( { components: componentVues }, templateVue );
};

const composeListVue = function(vues) {

    let components = {
        'model-summary': vues['model-summary'],
        'model-create':  composeVue( editorVue, { 'model-form': vues['model-form'] } )
    };

    return composeVue( listVue, components );
};

const composeEditVue = function(formVue) {

    let components = {
        'model-edit':  composeVue( editorVue, { 'model-form': formVue } )
    };

    return composeVue( editVue, components );
};

const composeTranslationVue = function(formVue) {

    return composeVue( translationVue, {'translate-form': formVue } );
}

module.exports = {
    Vue:            composeVue,
    ListVue:        composeListVue,
    editVue:        composeEditVue,
    translationVue: composeTranslationVue
};
