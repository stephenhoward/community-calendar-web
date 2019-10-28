<template>
    <div class="password_reset_sent">
        <ol>
            <li v-if="! codeValidated">
                <h3>{{ $t('check_email_title') }}</h3>
                <p>{{ $t('check_email') }} {{ this.email }}.</p>
                <input v-model="reset_code" :placeholder="$t('reset_code')" >
                <button @click="submitResetCode">{{ $t('reset_button') }}</button>
                <router-link :to="{ name: 'login', params: { em: this.email }}" >{{ $t("login_link") }}</router-link>
            </li>
            <li v-else>
                <h3>{{ $t('code_validated_title') }}</h3>
                <p>{{ $t('code_validated') }}</p>
                <input type="password" :placeholder="$t('password_placeholder')" v-model="password">
                <input type="password" :placeholder="$t('password2_placeholder')" v-model="password2" @keyup.enter="setPassword">
                <button type="button" @click="setPassword" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
        </ol>
        <span class="error">{{ $t(form_error) }}</span>
    </div>
</template>

<script>
const authorize = require('../../lib/authorize.js');

module.exports = {
    props: ['email'],
    data: () => {
        return {
            reset_code: '',
            codeValidated: false,
            password:    '',
            password2:   '',
            form_error: ''
        }
    },
    i18n: {
        messages: {
            en: {
                check_email_title: 'Password Reset Sent',
                check_email: 'We have sent a code to reset your password to',
                code_validated_title: 'Valid Code',
                code_validated: 'Please set a new password',
                login_link: 'back to login',
                reset_code: 'reset code',
                reset_button: 'submit code',
                password_placeholder: 'password',
                password2_placeholder: 'confirm password',

                bad_token: 'invalid or expired token',
                missing_password: 'please enter a password',
                missing_password2: 'please re-type your password to confirm',
                bad_password_match: 'Passwords do not match'                
            }
        }
    },
    methods: {
        submitResetCode: function() {
            let self = this;

            this.form_error = '';
            authorize.check_password_token(this.reset_code)
                .then(  () => { self.codeValidated = true } )
                .catch( () => { self.form_error = 'bad_token' } )
        },
        setPassword: function() {
            if ( ! this.password.length ) {
                this.form_error = 'missing_password';
            }
            else if ( ! this.password2.length ) {
                this.form_error = 'missing_password2';
            }
            else if ( this.password != this.password2 ) {
                this.form_error = 'bad_password_match';
            }
            else {
                this.form_error = '';
                authorize.use_password_token(this.reset_code, this.password)
                    .then(  () => window.app.$router.push('/login') )
                    .catch( () => self.form_error = 'reset_error'  )
            }
        },
    }
};
</script>

