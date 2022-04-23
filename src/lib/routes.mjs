
// import Event from './model/event.mjs';
// import Series from './model/series.mjs';
// import User from './model/user.mjs';
// import Category from './model/category.mjs';
//import compose from './compose.mjs';

import PublicSite from '../components/public.vue';
import PublicEvents from '../components/public/events.vue';
import PublicEvent from '../components/public/event.vue';
import LoginView from '../components/auth/login.vue';
import LogoutView from '../components/auth/logout.vue';
import PasswordForgotView from '../components/auth/password_forgot.vue';
import PasswordResetView from '../components/auth/password_reset.vue';

// const routesForModel = function(type, path) {

//     let type_component = type.name.toLowerCase();

//     return [
//         {
//             path:      path,
//             name:      'list_' + type_component,
//             component: compose.listPage( {
//                 'model-summary': require('../vues/manage/list/' + type_component + '.vue'),
//                 'model-form':    require('../vues/manage/edit/' + type_component + '.vue')
//             }),
//             props: { type: type }
//         },
//         {
//             path:      path + '/:id',
//             name:      'edit_' + type_component,
//             component: compose.editPage( require('../vues/manage/edit/' + type_component + '.vue') ),
//             props:     (route) => ( { id: route.params.id, type: type } )
//         }
//     ];
//};

const routes = [
        // {
        //     path: '/manage', component: require('../vues/manage.vue'), name: 'manage',
        //     children: [
        //         { path: 'settings', component: require('../vues/manage/settings.vue'), name: 'site_settings' },
        //         ...routesForModel( Category, 'categories'),
        //         ...routesForModel( Series, 'series'),
        //         ...routesForModel( Event,  'events'),
        //         ...routesForModel( User,   'users'),
        //     ]
        // },
        { 
            path: '/', component: PublicSite,
            children: [
                 { path: '',                     component: PublicEvents, name: 'today',     props: true },
                 { path: 'this-week',            component: PublicEvents, name: 'this-week', props: true  },
                 { path: 'events',               component: PublicEvents, name: 'events',    props: true  },
                 { path: 'events/:id',           component: PublicEvent, name: 'event',     props: true  },
            //     // { path: 'categories',           component: require('../vues/categories.vue')  },
            //     // { path: 'categories/:id/:slug', component: require('../vues/category.vue')  }
            ]
        },
        { path: '/login',  component: LoginView, name: 'login', props: true },
        { path: '/logout', component: LogoutView, name: 'logout' },
        { path: '/password/forgot', component: PasswordForgotView, name: 'forgot_password', props: true },
        { path: '/password/reset',  component: PasswordResetView, name: 'reset_password', props: true },
        // { path: '/setup',  component: require('../vues/auth/setup.vue'), name: 'setup', props: true },
];

export default routes;