<style lang="sass">

    @import 'app/scss/_mixins.scss';
    div.empty-list {
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
    <div class="model-list">
        <div v-if="models.length > 0">
        <button type="button" @click="newModel">{{ $t('New_' + model_type) }}  <span class="icofont-plus"></span></button>
        <model-summary @open="openModel(model)" v-for="model in models" v-bind:model="model" v-bind:key="model.id"></model-summary>
        </div>
        <div v-else class="empty-list">
            <div>
                <div class="message">{{ $t( 'No_' + model_type ) }}</div>
                <button type="button" @click="newModel">{{ $t( 'New_' + model_type ) }} <span class="icofont-plus"></span></button>
            </div>
        </div>
        <div v-if="showNew" class="popup-wrapper">
            <model-create v-bind:model="current_model" @close="closeNew"></model-create>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['type'],
        i18n: {
            messages: {
                en: {
                    'No_User': 'No People',
                    'New_User': 'New Person',
                    'No_Event': 'No Events',
                    'New_Event': 'New Event',
                    'No_Series': 'No Series',
                    'New_Series': 'New Series',
                    'No_Category': 'No Categories',
                    'New_Category': 'New Category'
                }
            }
        },
        data: function() {
            return {
                models:        [],
                showNew:       false,
                current_model: null,
                model_type:    this.type.name,
            };
        },
        created: function() {
            let self = this;
            this.type.list().then( (models) => { self.models = models } );
        },
        methods: {
            newModel: function() {
                let type = this.type;
                this.current_model = new type({});
                this.showNew = true;
            },
            closeNew: function(model) {
                if ( model ) {
                    this.models.unshift(model);
                }
                this.current_model = null;
                this.showNew       = false;
            },
            openModel: function(model) {
                this.$router.push({ name: 'edit_' + this.model_type.toLowerCase(), params: { id: model.id } });
            }
        }
    };
</script>
