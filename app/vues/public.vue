<style lang="sass">
</style>

<template>
    <div class="root">
        <aside>
            <nav>
                <li><router-link to="/">{{ $t('happening_today') }}</router-link></li>
                <li><router-link to="/this-week">{{ $t('this_week') }}</router-link></li>
                <li><router-link to="/submit-events">{{ $t('add_event') }}</router-link></li>
                <li><router-link to="/login">{{ $t('login') }}</router-link></li>
            </nav>
        </aside>
        <language-selector></language-selector>
        <main>
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
    }
};
</script>