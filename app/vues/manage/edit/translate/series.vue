<template>
    <div class="info">
        <label>{{ $t('title') }} <input v-model="i18n.title" :placeholder="$t('title')"></label>
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
                title: 'Title',
                description: 'Description'
            }
        }
    }
}
</script>