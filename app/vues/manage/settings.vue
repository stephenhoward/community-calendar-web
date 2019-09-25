<style lang="sass">

    @import 'app/scss/_mixins.scss';
    div.missing-model {
        @include hstack;
        align-items:     center;
        justify-content: center;
        height:          100%;
        min-height:      100%;

        div.message {
            text-align: center;
            font-size: 14pt;
            opacity: .5;
            margin-bottom: 30px;
        }
    }
</style>

<template>
    <model-edit v-bind:model="model" ></model-edit>
</template>

<script>
const axios     = require('axios');
const compose   = require('../../lib/compose');
const editorVue = require('./components/editor.vue');
const Settings  = require('../../lib/model/settings');

module.exports = {
    data: function() {
        return {
            model:      null,
            model_type: Settings
        };
    },
    created: function() {
        let self = this;

        axios.get( '/v1/site', {
            responseType: 'json'
        } )
            .then( (response) => {
                for ( key in response.data ) {
                    self.model = Settings.newFromJson(response.data);
                }
                console.log(self.mod);
            })
            .catch( (error) => {
                console.log(error);
            });
    },
    components: {
         'model-edit': compose.Vue( editorVue, { 'model-form': require('./edit/settings.vue') } )
    }
};
</script>
