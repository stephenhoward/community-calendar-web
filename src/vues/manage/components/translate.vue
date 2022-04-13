<style lang="sass">

@import 'app/scss/_mixins.scss';

div.translate {
    div.info {
        background-color: $light-mode-panel-background;
        padding: 10px;
        margin: 0 -10px;
        @include dark-mode {
            background-color: $dark-mode-panel-background;
        }
    }
    ul.tabs {
        width: 100%;
        @include hstack;
        justify-content: flex-start;
        align-items: stretch;
        list-style-type: none;
        margin: 0 -10px;
        padding: 0;
        li {
            padding: 4px 8px;
            margin: 0 10px 0 0;
            &.add {
                margin-left: -10px;
                padding-left: none;
                button {
                    background: transparent;
                    opacity: .6;
                    border: none;
                    &:hover {
                        opacity: 1;
                        background: #777;
                        color: #fff;
                    }
                }
            }
            &.language {
                color: #555;
                @include flexible;
                @include hstack;
                justify-content: space-between; 
                max-width: 200px;
                cursor: pointer;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                button {
                    display: none;
                }
                &:hover {
                    background-color: #eee;
                    color: #000;
                }
                &.selected {
                    color: $light-mode-text;
                    background-color: $light-mode-panel-background;
                    @include dark-mode {
                        color: $dark-mode-text;
                        background-color: $dark-mode-panel-background;
                    }
                    &:hover {
                        background-color: #ddd;
                    }
                    button {
                        cursor: pointer;
                        display: inline-block;
                        border: none;
                        background-color: transparent;
                        opacity: .8;
                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
}

</style>

<template>
    <div class="translate">
        <ul class="tabs" role="tablist" v-if="Object.keys(all_languages).length > 1">
            <li
                v-for="lang in active_languages"
                :class="'language' + ( lang == current_language ? ' selected' : '')"
                @click="selectLanguage(lang)"
                role="tab"
                :aria-selected=" lang == current_language ? 'true' : 'false'"
            >
                <span>{{ all_languages[lang] }}</span>
                <button v-if="lang != default_language" type="button" @click.stop="removeLanguage(lang)" class="icofont-close"></button>
            </li>
            <li class="add" v-if="active_languages.length < Object.keys(all_languages).length"><button class="icofont-plus" aria-label="add a language" type="button" @click="showLanguages"></button></li>
        </ul>

        <translate-form tabindex="-1" ref="currentForm" role="tabpanel" v-bind:info="current_info" @update="updateCurrentInfo"></translate-form>

        <div v-if="revealLanguages" class="popup-wrapper" @click="hideLanguages">
            <div tabindex="-1" ref="languageSelector" class="language-selector">
                <h3>{{ $t('add_language') }}</h3>
                <ul>
                    <li v-for="lang in inactive_languages" @click="addLanguage(lang)">
                        {{ all_languages[lang] }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
let config = require('../../../lib/config');

module.exports = {
    props: ['model'],
    i18n: {
        messages: {            
            en: {
                add_language: 'Add a Language',
                close:  'Cancel',
                create: 'Create',
                save:   'Save'
            }
        }
    },
    data: function() {
        return {
            all_languages: {},
            default_language: '',
            active_languages: [],
            current_language: null,
            info: this.model.info || {},
            current_info: {},
            revealLanguages: false
        };
    },
    computed: {
        inactive_languages: function() {
            return Object.keys(this.all_languages).filter( l => this.active_languages.indexOf(l) < 0 );
        }
    },
    created: function() {
        let all_languages    = config.languages();
        let active_languages = config.settings().languages;

        this.default_language = config.settings().default_language;

        active_languages.forEach( lang => this.all_languages[lang] = all_languages[lang].name );
        this.addLanguage( this.default_language );
        for( code in this.info ) {
            if ( code != this.default_language ) {
                this.addLanguage(code);
            }
        }
        this.selectLanguage(this.default_language);
    },
    methods: {
        showLanguages: function() {
            this.revealLanguages = true;
            this.$refs.languageSelector.focus()
        },
        hideLanguages: function() {
            this.revealLanguages = false;
        },
        selectLanguage: function(lang) {
            this.current_language = lang;
            if( ! ( lang in this.info ) ) {
                this.info[lang] = {};
            }
            this.current_info = this.info[lang];
            this.$refs.currentForm.focus();
        },
        addLanguage: function(lang) {
            this.revealLanguages = false;
            this.active_languages.push(lang);
            this.selectLanguage(lang);
        },
        removeLanguage: function(lang) {
            this.active_languages = this.active_languages.filter( l => l != lang );
            if ( this.active_languages.length ) {
                this.selectLanguage(this.active_languages[0]);
            }
        },
        updateCurrentInfo: function(info) {
            this.info[this.current_language] = info;
            this.current_info = info;

            this.$emit( 'update', this.current_language, info );
        }
    }

}
</script>