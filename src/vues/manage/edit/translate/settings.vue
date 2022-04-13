<template>
    <div class="info">
        <label>{{ $t('site_title') }} <input v-model="i18n.site_title" :placeholder="$t('site_title')"></label>
    </div>
</template>

<script>
const translateForm = require('./model.vue');

module.exports = {
    extends: translateForm,
    i18n: {
        messages: {
            en: {
                site_title: 'Site Title',
            }
        }
    }
};
</script>