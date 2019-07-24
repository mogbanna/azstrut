import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: () =>
                import ('./views/Home.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () =>
                import ('./views/Dashboard.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () =>
                import ('./views/Register.vue')
        }
    ]
});

export default router;