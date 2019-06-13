<style lang="sass">
    html,body {
      margin: 0;
      padding: 0;
    }
    * {
      font-family: 'Helvetica Neue';
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        -webkit-clip-path: inset(50%);
        clip-path: inset(50%);
        border: 0;
    }
    header,main {
      padding: 15px;
    }
    div.splash {
        display: flex;
        flex-direction: column;
        color: #fff;
        background-color: #555;
        margin: -15px;
        padding: 15px;
        padding-left: 40px;

        h1 {
            order: 2;
            flex: 1 1 auto;
        }
        nav {
            order: 1;
            flex: 0 0 auto;
            list-style-type: none;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            li {
                margin-left: 15px;
                padding: 5px;
            }
        }
    }
</style>

<template>
    <div class="root">
        <nav>
            <li><router-link to="/">{{ $t('happening_today') }}</router-link></li>
            <li><router-link to="/this-week">{{ $t('this_week') }}</router-link></li>
            <li><router-link to="/events">{{ $t('search') }}</router-link></li>
            <li><router-link to="/submit-events">{{ $t('add_event') }}</router-link></li>
            <li><router-link to="/login">{{ $t('login') }}</router-link></li>
            <li>
                <select v-model="$root.$i18n.locale">
                <option v-for="(lang,i) in langs" :selected="$root.$i18n.locale == lang ? true : false" :value="lang">{{ lang }}</option>
                </select>
            </li>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                langs: ['en','es']
            };
        },
        i18n: {
            messages: {
                "en": {
                    "happening_today": "Happening Today",
                    "this_week": "Events This Week",
                    "search": "Search Events",
                    "add_event": "Submit an Event",
                    "login": "Log In"
                },
                "es": {
                    "happening_today": "Pasando Hoy",
                    "this_week": "Eventos Esta Semana",
                    "search": "Buscar Eventos",
                    "add_event": "Enviar un Evento",
                    "login": "Iniciar sesión"
                }
            },
        }
    };
</script>