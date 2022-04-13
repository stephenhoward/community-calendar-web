
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
            name:      'list_' + type_component,
            component: compose.listPage( {
                'model-summary': require('../vues/manage/list/' + type_component + '.vue'),
                'model-form':    require('../vues/manage/edit/' + type_component + '.vue')
            }),
            props: { type: type }
        },
        {
            path:      path + '/:id',
            name:      'edit_' + type_component,
            component: compose.editPage( require('../vues/manage/edit/' + type_component + '.vue') ),
            props:     (route) => ( { id: route.params.id, type: type } )
        }
    ];
}

module.exports = {

    routes : [
        {
            path: '/manage', component: require('../vues/manage.vue'), name: 'manage',
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
        { path: '/login',  component: require('../vues/auth/login.vue'), name: 'login', props: true },
        { path: '/logout', component: require('../vues/auth/logout.vue'), name: 'logout' },
        { path: '/password/forgot', component: require('../vues/auth/password_forgot.vue'), name: 'forgot_password', props: true },
        { path: '/password/reset',  component: require('../vues/auth/password_reset.vue'), name: 'reset_password',     props: true },
        { path: '/setup',  component: require('../vues/auth/setup.vue'), name: 'setup', props: true },
    ]
  };
