<style lang="sass">
    #language-selector {
        grid-row-start:  top;
        grid-column-end: end;
        justify-self:    end;
        margin:          10px 10px 0 0;
    }
</style>

<template>
    <div id="language-selector">
        <select v-model="$root.$i18n.locale">
        <option v-for="(code,lang) in langs" :selected="$root.$i18n.locale == code ? true : false" :value="code">{{ lang }}</option>
        </select>
    </div>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                langs: {
                    'English':  'en',
                    'Español':  'es',
                    'Français': 'fr'
                }
            };
        }
    };
</script>