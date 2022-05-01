<template>
    <div class="login">
        <h1>{{ mt( settings, 'site_title') }}</h1>
        <h3>{{ t('title') }}</h3>
        <div class="error" v-if="state.err">{{ state.err }}</div>
        <input type="email"    v-bind:placeholder="t('email')"    v-model="state.email">
        <input type="password" v-bind:placeholder="t('password')" v-model="state.password" @keyup.enter="doLogin">
        <router-link :to="{ name: 'forgot_password', params: { em: state.email }}" >{{ t("forgot_password") }}</router-link>
        <button @click="doLogin" type="button">{{ t("login_button") }}</button>
    </div>
</template>

<style lang="scss">
@import '../../../assets/css/mixins.scss';

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

<i18n>
{
    en: {
        'title': 'Sign in to your account',
        'login_button': 'Sign in',
        email: 'email',
        password: 'password',
        forgot_password: 'Forgot Password?',
        UnknownLogin: 'unknown email or password',
        '400': 'bad sign in',
        'unknown_error': 'An unknown error occurred'
    }
}
</i18n>

<script setup>
    import { reactive, onBeforeMount, inject } from 'vue';
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../../lib/mt.mjs';

    const router = useRouter();
    const { t, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );
    const config = inject('site_config');
    const settings = config.settings();
    const authentication = inject('authentication');

    const props = defineProps(['error', 'em']);
    const state = reactive({
        err      : '',
        email    : '',
        password : ''
    });

    onBeforeMount(() => {
        state.err   = state.error || '';
        state.email = state.em || '';
    });

    async function doLogin() {
        try {

            await authentication.login(state.email,state.password);
            state.err = '';
            router.push('/manage');
        }
        catch(error) {

            let error_text = "unknown_error";

            if ( typeof error  == "object" && "response" in error ) {
                error_text = error.response.data || error.response.status;
            }
            else if ( typeof error == "string" ) {
                error_text = error;
            }
            else {
                console.log(error);
            }

            state.err = t( error_text ) || error_text;
        }
    }
</script>