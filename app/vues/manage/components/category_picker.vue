<style lang="sass">

@import 'app/scss/_mixins.scss';

div.category-picker {
    div.info {
        background-color: $light-mode-panel-background;
        padding: 10px;
        margin: 0 -10px;
        @include dark-mode {
            background-color: $dark-mode-panel-background;
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
                color: #fff;
                background-color: #03a;
                @include flexible;
                @include hstack;
                justify-content: space-between; 
                max-width: 200px;
                cursor: pointer;
                border-radius: 4px;
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

</style>

<template>
    <div class="category-picker">
        <ul class="categories" >
            <li class="category" v-for="category in active_categories" >
                <span>{{ category.get('name') }}</span>
                <button type="button" @click.stop="removeCategory(category)" class="icofont-close"></button>
            </li>
            <li class="add" v-if="active_categories.length < all_categories.length"><button class="icofont-plus" aria-label="add a category" type="button" @click="showCategories"></button></li>
        </ul>
        <div v-if="revealCategories" class="popup-wrapper" @click="hideCategories">
            <div tabindex="-1" ref="categorySelector" class="category-selector">
                <h3>{{ $t('add_category') }}</h3>
                <ul>
                    <li v-for="category in inactive_categories" @click="addCategory(category)">
                        {{ category.get('name') }}
                    </li>
                </ul>
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
                add_category: 'Add a Category',
                close:  'Cancel',
                create: 'Create',
                save:   'Save'
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
    computed: {
        inactive_categories: function() {
            return this.all_categories.filter( c => this.active_categories.indexOf(c) < 0 );
        }
    },
    created: function() {
        let self = this;
        Category.list().then( (models) => {

            self.all_categories    = models;
            if ( self.model ) {
                self.active_categories = self.model.categories || [];
            }

        } );
    },
    methods: {
        addCategory: function(category) {
            this.active_categories.push(category);
            this.$emit('change',this.active_categories);
        },
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