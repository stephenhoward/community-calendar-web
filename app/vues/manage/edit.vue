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
    <div class="model-editor">
        <div v-if="model">
            <model-edit v-bind:model="current_model" @close="closeEditor"></model-edit>
        </div>
        <div v-else class="missing-model">
            <div class="message">{{ model_type }} Not Found</div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['id'],
        data: function() {
            return {
                model: null,
            };
        },
        created: function() {
            this.type().fetch(this.id).then( (model) => { this.model = model } );
        },
        computed: {
            model_type: function() { return this.type().name }
        },
        methods: {
            closeEditor: function(model) {
                if ( model ) {
                    this.model = model;
                    this.model.save();
                }
            }
        }
    };
</script>
