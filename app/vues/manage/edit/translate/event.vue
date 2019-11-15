<template>
    <div class="info">
        <label>{{ $t('title') }}<br> <input type="text" v-model="i18n.title" ></label><br>
        <label>{{ $t('description') }}<br> <textarea v-model="i18n.description"></textarea></label><br>
        <label>{{ $t('accessibility_information') }}<br> <textarea v-model="i18n.accessibility_information"></textarea></label>
    </div>
</template>

<script>
const translateForm = require('./model.vue');

module.exports = {
    extends: translateForm,
    i18n: {
        messages: {
            en: {
                title: 'Event Title',
                description: 'Description',
                accessibility_information: 'Accessibility Information'
            }
        }
    }
};
</script>