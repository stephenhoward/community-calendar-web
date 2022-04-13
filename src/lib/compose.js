const listPage       = require('../vues/manage/list.vue');
const editPage       = require('../vues/manage/edit.vue');
const editorVue      = require('../vues/manage/components/editor.vue');
const translationVue = require('../vues/manage/components/translate.vue');

const composeVue = function(templateVue,componentVues) {

    if( typeof componentVues != 'object' ) {
        throw new Error("must supply child components");
    }
    return Object.assign( { components: componentVues }, templateVue );
};

const composeListPage = function(vues) {

    if (
        typeof vues != 'object' ||
        !( 'model-summary' in vues ) ||
        !( 'model-form' in vues )
    ) {
        throw new Error("must supply an object with model-summary and model-form components");
    }

    let components = {
        'model-summary': vues['model-summary'],
        'model-create':  composeVue( editorVue, { 'model-form': vues['model-form'] } )
    };

    return composeVue( listPage, components );
};

const composeEditPage = function(formVue) {

    if ( typeof formVue == undefined || ! Object.keys(formVue).length ) {
        throw new Error("must supply a component to render the model's edit form");
    }

    let components = {
        'model-edit':  composeVue( editorVue, { 'model-form': formVue } )
    };

    return composeVue( editPage, components );
};

const composeTranslationVue = function(formVue) {

    return composeVue( translationVue, {'translate-form': formVue } );
}

module.exports = {
    Vue:            composeVue,
    listPage:       composeListPage,
    editPage:       composeEditPage,
    translationVue: composeTranslationVue
};
