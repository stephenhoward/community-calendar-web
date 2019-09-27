
const Event   = require('./model/event');
const Series  = require('./model/series');
const User  = require('./model/user');
const Category  = require('./model/category');
const compose = require('./compose');

const routesForModel = function(type, path) {

    let type_component = type.name.toLowerCase();

    return [
        {
            path:      path,
            name:      path,
            component: compose.listPage( {
                'model-summary': require('../vues/manage/list/' + type_component + '.vue'),
                'model-form':    require('../vues/manage/edit/' + type_component + '.vue')
            }),
            props: { type: type }
        },
        {
            path:      path + '/:id',
            component: compose.editPage( require('../vues/manage/edit/' + type_component + '.vue') ),
            props:     (route) => ( { id: route.params.id, type: type } )
        }
    ];
}

module.exports = {

    routes : [
        {
            path: '/manage', component: require('../vues/manage.vue'),
            children: [
                { path: 'settings', component: require('../vues/manage/settings.vue'), name: 'site_settings' },
                ...routesForModel( Category, 'categories'),
                ...routesForModel( Series, 'series'),
                ...routesForModel( Event,  'events'),
                ...routesForModel( User,   'users'),
            ]
        },
        { 
            path: '/', component: require('../vues/public.vue'),
            children: [
                { path: '',                     component: require('../vues/public/events.vue'), name: 'today',     props: true },
                { path: 'this-week',            component: require('../vues/public/events.vue'), name: 'this-week', props: true  },
                { path: 'events',               component: require('../vues/public/events.vue'), name: 'events',    props: true  },
                { path: 'events/:id',           component: require('../vues/public/event.vue'), name: 'event', props: true  },
                // { path: 'categories',           component: require('../vues/categories.vue')  },
                // { path: 'categories/:id/:slug', component: require('../vues/category.vue')  }
            ]
        },
        { path: '/login', component: require('../vues/auth/login.vue'), name: 'login', props: true },
    ]
  };
