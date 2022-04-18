<template>
    <div class="forgot_password">
        <h1>{{ settings.get('site_title') }}</h1>
        <h3>{{ $t('title') }}</h3>
        <p>{{ $t('instructions') }}</p>
        <div class="error" v-if="error">{{ error }}</div>
        <input type="email" v-bind:placeholder="$t('email')" v-model="email">
        <button v-on:click="startReset" type="button">{{ $t('go_button') }}</button>
        <router-link :to="{ name: 'login', params: { em: this.email }}" >{{ $t("login_link") }}</router-link>
    </div>
</template>

<style lang="sass">
@import 'app/scss/_mixins.scss';

body {
    display:               grid;

    grid-template-columns: [ begin ] auto [ end ];
    grid-template-rows:    [ top ] auto [ bottom ];
    justify-items: center;
    align-items: center;
    div.forgot_password {
        @include auth-form;
    }
}
</style>

<script>
const config    = require('../../lib/config');
const authorize = require('../../lib/authorize.js');

module.exports = {
    props    : ['em','err'],
    data     : () => {
        return {
            settings : config.settings(),
            error: '',
            email: ''
        };
    },
    created: function() {
        this.email = this.em  || '';
        this.error = this.err || '';
    },
    i18n: {
        messages: {
            en: {
                title: 'Forgot your password?',
                instructions: 'No problem. Enter your email address and we will email you a password reset link.',
                email: 'your email address',
                go_button: 'send password reset',
                login_link: 'back to sign in',
                error_400: 'There is a problem with the email you submitted',
                error_404: 'We could not find an account with that email address',
                error_500: 'Oops. The server ran into an error. Please contact support'

            }
        }
    },
    methods : {
        startReset: function() {
            let self = this;

            authorize.reset_password( this.email )
                .then( (response) => {
                    self.$router.push({ name:'reset_password', params: { email: this.email } });
                })
                .catch( (error) => {
                    self.error = self.$i18n.te('forgot_password.error_' + error )
                        ? self.$i18n.t( 'forgot_password.error_' + error )
                        : error;
                });
        },
    }
};
</script>