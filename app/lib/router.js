
module.exports = {

    routes : [
        { 
            path: '/', component: require('../vues/public.vue'),
            children: [
                { path: '',                     component: require('../vues/events.vue'), name: 'today',     props: true },
                { path: 'this-week',            component: require('../vues/events.vue'), name: 'this-week', props: true  },
                { path: 'events',               component: require('../vues/events.vue'), name: 'events',    props: true  }//,
                // { path: 'events/:id/:slug',     component: require('../vues/event.vue')  },
                // { path: 'categories',           component: require('../vues/categories.vue')  },
                // { path: 'categories/:id/:slug', component: require('../vues/category.vue')  }
            ]
        }//,
       // { path: '/login', component: require('../vues/auth/login.vue'), name: 'login', props: true },
    ]
  };
