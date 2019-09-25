<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.editor {
        background-color: $light-mode-panel-background;
        padding: 15px;
        border-radius: 6px;

        @include dark-mode {
            background-color: $dark-mode-panel-background;
        }

        & > button {

        }
    }

</style>

<template>
    <div class="editor" tabindex="-1">
        <model-form v-bind:model="m" @update="updateModel"></model-form>
        <button type="button" @click="$emit('close')">{{ $t('close') }}</button>
        <button v-if="m.id" type="button" @click="createModel">{{ $t('save') }}</button>
        <button v-else      type="button" @click="createModel">{{ $t('create') }}</button>
    </div>
</template>

<script>

module.exports = {
    props: ['model'],
    i18n: {
        messages: {
            en: {
                close:  'Cancel',
                create: 'Create',
                save:   'Save'
            },
            es: {
                close:  'Cancelar',
                create: 'Crear',
                save:   'Guardar'
            },
            fr: {
                close:  'Annuler',
                create: 'Créer',
                save:   'Enregistrer'
            }
        }
    },
    data: function() {
        return {
            m: this.model
        };
    },
    mounted: function() {
        this.$el.focus();
    },
    methods: {
        createModel: function() {
            this.m.save();
            this.$emit('close',this.m);
        },
        updateModel: function(model) {
            this.m = model;
        }
    },
    watch: {
        model: function(newVal,oldVal) {
            console.log('prop model changed');
            this.m = newVal;
        }
    }

}
</script>