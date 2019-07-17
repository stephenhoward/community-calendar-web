
const listVue = require('../vues/components/list.vue');
const editVue = require('../vues/manage/editor.vue');
const Event   = require('./model/event');

function composeListVue(type,vues) {

    let components = {
        'model-summary': vues['model-summary'],
        'model-create':  composeEditorDialog( type,{ 'model-form': vues['model-form'] } )
    };

    let component = Object.assign( { components }, listVue );

    component.methods.type = () => { return type };

    return component;
}

function composeEditorDialog(type,vues) {

    let component = Object.assign( { components: vues }, editVue );

    component.methods.type = () => { return type };

    return component;
}

module.exports = {

    routes : [
        {
            path: '/manage', component: require('../vues/manage.vue'),
            children: [
                { path: 'events', component: composeListVue( Event, {
                    'model-summary': require('../vues/manage/event_summary.vue'),
                    'model-form':    require('../vues/manage/event.vue')
                }) }
            ]
        },
        { 
            path: '/', component: require('../vues/public.vue'),
            children: [
                { path: '',                     component: require('../vues/events.vue'), name: 'today',     props: true },
                { path: 'this-week',            component: require('../vues/events.vue'), name: 'this-week', props: true  },
                { path: 'events',               component: require('../vues/events.vue'), name: 'events',    props: true  },
                { path: 'events/:id',           component: require('../vues/event.vue'), name: 'event', props: true  },
                // { path: 'categories',           component: require('../vues/categories.vue')  },
                // { path: 'categories/:id/:slug', component: require('../vues/category.vue')  }
            ]
        }
       // { path: '/login', component: require('../vues/auth/login.vue'), name: 'login', props: true },
    ]
  };
