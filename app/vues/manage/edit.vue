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
            <model-edit v-bind:model="model" @close="closeEditor"></model-edit>
        </div>
        <div v-else class="missing-model">
            <div class="message">{{ $t('model_not_found', { model: model_type } ) }}</div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['type','id'],
        data: function() {
            return {
                model:      null,
                model_type: this.type.name
            };
        },
        i18n: {
            messages: {
                en: {
                    model_not_found: '{model} Not Found'
                },
                es: {},
                fr: {}
            }
        },
        created: function() {
            this.type.fetch(this.id).then( (model) => { this.model = model } );
        },
        methods: {
            closeEditor: function(model) {
                this.$router.push({ name: 'list_' + this.model_type.toLowerCase() })
            }
        }
    };
</script>
