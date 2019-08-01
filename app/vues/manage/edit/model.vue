<template>
</template>

<script>
module.exports = {
    props: ['model'],
    data: function() {
        return {
            mod: this.model
        };
    },
    watch: {
        mod: {
            handler: function(newVal,oldVal) {
                this.$emit('update',this.mod);
            },
            deep: true
        }
    }
}
</script>