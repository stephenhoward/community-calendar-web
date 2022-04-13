<template>
</template>

<script>
const modelForm = require('./model.vue');

module.exports = {
    extends: modelForm,
    methods: {
        updateInfo: function(lang,info) {
            this.mod.info[lang] = info;
        }
    }
};
</script>