window.Vue      = require('vue');
const VueRouter = require('vue-router');
const App       = require('./vues/app.vue');
const config    = require('./lib/config');

config.init().then( () => {

    window.app = new Vue({
        render : h => h(App),
        i18n   : require('./lib/i18n').i18n,
        router : new VueRouter({
            routes   : require('./lib/router.js').routes
        })
    });

    app.$mount('#app');
});
