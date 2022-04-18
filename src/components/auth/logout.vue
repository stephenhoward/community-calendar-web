<template>
    <div class="logout">
    </div>
</template>

<script>
const authorize = require('../../lib/authorize.js');

module.exports ={
    data     : () => {
        return { };
    },
    beforeRouteEnter: function(to,from,next) {
        authorize.logout();
        next( vm => {

            vm.$router.replace('/');
        });
    }
}
</script>