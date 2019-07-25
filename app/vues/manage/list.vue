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
        <button type="button" @click="newModel">New {{ model_type }}  <span class="icofont-plus"></span></button>
        <model-summary v-for="model in models" v-bind:model="model" ></model-summary>
        </div>
        <div v-else class="empty-list">
            <div>
                <div class="message">No {{ model_type }}s</div>
                <button type="button" @click="newModel">New {{ model_type }} <span class="icofont-plus"></span></button>
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
        data: function() {
            return {
                models:        [],
                showNew:       false,
                current_model: null,
                model_type:    this.type.name,
            };
        },
        created: function() {
            this.type.list().then( (models) => { this.models = models } );
        },
        methods: {
            newModel: function() {
                let type = this.type;
                this.current_model = new type({});
                this.showNew = true;
            },
            closeNew: function(model) {
                if ( model ) {
                    model.save();
                    this.models.unshift(model);
                }
                this.current_model = null;
                this.showNew       = false;
            }
        }
    };
</script>
