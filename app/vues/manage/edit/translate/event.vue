<template>
    <div class="info">
        <label>Title <input v-model="i18n.title" name="title" placeholder="title"></label>
        <label>Event Description <textarea v-model="i18n.description"></textarea></label>
        <label>Accessibility Information <textarea v-model="i18n.accessibility_information"></textarea></label>
    </div>
</template>

<script>

module.exports = {
    props: ['info'],
    i18n: {
        messages: {            
            en: {
                accessibility_information: 'Accessibility Information'
            }
        }
    },
    data: function() {

        return { i18n: this.info };
    },
    watch: {
        'i18n': {
            handler: function( newVal, oldVal ) {
                this.$emit('update',newVal);
            },
            deep: true
        },
        'info': function(newVal, oldVal) {
            this.i18n = newVal;
        }
    }

}
</script>