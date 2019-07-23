<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.editor {
        background-color: #fff;
        padding: 15px;
        border-radius: 6px;
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