<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.model > button {

    }

</style>

<template>
    <div class="model">
        <model-form v-bind:model="m"></model-form>
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
    methods: {
        createModel: function() {
            this.$emit('close',this.m);
        }
    }

}
</script>