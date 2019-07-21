<style lang="sass">
    div.root {
        & > div.menu {
            background-color: rgba(0,0,0,.8);
            nav {
                ul {
                    border-bottom: 1px solid rgba(0,0,0,.5);
                }
                li {
                    border-top: 1px solid rgba(0,0,0,.5);

                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>

<template>
<div :class="{ root: true, 'hide-menu': ! menuVisible }">
    <span id="menu-toggle" class="icofont-navigation-menu" @click="toggleMenu"></span>
    <h1>{{ pageTitle }}</h1>
    <div class="menu">
        <nav>
            <ul>
                <li><router-link to="/">{{ $t('home') }}</router-link></li>
            </ul>
            <ul v-if="user.hasRole('administrator','group_administrator')">
                <li v-if="user.hasRole('administrator', 'group_administrator')" ><router-link @click.native="toggleMenu" to="/manage/users">People</router-link></li>
                <li v-if="user.hasRole('administrator')"><router-link @click.native="toggleMenu" to="/manage/groups">Organizations</router-link></li>
            </ul>
            <ul>
                <li><router-link @click.native="toggleMenu" to="/manage/events">Events</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/manage/series">Series</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/manage/locations">Locations</router-link></li>
            </ul>
            <ul>
                <li><router-link @click.native="toggleMenu" to="/manage/profile">My Profile</router-link></li>
                <li v-if="user.hasRole('administrator')"><router-link @click.native="toggleMenu" to="/manage/settings">Site Settings</router-link></li>
                <li v-else-if="user.hasRole('group_administrator')"><router-link @click.native="toggleMenu" to="/manage/settings">Organization Settings</router-link></li>
                <li><router-link to="/logout">Logout</router-link></li>
            </ul>
        </nav>
    </div>
    <language-selector></language-selector>
    <main>
    <router-view></router-view>
    </main>
</div>
</template>

<script>
const User  = require('lib/model/user');
const Event  = require('lib/model/event');
const Series  = require('lib/model/series');

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
                    administrator: false,
                    group_administrator: true,
                    editor: false,
                    contributor: true
                }
            })
        };
    },
    watch: {
        '$route': function(to, from) {
            this.setTitle(to.name);
        }
    },
    created: function() {
        this.setTitle(this.$route.name);
    },
    i18n: {
        messages: {
            "en": {
                "home": "Home",
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
            this.pageTitle = name;
        }
    }
};
</script>