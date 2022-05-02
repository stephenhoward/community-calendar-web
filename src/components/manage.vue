<style lang="scss">

@import '../../assets/css/mixins.scss';

    div.root.manage {

        grid-template-columns: [ left-rail ] 300px [ main ] auto [ end ];
        &.hide-menu {
            grid-template-columns: [ left-rail ] 0 [ main ] auto [ end ];
        }

        &.start {
            grid-template-columns: [ left-rail ] auto [ main ] 0px [ end ];
        }

        div.main-menu h1 {
            color: $dark-mode-text;
            padding-left: 20px;
        }
        & > h1 {
            @include page-title-positioning;
            margin-left: 40px;
        }
        #menu-toggle {
            color: $light-mode-text;
            text-shadow: none;
            @include dark-mode {
                color: $dark-mode-text;
            }
        }
        main {
            box-shadow: none;
            background-color: none;
        }
    }

    input[type="text"], input[type="time"], textarea {
        @include dark-mode {
            background-color: $dark-mode-background;
            color: $dark-mode-text;
        }
    }
</style>

<template>
<div :class="{ root: true, manage: true, start: state.pageTitle.length ? false : true, 'hide-menu': ! state.menuVisible }">
    <span id="menu-toggle" class="icofont-navigation-menu" @click="toggleMenu"></span>
    <h1>{{ t( state.pageTitle ) }}</h1>
    <a href="#main" @click.prevent="skipTo('main')" class="sr-only">{{ t('aria_skip_navigation') }}</a>
    <div class="main-menu">
        <h1 v-if="route.name == 'manage'">{{ mt(settings,'site_title') }}</h1>
        <nav>
            <ul>
                <li><router-link to="/">{{ t('home') }}</router-link></li>
            </ul>
            <ul>
                <li><router-link @click.native="toggleMenu" to="/manage/events">{{ t('events_nav') }}</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/manage/series">{{ t('series_nav') }}</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/manage/locations">{{ t('locations_nav') }}</router-link></li>
                <li v-if="state.user.hasRole('editor')"><router-link @click.native="toggleMenu" to="/manage/categories">{{ t('categories_nav') }}</router-link></li>
            </ul>
            <ul v-if="state.user.hasRole('administrator','group_administrator')">
                <li v-if="state.user.hasRole('administrator', 'group_administrator')" ><router-link @click.native="toggleMenu" to="/manage/users">{{ t('people_nav') }}</router-link></li>
                <li v-if="state.user.hasRole('administrator')"><router-link @click.native="toggleMenu" to="/manage/groups">{{ t('organizations_nav')}}</router-link></li>
            </ul>
            <ul>
                <li><router-link @click.native="toggleMenu" to="/manage/profile">{{ t('profile_nav') }}</router-link></li>
                <li v-if="state.user.hasRole('administrator')"><router-link @click.native="toggleMenu" to="/manage/settings">{{ t('site_settings_nav') }}</router-link></li>
                <li v-else-if="state.user.hasRole('group_administrator')"><router-link @click.native="toggleMenu" to="/manage/settings">{{ t('organization_settings_nav') }}</router-link></li>
                <li><router-link to="/logout">{{ t('logout') }}</router-link></li>
            </ul>
        </nav>
    </div>
    <language-selector></language-selector>
    <main tabindex="-1" id="main">
    <router-view></router-view>
    </main>
</div>
</template>

<i18n>
{
    "en": {
        "home": "Home",
        "people_nav": "People",
        "organizations_nav": "Organizations",
        "events_nav": "Events",
        "series_nav": "Series",
        "categories_nav": "Categories",
        "locations_nav": "Locations",
        "profile_nav": "My Profile",
        "site_settings_nav": "Site Settings",
        "organization_settings_nav": "Organization Settings",
        "logout": "Sign Out",

        "list_user_title": "People",
        "list_events_title": "Events",
        "list_categories_title": "Categories",
        "list_series_title": "Event Series",
        "list_location_title": "Locations",
        "site_settings_title": "Site Settings",
        "aria_skip_navigation": "Skip Navigation",
        "edit_event_title": "Edit Event",
        "edit_series_title": "Edit Event Series"
    },
    "es": {
        "home": "Página Principal",
    }
}
</i18n>

<script setup>
    import { reactive, inject, onBeforeMount, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../lib/mt.mjs';
    import User from '../lib/model/user.mjs';

    import languageSelector from './languageSelector.vue';

    const { t, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );
    const router = useRouter();
    const route = useRoute();
    const config = inject("site_config");
    const settings = config.settings();
    const authentication = inject("authentication");

    const state = reactive({
        langs: settings.languages,
        menuVisible: false,
        pageTitle: '',
        user: new User({
            name: 'Stephen',
            roles: {
                administrator: true,
                group_administrator: true,
                editor: true,
                contributor: true
            }
        })
    });

    onBeforeMount(() => {
        if ( ! authentication.is_logged_in() ) {
            router.replace({ name: 'login' });
        }

        setTitle(route.name + '_title');

        if ( route.name == 'manage' ) {
            state.menuVisible = true;
        }
    });

    watch( route, (to, from) => {
        setTitle(to.name + '_title');
    });

    function toggleMenu() {
        state.menuVisible = ! state.menuVisible;
    }

    function setTitle(name) {
        if ( route.name != 'manage' ) {
            state.pageTitle = name;
        }
        else {
            state.pageTitle = '';
        }
    }

    function skipTo(id) {
        document.getElementById(id).focus();
    }

</script>