<template>
    <div class="login">
        <h1>{{ settings.get('site_title') }}</h1>
        <h3>{{ $t('title') }}</h3>
        <div class="error" v-if="err">{{ err }}</div>
        <input type="email"    v-bind:placeholder="$t('email')"    v-model="email">
        <input type="password" v-bind:placeholder="$t('password')" v-model="password">
        <router-link :to="{ name: 'forgot_password', params: { em: this.email }}" >{{ $t("forgot_password") }}</router-link>
        <button @click="doLogin" type="button">{{ $t("login_button") }}</button>
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
    div.login {
        @include auth-form;
    }
}
</style>

<script>
const config    = require('../../lib/config');
const authorize = require('../../lib/authorize.js');

module.exports ={
    props    : ['error','em'],
    data     : () => {

        return {
            settings : config.settings(),
            err      : '',
            email    : '',
            password : ''
        };
    },
    i18n: {
        messages: {
            en: {
                'title': 'Sign in to your account',
                'login_button': 'Sign in',
                email: 'email',
                password: 'password',
                forgot_password: 'Forgot Password?',
                UnknownLogin: 'unknown email or password',
                '400': 'bad sign in'
            }
        }
    },
    created: function() {
        this.err   = this.error || '';
        this.email = this.em || '';
    },
    methods : {
        doLogin: function() {
            authorize.login(this.email,this.password)
                .then(() => {
                    this.err = '';
                    window.app.$router.push('/manage');
                })
                .catch((response) => {
                    this.err = this.$i18n.te( response.data )
                        ? this.$i18n.t( response.data )
                        : this.$i18n.te( response.status )
                            ? this.$i18n.t( response.status )
                            : response.status;
                });
        },
        doLogout: function() {
            authorize.logout();
        }
    }
}
</script>