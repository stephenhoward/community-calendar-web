<style lang="scss">
@import '../../../assets/css/mixins.scss';


</style>

<template>
    <div class="event">
        <router-link :to="'manage/categories/' + props.item.id" class="event-body" tag="div">
            {{ mt(props.item,'name') }}
        </router-link>
    </div>
</template>

<i18n>
</i18n>

<script setup>
    import { useI18n } from 'vue-i18n';
    import useModelTranslate from '../../lib/mt.mjs';

    const props = defineProps(['item']);
    const { t, locale, fallbackLocale } = useI18n({});
    const mt = useModelTranslate( locale, fallbackLocale );

</script>