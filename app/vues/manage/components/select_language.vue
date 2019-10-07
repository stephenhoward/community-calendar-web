<template>
    <section>default language
        <select v-model="mod.default_language">
            <option v-for="lang in mod.languages" :value="lang">
                {{ languages[lang].name }}
            </option>
        </select>
    </section>
</template>