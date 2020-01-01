<style lang="sass">

@import 'app/scss/_mixins.scss';

div.category-picker {
    div.category-selector {
        background-color: $light-mode-background;
        padding: 10px;
        border-radius: 6px;
        @include dark-mode {
            background-color: $dark-mode-background;
        }
        ul {
            list-style-type: none;
            margin: 10px 0 20px 0;
            padding: 0;
            li {
                margin: 4px 0 0 0;
                padding: 0;
            }
        }
    }
    ul.categories {
        border: 1px solid #555;
        border-radius: 4px;
        padding: 4px;
        width: 100%;
        @include hstack;
        justify-content: flex-start;
        align-items: stretch;
        list-style-type: none;
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
                }
            }
            &.category {
                background-color: $capsule-background;
                @include flexible;
                @include hstack;
                justify-content: space-between; 
                max-width: 200px;
                cursor: pointer;
                border-radius: 4px;
                @include dark-mode {
                    color: #dark-mode-text;
                    background-color: $dark-mode-capsule-background;
                }
                button {
                    background: none;
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

</style>

<template>
    <div class="category-picker">
        <label>{{ $t('categories_header') }}</label>
        <ul class="categories" >
            <li class="category" v-for="category in active_categories" >
                <span>{{ category.get('name') }}</span>
                <button type="button" @click.stop="removeCategory(category)" class="icofont-close"></button>
            </li>
            <li class="add" v-if="active_categories.length < all_categories.length"><button class="icofont-plus" aria-label="add a category" type="button" @click="showCategories"></button></li>
        </ul>
        <div v-if="revealCategories" class="popup-wrapper" @click="hideCategories">
            <div tabindex="-1" ref="categorySelector" class="category-selector" @click.stop>
                <h3>{{ $t('select_categories') }}</h3>
                <ul>
                    <li v-for="category in all_categories">
                        <label>
                            <input type="checkbox" v-model="active_categories" :value="category">
                            {{ category.get('name') }}
                        </label>
                    </li>
                </ul>
                <button type="button" @click="hideCategories">{{ $t('done') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
const Category = require('../../../lib/model/category');

module.exports = {
    props: ['model'],
    i18n: {
        messages: {            
            en: {
                categories_header: 'Categories',
                select_categories: 'Select Categories',
                done:   'Done'
            }
        }
    },
    data: function() {
        return {
            all_categories: [],
            default_category: '',
            active_categories: [],
            current_category: null,
            current_info: {},
            revealCategories: false
        };
    },
    watch: {
        active_categories: function() {
            this.$emit('change',this.active_categories);
        }
    },
    created: function() {
        let self = this;
        Category.list().then( (models) => {

            self.all_categories = models;
            if ( self.model ) {
                self.active_categories = self.model.categories || [];
            }

        } );
    },
    methods: {
        showCategories: function() {
            this.revealCategories = true;
            this.$refs.categorySelector.focus()
        },
        hideCategories: function() {
            this.revealCategories = false;
        },
        removeCategory: function(category) {
            this.active_categories = this.active_categories.filter( c => c != category );
            this.$emit('change',this.active_categories);
        }
    }

}
</script>