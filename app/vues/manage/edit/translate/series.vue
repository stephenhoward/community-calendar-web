<template>
    <div class="info">
        <label>Title <input v-model="i18n.title" name="title" placeholder="title"></label>
        <label>Event Description <textarea v-model="i18n.description"></textarea></label>
    </div>
</template>

<script>

module.exports = {
    props: ['info'],
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