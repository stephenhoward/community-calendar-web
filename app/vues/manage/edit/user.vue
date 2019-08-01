<style lang="sass">

    @import 'app/scss/_mixins.scss';

</style>

<template>
    <div class="model">
        <label>{{ $t('name') }} <input v-model="mod.name" /></label>
        <label>{{ $t('email') }} <input v-model="mod.email" /></label>
        <fieldset>
            <legend>{{ $t('permissions') }}</legend>
            <div v-for="role in mod.roles">
                <span v-if="role.organization">{{ role.organization }}</span>
                <span v-else>{{ $t('side_wide_roles') }}</span>
                <select v-model="role.type">
                    <option v-for="role_type in role_types" >{{ $t(role_type) }}</option>
                </select>
                <button v-if="role.organization" class="icofont-close"></button>
            </div>
            <button><span class="icofont-plus"></span> {{ $t('add_organization') }}</button>
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
    i18n: {
        messages: {
            en: {
                name:             'Name',
                email:            'Email',
                permissions:      'Permissions',
                site_wide_roles:  'Site-wide',
                add_organization: 'Add Organization',
                Contributor:      'Contributor',
                Editor:           'Editor',
                Administrator:    'Administrator'
            },
            es: {},
            fr: {}
        }
    }
}
</script>