<style lang="scss">

@import '../../../assets/css/mixins.scss';

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
            color: #f50;
            font-size: 90%;
            margin-top: 20px;
        }
    }
}
</style>

<template>
    <div class="setup">
        <h1>{{ t('title', { name: mt(settings, 'site_title') }) }}</h1>
        <ol>
            <li id="set-language" v-if="! state.languageSet">
                <label>
                    <span>{{ t('select_language') }}</span>
                    <select v-model="state.user.language">
                        <option v-for="(value,lang) in state.languages" :value="lang">
                            {{ value.name }}
                        </option>
                    </select>
                </label>
                <button type="button" @click="setLanguage" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
            <li id="set-email" v-else-if="! state.emailSet">
                <label><span>{{ t('enter_email') }}</span>
                <input type="email" :placeholder="t('email_placeholder')" v-model="state.user.email" @keyup.enter="setEmail"></label>
                <button type="button" @click="setEmail" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
            <li id="set-password" v-else-if="! state.passwordSet">{{ t('set_password') }}
                <input type="password" :placeholder="t('password_placeholder')" v-model="state.password">
                <input type="password" :placeholder="t('password2_placeholder')" v-model="state.password2" @keyup.enter="setPassword">
                <button type="button" @click="setPassword" class="icofont-arrow-right"><span class="sr-only">Next</span></button>
            </li>
        </ol>
        <span v-if="state.form_error" class="error">{{ t(state.form_error) }}</span>
    </div>
</template>

<i18n>
{
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
</i18n>

<script setup>
    import { reactive, inject } from 'vue';
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../../lib/mt.mjs';
    import User from '../../lib/model/user.mjs';

    const router = useRouter();
    const config = inject("site_config");

    const { t, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );
    const settings = config.settings();

    const state = reactive({
        user: new User({ language: config.settings().default_language, roles: [{ role:'Administrator'}] }),

        languages:   config.languages(),
        languageSet: false,

        emailSet: false,

        password:    '',
        password2:   '',
        passwordSet: false,

        form_error: ''
    });

    function setLanguage() {
        if ( state.user.language && state.user.language in state.languages ) {
            state.form_error = '';
            state.languageSet = true;
        }
    }
    function setEmail() {
        if ( ! state.user.email ) {
            state.form_error = 'bad_no_email';
        }
        else if ( /^\S+@\S+\.\S+$/.test(state.user.email)  ) {
            state.form_error = '';
            state.emailSet = true;
        }
        else {
            state.form_error = 'bad_email';
        }
    }
    function setPassword() {
        if ( ! state.password.length ) {
            state.form_error = 'missing_password';
        }
        else if ( ! state.password2.length ) {
            state.form_error = 'missing_password2';
        }
        else if ( state.password != state.password2 ) {
            state.form_error = 'bad_password_match';
        }
        else {
            state.form_error = '';
            state.user.password = state.password;
            saveSetup();
        }
    }
    async function saveSetup() {
        await self.user.save();
        await config.reload();
        await auth.login(state.user.email,state.password);

        router.push({ name: 'site_settings'});
    }
</script>