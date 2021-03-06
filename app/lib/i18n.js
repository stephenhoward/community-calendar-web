const Vue     = require('vue');
const VueI18n = require('vue-i18n');
const config  = require('./config');

Vue.use(VueI18n);

window.i18n = new VueI18n({
    locale   : navigator.language.substring(0,2) || config.settings().default_language,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    dateTimeFormats: {
        en: {
            time: {
                hour: 'numeric', minute: 'numeric', hour12: true
            },
            short: {
                month: 'short', day: 'numeric'
            },
            'long': {
                month: 'long', day: 'numeric',
            },
            'long-datetime': {
                weekday: 'long', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', hour12: true
            },
            'month': {
                month: 'long'
            },
            'month-year': {
                month: 'long', year: 'numeric'
            },
            'assist': {
                weekday: 'long', month: 'long', day: 'numeric'
            }
        },
        es: {
            time: {
                hour: 'numeric', minute: 'numeric', hour12: true
            },
            short: {
                month: 'short', day: 'numeric'
            },
            'long': {
                month: 'long', day: 'numeric',
            },
            'long-datetime': {
                weekday: 'long', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', hour12: true
            },
            'month': {
                month: 'long'
            },
            'month-year': {
                month: 'long', year: 'numeric'
            },
            'assist': {
                weekday: 'long', month: 'long', day: 'numeric'
            }
        }
    }
});

module.exports = { i18n: window.i18n };
