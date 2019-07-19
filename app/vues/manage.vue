<style lang="sass">
    div.root {
        & > aside {
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
<div class="root">
    <aside>
        <nav>
            <ul>
                <li><router-link to="/">{{ $t('home') }}</router-link></li>
            </ul>
            <ul v-if="user.hasRole('administrator','group_administrator')">
                <li v-if="user.hasRole('administrator', 'group_administrator')" ><router-link to="/manage/users">People</router-link></li>
                <li v-if="user.hasRole('administrator')"><router-link to="/manage/groups">Organizations</router-link></li>
            </ul>
            <ul>
                <li><router-link to="/manage/events">Events</router-link></li>
                <li><router-link to="/manage/series">Series</router-link></li>
                <li><router-link to="/manage/locations">Locations</router-link></li>
            </ul>
            <ul>
                <li><router-link to="/manage/profile">My Profile</router-link></li>
                <li v-if="user.hasRole('administrator')"><router-link to="/manage/settings">Site Settings</router-link></li>
                <li v-else-if="user.hasRole('group_administrator')"><router-link to="/manage/settings">Organization Settings</router-link></li>
                <li><router-link to="/logout">Logout</router-link></li>
            </ul>
        </nav>
    </aside>
    <language-selector></language-selector>
    <main>
    <router-view></router-view>
    </main>
</div>
</template>

<script>
const User  = require('lib/model/user');

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
    i18n: {
        messages: {
            "en": {
                "home": "Home",
            },
            "es": {
                "home": "Página Principal",
            }
        },
    }
};
</script>