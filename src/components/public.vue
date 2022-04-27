<style lang="scss">

@import '../../assets/css/mixins.scss';

header {
    background-image: url(../../assets/images/anthony-delanoix-hzgs56Ze49s-unsplash.jpg);
    background-size: cover;
    background-position: center;
    white-space: nowrap;

    & > h1 {
        @include page-title-positioning;
        color: #fff;
        text-shadow: 0 0 10px rgba(0,0,0,.6);
    }

    @include large-size-device {
        min-height: 300px;
    }

}

</style>

<i18n>
{
    "en": {
        "site_title": "Events Calendar",
        "happening_today": "Happening Today",
        "this_week": "Events This Week",
        "add_event": "Submit an Event",
        "login": "Sign In",
        "aria_skip_navigation": "Skip Navigation"
    },
    "es": {
        "happening_today": "Pasando Hoy",
        "this_week": "Eventos Esta Semana",
        "add_event": "Enviar un Evento",
        "login": "Iniciar sesión"
    }
}
</i18n>

<template>
    <div :class="{ root: true, 'hide-menu': ! state.menuVisible }">
        <header>
        <span aria-hidden="true" id="menu-toggle" class="icofont-navigation-menu" @click="toggleMenu"></span>
        <h1>{{ mt(settings,'site_title') }}</h1>
        </header>
        <a href="#main" @click.prevent="skipTo('main')" class="sr-only">{{ t('aria_skip_navigation') }}</a>
        <div class="main-menu" role="menu">
            <nav>
                <li><router-link @click.native="navigate" to="/">{{ t('happening_today') }}</router-link></li>
                <li><router-link @click.native="navigate" to="/this-week">{{ t('this_week') }}</router-link></li>
                <li><router-link to="/submit-events">{{ t('add_event') }}</router-link></li>
                <li><router-link to="/login">{{ t('login') }}</router-link></li>
            </nav>
        </div>
        <languageSelector />
        <main id="main" tabindex="-1" role="none">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    import { reactive, ref, inject } from 'vue';
    import languageSelector from './languageSelector.vue';
    import useModelTranslate from '../lib/mt.mjs';

    const config = inject('site_config');
    const settings = config.settings();
    const { t, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );    
    const state = reactive({
        menuVisible: false,
    });

    function toggleMenu() {
        state.menuVisible = ! state.menuVisible;
    }

    function navigate() {
        toggleMenu();
    }

    function skipTo(id) {
        document.getElementById(id).focus();
    }

</script>