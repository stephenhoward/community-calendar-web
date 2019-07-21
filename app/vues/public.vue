<template>
    <div :class="{ root: true, 'hide-menu': ! menuVisible }">
        <span aria-hidden="true" id="menu-toggle" class="icofont-navigation-menu" @click="toggleMenu"></span>
        <h1>Events Calendar</h1>
        <a href="#main" class="sr-only">Skip Navigation</a>
        <div class="menu" aria-role="menu">
            <nav>
                <li><router-link @click.native="toggleMenu" to="/">{{ $t('happening_today') }}</router-link></li>
                <li><router-link @click.native="toggleMenu" to="/this-week">{{ $t('this_week') }}</router-link></li>
                <li><router-link to="/submit-events">{{ $t('add_event') }}</router-link></li>
                <li><router-link to="/login">{{ $t('login') }}</router-link></li>
            </nav>
        </div>
        <language-selector></language-selector>
        <main id="main" aria-role="none">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
module.exports = {
    components: {
        'language-selector': require('./components/language-selector.vue')
    },
    data: () => {
        return {
            menuVisible: false
        };
    },
    i18n: {
        messages: {
            "en": {
                "happening_today": "Happening Today",
                "this_week": "Events This Week",
                "add_event": "Submit an Event",
                "login": "Log In"
            },
            "es": {
                "happening_today": "Pasando Hoy",
                "this_week": "Eventos Esta Semana",
                "add_event": "Enviar un Evento",
                "login": "Iniciar sesión"
            }
        },
    },
    methods: {
        toggleMenu: function() {
            this.menuVisible = ! this.menuVisible;
        }
    }
};
</script>