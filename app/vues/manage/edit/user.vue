<style lang="sass">

    @import 'app/scss/_mixins.scss';

</style>

<template>
    <div class="user">
        <label>Name <input v-model="user.name" /></label>
        <label>Email <input v-model="user.email" /></label>
        <fieldset>
            <legend>Permissions</legend>
            <div v-for="role in user.roles">
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
const User   = require('../../../lib/model/user');

module.exports = {
    props: ['model'],
    data: function() {
        return {
            user: this.model,
            role_types: [ 'Contributor','Editor','Administrator']
        };
    },
    methods: {
    },
    watch: {
        user: {
            handler: function(newVal,oldVal) {
                this.$emit('update',this.user);
            },
            deep: true
        }
    }

}
</script>