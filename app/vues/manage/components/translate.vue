<style lang="sass">

@import 'app/scss/_mixins.scss';

ul.language-selector {
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
                <span>{{ lang }}</span>
                <button type="button" @click="removeLanguage(lang)" class="icofont-close"></button>
            </li>
            <li v-if="active_languages.length < all_languages.length"><button type="button" @click="showLanguages">+</button></li>
        </ul>

        <translate-form v-bind:info="current_info"></translate-form>

        <div v-if="revealLanguages" class="popup-wrapper" @click="hideLanguages">
            <ul class="language-selector">
                <li v-for="lang in inactive_languages" @click="addLanguage(lang)">
                    {{ lang }}
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
    created: function() {
        console.log(this.active_languages);
    },
    data: function() {
        return {
            all_languages: [ 'English', 'Español', 'Français' ],
            active_languages: [ 'English' ],
            current_language: 'English',
            info: this.model.info,
            current_info: this.model.info.en,
            revealLanguages: false
        };
    },
    computed: {
        inactive_languages: function() {
            return this.all_languages.filter( l => this.active_languages.indexOf(l) < 0 );
        }
    },
    methods: {
        showLanguages: function() {
            this.revealLanguages = true;
        },
        hideLanguages: function() {
            this.revealLanguages = false;
        },
        selectLanguage: function(lang) {
            console.log('selecting language ' + lang);
            this.current_language = lang;
        },
        addLanguage: function(lang) {
            console.log('adding language');
            this.revealLanguages = false;
            this.active_languages.push(lang);
            this.selectLanguage(lang);
        },
        removeLanguage: function(lang) {
            console.log('remove language');
            this.active_languages = this.active_languages.filter( l => l != lang );
        }
    }

}
</script>