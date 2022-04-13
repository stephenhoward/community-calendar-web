<template>
    <div class="info">
        <label>{{ $t('name') }} <input v-model="i18n.name" :placeholder="$t('name')"></label>
        <label>{{ $t('description') }} <textarea v-model="i18n.description"></textarea></label>
    </div>
</template>

<script>
const translateForm = require('./model.vue');

module.exports = {
    extends: translateForm,
    i18n: {
        messages: {
            en: {
                name: 'Title',
                description: 'Description'
            }
        }
    }
};
</script>