window.Vue    = require('vue');
let VueRouter = require('vue-router');
let VueI18n   = require('vue-i18n');
let App       = require('./vues/app.vue');

console.log();

window.i18n = new VueI18n({
    locale   : navigator.language.substring(0,2) || 'en',
    dateTimeFormats: {
        en: {
            time: {
                hour: 'numeric', minute: 'numeric', hour12: true
            },
            short: {
                month: 'short', day: 'numeric'
            }
        },
        es: {
            time: {
                hour: 'numeric', minute: 'numeric', hour12: true
            },
            short: {
                month: 'short', day: 'numeric'
            }
        }
    }
});

window.app = new Vue({
    render : h => h(App),
    i18n   : i18n,
    router : new VueRouter({
        routes   : require('./lib/router.js').routes
    })
});

app.$mount('#app');

let $router = window.app.$router;
