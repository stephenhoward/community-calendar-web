<template>
    <div class="info">
        <label>Title <input v-model="i18n.title" name="title" placeholder="title"></label>
        <label>Series Description <textarea v-model="i18n.description"></textarea></label>
    </div>
</template>

<script>
const translateForm = require('./model.vue');

module.exports = {
    extends: translateForm,
}
</script>