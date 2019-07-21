<template>
    <div class="event">
        <h3>{{ series.get('title') }}</h3>
    </div>
</template>

<script>
module.exports = {
    props: ['model'],
    data: function() {
        return {
            series: this.model
        };
    },
}
</script>