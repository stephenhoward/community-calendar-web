<style lang="sass">

    @import 'app/scss/_mixins.scss';

</style>

<template>
    <div class="model">
        <label>Name <input v-model="mod.name" /></label>
        <label>Email <input v-model="mod.email" /></label>
        <fieldset>
            <legend>Permissions</legend>
            <div v-for="role in mod.roles">
                <span v-if="role.organization">{{ role.organization }}</span>
                <span v-else>Site-wide</span>
                <select v-model="role.type">
                    <option v-for="role_type in role_types" >{{ role_type }}</option>
                </select>
                <button v-if="role.organization" class="icofont-close"></button>
            </div>
            <button><span class="icofont-plus"></span> Add Organization</button>
        </fieldset>
    </div>
</template>

<script>
const modelForm = require('./model.vue');

module.exports = {
    extends: modelForm,
    data: function() {
        return {
            mod: this.model,
            role_types: [ 'Contributor','Editor','Administrator']
        };
    },
    watch: {
        mod: {
            handler: function(newVal,oldVal) {
                this.$emit('update',this.mod);
            },
            deep: true
        }
    }

}
</script>