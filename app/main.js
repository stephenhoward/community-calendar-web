window.Vue    = require('vue');
let VueRouter = require('vue-router');
let App       = require('./vues/app.vue');


window.app = new Vue({
    render : h => h(App),
    i18n   : require('./lib/i18n').i18n,
    router : new VueRouter({
        routes   : require('./lib/router.js').routes
    })
});

app.$mount('#app');

let $router = window.app.$router;
