<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.root.manage {

        grid-template-columns: [ left-rail ] auto [ main ] 40px [ end ];
        &.hide-menu {
            grid-template-columns: [ left-rail ] 0 [ main ] auto [ end ];
        }

        &.start {
            grid-template-columns: [ left-rail ] auto [ main ] 0px [ end ];
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
</style>

<template>
<div :class="{ root: true, manage: true, start: pageTitle.length ? false : true, 'hide-menu': ! menuVisible }">
    <span id="menu-toggle" class="icofont-navigation-menu" @click="toggleMenu"></span>
    <h1>{{ $t( pageTitle ) }}</h1>
    <a href="#main" @click.prevent="skipTo('main')" class="sr-only">{{ $t('aria_skip_navigation') }}</a>
    <div class="main-menu">
        <nav>
            <ul>
                <li><router-link to="/">{{ $t('home') }}</router-link></li>
            </ul>
            <ul v-if="user.hasRole('administrator','group_administrator')">
                <li v-if="user.hasRole('administrator', 'group_administrator')" ><router-link @click.native="toggleMenu" to="/manage/users">{{ $t('people_nav') }}</router-link></li>
                <li v-if="user.hasRole('administrator')"><router-link @click.native="toggleMenu" to="/manage/groups">{{ $t('organizations_nav')}}</router-link></li>
            </ul>
            <ul>
                <li><router-link @click.native="toggleMenu" to="/manage/events">{{ $t('events_nav') }}</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/manage/series">{{ $t('series_nav') }}</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/manage/locations">{{ $t('locations_nav') }}</router-link></li>
                <li v-if="user.hasRole('editor')"><router-link @click.native="toggleMenu" to="/manage/categories">{{ $t('categories_nav') }}</router-link></li>
            </ul>
            <ul>
                <li><router-link @click.native="toggleMenu" to="/manage/profile">{{ $t('profile_nav') }}</router-link></li>
                <li v-if="user.hasRole('administrator')"><router-link @click.native="toggleMenu" to="/manage/settings">{{ $t('site_settings_nav') }}</router-link></li>
                <li v-else-if="user.hasRole('group_administrator')"><router-link @click.native="toggleMenu" to="/manage/settings">{{ $t('organization_settings_nav') }}</router-link></li>
                <li><router-link to="/logout">{{ $t('logout') }}</router-link></li>
            </ul>
        </nav>
    </div>
    <language-selector></language-selector>
    <main tabindex="-1" id="main">
    <router-view></router-view>
    </main>
</div>
</template>

<script>
const User  = require('lib/model/user');
const Event  = require('lib/model/event');
const Series  = require('lib/model/series');
const authorize = require('../lib/authorize.js');

module.exports = {
    components: {
        'language-selector': require('./components/language-selector.vue')
    },
    data: () => {
        return {
            langs: {
                'English': 'en',
                'Español': 'es'
            },
            menuVisible: true,
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
        };
    },
    beforeRouteEnter: (from,to,next) => {
        if ( ! authorize.has_token() ) {
            next({ name: 'login' });
        }
        next();
    },
    watch: {
        '$route': function(to, from) {
            this.setTitle(to.name + '_title');
        }
    },
    created: function() {
        this.setTitle(this.$route.name + '_title');
    },
    i18n: {
        messages: {
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
                "list_event_title": "Events",
                "list_category_title": "Categories",
                "list_series_title": "Event Series",
                "list_location_title": "Locations",
                "site_settings_title": "Site Settings",
                "aria_skip_navigation": "Skip Navigation",
                "edit_series_title": "Edit Event Series"
            },
            "es": {
                "home": "Página Principal",
            }
        },
    },
    methods: {
        toggleMenu: function() {
            this.menuVisible = ! this.menuVisible;
        },
        setTitle: function(name) {
            if ( this.$route.name != 'manage' ) {
                this.pageTitle = name;
            }
            else {
                this.pageTitle = '';
            }
        },
        skipTo: function(id) {
            document.getElementById(id).focus();
        }
    }
};
</script>