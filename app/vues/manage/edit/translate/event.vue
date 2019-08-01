<template>
    <div class="info">
        <label>{{ $t('title') }} <input v-model="i18n.title" :placeholder="$t('title')"></label>
        <label>{{ $t('description') }} <textarea v-model="i18n.description"></textarea></label>
        <label>{{ $t('accessibility_information') }} <textarea v-model="i18n.accessibility_information"></textarea></label>
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
                description: 'Description',
                accessibility_information: 'Accessibility Information'
            }
        }
    }
};
</script>