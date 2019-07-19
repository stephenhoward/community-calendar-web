<style lang="sass">

@import 'app/scss/_mixins.scss';

ul.language-selector {
    border-radius: 6px;
    background-color: #fff;
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
div.translate {
    div.info {
        background-color: #ddd;
        padding: 10px;
    }
    ul.tabs {
        width: 100%;
        @include hstack;
        justify-content: flex-start;
        align-items: stretch;
        list-style-type: none;
        margin: 0;
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
                    color: #000;
                    background-color: #ddd;
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
        <ul class="tabs">
            <li
                v-for="lang in active_languages"
                :class="'language' + ( lang == current_language ? ' selected' : '')"
                @click="selectLanguage(lang)"
            >
                <span>{{ all_languages[lang] }}</span>
                <button v-if="lang != default_language" type="button" @click.stop="removeLanguage(lang)" class="icofont-close"></button>
            </li>
            <li class="add" v-if="active_languages.length < Object.keys(all_languages).length"><button class="icofont-plus" type="button" @click="showLanguages"></button></li>
        </ul>

        <translate-form v-bind:info="current_info" @update="updateCurrentInfo"></translate-form>

        <div v-if="revealLanguages" class="popup-wrapper" @click="hideLanguages">
            <ul class="language-selector">
                <li v-for="lang in inactive_languages" @click="addLanguage(lang)">
                    {{ all_languages[lang] }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

module.exports = {
    props: ['model'],
    i18n: {
        messages: {            
            en: {
                close:  'Cancel',
                create: 'Create',
                save:   'Save'
            }
        }
    },
    data: function() {
        return {
            all_languages: {
                'en': 'English',
                'es': 'Español',
                'fr': 'Français'
            },
            default_language: 'en',
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