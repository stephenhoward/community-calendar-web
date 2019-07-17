<template>
    <div>
        <button type="button" @click="newModel">New {{ model_type }}</button>
        <div v-if="models.length > 0">
        <model-summary v-for="model in models" v-bind:model="model" ></model-summary>
        </div>
        <div v-else>
            No {{ model_type }}s
        </div>
        <model-create v-if="showNew" v-bind:model="current_model" @close="closeNew"></model-create>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                models: [],
                showNew: false,
                current_model:null
            };
        },
        created: function() {
            console.log('fetch?');
            this.type().list().then( (models) => { this.models = models } );
        },
        computed: {
            model_type: function() { return this.type().name }
        },
        methods: {
            newModel: function() {
                let type = this.type()
                this.current_model = new type({});
                this.showNew = true;
            },
            closeNew: function(model) {
                if ( model ) {
                    console.log(model);
                    this.models.unshift(model);
                }
                this.showNew = false;
            }
        }
    };
</script>
