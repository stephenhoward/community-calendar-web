<style lang="sass">

    @import 'app/scss/_mixins.scss';

    div.hide-menu {
        #language-selector {
            display: none;
        }
    }
    #language-selector {
        grid-row-start:    end;
        grid-column-start: left-rail;
        margin:            0 0 10px 10px;
        overflow-x:        hidden;
        overflow-y:        visible;
        z-index:           10;
        cursor:            pointer;

        div.current-language {
            margin: 8px;
            border: 1px solid #777;
            padding: 5px 10px;
            color: #aaa;
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
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }

</style>

<template>
    <div v-if="Object.keys(langs).length > 1" id="language-selector" >
        <div class="current-language" @click="revealLanguages = true">
            <span>{{ langs[$root.$i18n.locale] }}</span><span class="icon icofont-exchange"></span>
        </div>
        <div v-if="revealLanguages" class="popup-wrapper" @click.stop="hideLanguages">
            <div class="language-selector">
                <h3>{{ $t('select_language') }}</h3>
                <ul>
                    <li v-for="(language,code) in langs" @click="setLanguage(code)">
                        {{ language }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    let config = require('../../lib/config');

    module.exports = {
        data: () => {
            return {
                revealLanguages: false,
                langs: {}
            };
        },
        i18n: {
            messages: {
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
        },
        created: function() {
            let all_languages    = config.languages();
            let active_languages = config.settings().languages;

            active_languages.forEach( lang => this.langs[lang] = all_languages[lang].name );
        },
        methods: {
            hideLanguages: function() {
                this.revealLanguages = false;
            },
            setLanguage: function(code) {
                this.$root.$i18n.locale = code;
                this.hideLanguages();
            }
        }
    };
</script>