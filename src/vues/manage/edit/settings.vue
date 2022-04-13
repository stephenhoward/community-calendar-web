<style lang="sass">
div.site_settings {

    @import 'app/scss/_mixins.scss';

    img.upload_preview {
        max-width: 300px;
    }
    section.languages ul {
        @include vstack;
        flex-wrap: wrap;
        list-style-type: none;

        li {
            width: 100%;
            margin: 4px 0;
            order: 2;

            &.selected {
                order: 1;
            }
        }

    }
}
</style>

<template>
    <div class="site_settings">
        <translation-control v-bind:model="mod" @update="updateInfo"></translation-control>
        <label>{{ $t('site_image') }}</label><input ref="file" type="file" name="file" @change="uploadHandler">
        <img class="upload_preview" ref="upload_preview"></img>
        <section>default language
            <select v-model="mod.default_language">
                <option v-for="lang in mod.languages" :value="lang">
                    {{ languages[lang].name }}
                </option>
            </select>
        </section>
        <section class="languages">languages available
            <ul>
                <li :class="{ 'selected': mod.languages.indexOf(code) >= 0 }" v-for="(lang,code) in languages">
                    <input type="checkbox" v-model="mod.languages" :value="code">
                    {{ lang.name }} <span v-if="lang.name != lang.iso_name">({{ lang.iso_name }})</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
const translatableForm = require('./translatable.vue');
const compose  = require('../../../lib/compose');
const config   = require('../../../lib/config');

module.exports = {
    extends: translatableForm,
    i18n: {
        messages: {
            en: {
                'site_image': 'Site Banner Image',
            },
            es: {},
            fr: {}
        }
    },
    computed: {
        'languages': function() { return config.languages() }
    },
    components: {
        'translation-control': compose.translationVue( require('./translate/settings.vue') )
    },
    methods: {
        uploadHandler: function(e) {
            let file = this.$refs.file.files[0];

            if ( file.type.indexOf('image/' == 0) ) {
                let preview = this.$refs.upload_preview;
                let reader = new FileReader();
                reader.onload = function () {
                    preview.src = reader.result;
                }
                reader.readAsDataURL(file);
            }
            else {
                console.log('not an image');
            }
        }
    }
};
</script>