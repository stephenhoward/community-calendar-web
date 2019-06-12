window.Vue    = require('vue');
let VueRouter = require('vue-router');
let VueI18n   = require('vue-i18n');
let App       = require('./vues/app.vue');

window.app = new Vue({
    render: h => h(App),
    router : new VueRouter({
        routes   : require('./lib/router.js').routes
    }),
    i18n   : new VueI18n({
        locale   : 'en'
    }),
});

app.$mount('#app');

let $router = window.app.$router;
