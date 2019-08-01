<template>
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