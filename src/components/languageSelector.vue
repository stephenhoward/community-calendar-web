<style lang="scss">

    @import '../../assets/css/mixins.scss';

    div.hide-menu {
        #language-selector {
            display: none;
        }
    }
    #language-selector {
        grid-column-start: left-rail;
        padding:            0 0 10px 10px;
        overflow-x:        hidden;
        overflow-y:        visible;
        z-index:           10;
        cursor:            pointer;
        background-color: $light-mode-sidebar-background;
        @include dark-mode {
            background-color: $dark-mode-sidebar-background;
        }

        div.popup-wrapper {
                grid-row-start:    top;

    }
        div.current-language {
            grid-row-start:    footer;
            margin: 8px;
            border: 1px solid #777;
            padding: 5px 10px;
            color: #aaa;
            max-width: 350px;
            @include hstack;
            span {
                display: block;
                @include flexible;
                &.icon {
                    @include inflexible;
                }
            }
        }
    }

    div.language-selector {
        border-radius: 6px;
        background-color: #fff;
        @include dark-mode {
            background-color: $dark-mode-sidebar-background;
        }

        h3 {
            font-size: 100%;
            margin: 0;
            padding: 8px 10px;
        }
        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
            li {
                margin: 0;
                padding: 8px 10px;
                border-bottom: 1px solid #aaa;
                cursor: pointer;
                &:hover {
                    background-color: #ddd;
                    @include dark-mode {
                        background-color: $dark-mode-capsule-background;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }

</style>

<template>
    <div v-if="Object.keys(state.langs).length > 1" id="language-selector" >
        <div class="current-language" @click="state.revealLanguages = true">
            <span>{{ state.langs[locale] }}</span><span class="icon icofont-exchange"></span>
        </div>
        <div v-if="state.revealLanguages" class="popup-wrapper" @click.stop="hideLanguages">
            <div class="language-selector">
                <h3>{{ t('select_language') }}</h3>
                <ul>
                    <li v-for="(language,code) in state.langs" @click="setLanguage(code)">
                        {{ language }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<i18n>
{
    en: {
        select_language: 'Select a Language'
    },
    es: {
        select_language: 'Selecciona un Idioma'
    },
    fr: {
        select_language: 'Sélectionnez une Langue'
    }
}
</i18n>

<script setup>
    import { useI18n } from 'vue-i18n';
    import { reactive, onBeforeMount, inject } from 'vue';

    const { t, locale } = useI18n({});
    const i18n = inject('i18n');
    const config = inject('site_config');
    const settings = config.settings();
    const state = reactive({
                revealLanguages: false,
                langs: {}
    });

    onBeforeMount(() => {
        let all_languages    = { 'en': {name:"English"}, es: {name:'Español'}}; // Config.languages();
        let active_languages = ['en','es']; //Config.settings().languages;

        active_languages.forEach( lang => state.langs[lang] = all_languages[lang].name );
    });

    function hideLanguages() {
        state.revealLanguages = false;
    }

    function setLanguage(code) {
        console.log(i18n.global);
        i18n.global.locale.value = code;
        hideLanguages();
    }
</script>