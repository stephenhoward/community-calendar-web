<style lang="sass">
@import 'app/scss/_mixins.scss';
body {
    display:               grid;

    grid-template-columns: [ begin ] auto [ end ];
    grid-template-rows:    [ top ] auto [ bottom ];
    justify-items: center;
    align-items: center;
    div.setup {
            @include auth-form;
        display: inline-block;

        select {
            border: 1px solid #000;
            padding: 3px;
            width: 100%;
        }
        select,input {
            display: inline-block;
            font-size: 100%;
            margin: 4px 0;
        }
        input[type="password"] {
            display: block;
        }
        ol {
            list-style-type: none;
            margin: 0;
            padding: 0;
            li {
                margin: 0;
                padding: 0;
                label {
                span {
                    display: block;
                }
            }
                button {
                    border-radius: 10px;
                }
            }
        }
        span.error {
            display: inline-block;
            color: #f00;
            font-size: 90%;
            margin-top: 20px;
        }
    }
}
</style>

<template>
    <div class="setup">
        <h1>{{ $t('title', { name: settings.get('site_title') }) }}</h1>
        <ol>
            <li v-if="! languageSet">
                <label>
                    <span>{{ $t('select_language') }}</span>
                    <select v-model="user.language">
                        <option v-for="(value,lang) in languages" :value="lang">
                            {{ value.name }}
                        </option>
                    </select>
                </label>
                <button type="button" @click="setLanguage" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
            <li v-else-if="! emailSet">
                <label><span>{{ $t('enter_email') }}</span>
                <input type="email" :placeholder="$t('email_placeholder')" v-model="user.email" @keyup.enter="setEmail"></label>
                <button type="button" @click="setEmail" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
            <li v-else-if="! passwordSet">{{ $t('set_password') }}
                <input type="password" :placeholder="$t('password_placeholder')" v-model="password">
                <input type="password" :placeholder="$t('password2_placeholder')" v-model="password2" @keyup.enter="setPassword">
                <button type="button" @click="setPassword" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
        </ol>
        <span class="error">{{ $t(form_error) }}</span>
    </div>
</template>

<script>
const config = require('../../lib/config');
const auth   = require('../../lib/authorize');
const User   = require('../../lib/model/user');

module.exports ={
    data : () => {

        return {
            settings: config.settings(),
            user: new User({ language: config.settings().default_language }),

            languages:   config.languages(),
            languageSet: false,

            emailSet: false,

            password:    '',
            password2:   '',
            passwordSet: false,

            form_error: ''
        };
    },
    i18n: {
        messages: {
            en: {
                title: '{name} Setup',
                select_language: 'select a language',
                enter_email:     'enter email address',
                email_placeholder: 'email address',
                set_password:    'create a password',
                password_placeholder: 'password',
                password2_placeholder: 'confirm password',

                bad_no_email: 'Please enter an email address',
                bad_email: 'Please use a valid email address',
                missing_password: 'please enter a password',
                missing_password2: 'please re-type your password to confirm',
                bad_password_match: 'Passwords do not match'

            }
        }
    },
    methods: {
        setLanguage: function() {
            if ( this.user.language && this.user.language in this.languages ) {
                this.form_error = '';
                this.languageSet = true;
            }
        },
        setEmail: function() {
            if ( ! this.user.email ) {
                this.form_error = 'bad_no_email';
            }
            else if ( /^\S+@\S+\.\S+$/.test(this.user.email)  ) {
                this.form_error = '';
                this.emailSet = true;
            }
            else {
                this.form_error = 'bad_email';
            }
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
                this.saveSetup();
            }
        },
        saveSetup: function() {
            let self = this;
            auth.login(this.user.email,this.password).then( () => {
                self.user.save().then((json) => {
                    self.user.setPassword(self.password).then(() => {
                        self.$router.push({ name: 'site_settings'});
                    });
                });
            });
        }
    }
}
</script>