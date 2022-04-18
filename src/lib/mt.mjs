export default function useModelTranslate(locale,fallbackLocale) {

    return (model,key) => model.get([locale.value, fallbackLocale.value], key);
}
