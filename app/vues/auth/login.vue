<template>
    <div class="login">
        <h1>{{ settings.get('site_title') }}</h1>
        <h3>{{ $t('title') }}</h3>
        <div class="error" v-if="err">{{ err }}</div>
        <div><input type="email"    v-bind:placeholder="$t('email')"    v-model="email"></div>
        <div><input type="password" v-bind:placeholder="$t('password')" v-model="password"></div>
        <button @click="doLogin" type="button">{{ $t("login_button") }}</button>
        <router-link :to="{ name: 'forgot_password', params: { em: this.email }}" >{{ $t("forgot_password") }}</router-link>
    </div>
</template>

<style lang="sass">
body {
    display:               grid;

    grid-template-columns: [ begin ] auto [ end ];
    grid-template-rows:    [ top ] auto [ bottom ];
    justify-items: center;
    align-items: center;
    input {
        display: block;
        font-size: 100%;
        margin: 4px 0;
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
                'title': 'Login',
                'login_button': 'Login',
                email: 'email',
                password: 'password',
                forgot_password: 'Forgot Password?'
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
                    window.app.$router.push('/');
                })
                .catch((error) => {
                    this.err = this.$i18n.te('login.error_' + error )
                        ? this.$i18n.t( 'login.error_' + error )
                        : error;
                });
        },
        doLogout: function() {
            authorize.logout();
        }
    }
}
</script>