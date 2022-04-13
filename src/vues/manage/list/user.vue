<template>
    <div class="user">
        <h3>{{ user.name }}</h3>
    </div>
</template>

<script>
module.exports = {
    props: ['model'],
    data: function() {
        return {
            user: this.model
        };
    },
}
</script>