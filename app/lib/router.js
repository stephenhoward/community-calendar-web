
const Event   = require('./model/event');
const compose = require('./compose');

module.exports = {

    routes : [
        {
            path: '/manage', component: require('../vues/manage.vue'),
            children: [
                { path: 'events', component: compose.ListVue( Event, {
                    'model-summary': require('../vues/manage/list/event.vue'),
                    'model-form':    require('../vues/manage/edit/event.vue')
                }) },
                { path: 'events/:id', component: compose.editVue( Event, require('../vues/manage/edit/event.vue') ), props: true },
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
        }
       // { path: '/login', component: require('../vues/auth/login.vue'), name: 'login', props: true },
    ]
  };
