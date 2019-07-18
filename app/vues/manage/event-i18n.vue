<template>
    <div class="info">
        <label>Title <input :model="i18n.title" name="title" placeholder="title"></label>
        <label>Event Description <textarea :model="i18n.description"></textarea></label>
        <label>Accessibility Information <textarea :model="i18n.accessibility_information"></textarea></label>
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
        return {
            i18n: this.info
        };
    },

}
</script>