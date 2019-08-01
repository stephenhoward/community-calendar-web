<template>
    <div class="info">
        <label>Title <input v-model="i18n.title" name="title" placeholder="title"></label>
        <label>Event Description <textarea v-model="i18n.description"></textarea></label>
        <label>Accessibility Information <textarea v-model="i18n.accessibility_information"></textarea></label>
    </div>
</template>

<script>
const translateForm = require('./model.vue');

module.exports = {
    extends: translateForm,
    i18n: {
        messages: {            
            en: {
                accessibility_information: 'Accessibility Information'
            }
        }
    }
};
</script>