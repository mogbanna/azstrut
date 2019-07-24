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
            component: () =>
                import ('./views/Dashboard/Layout/DashboardLayout.vue'),
            children: [{
                    path: '',
                    name: 'Dashboard',
                    components: {
                        default: () =>
                            import ('./views/Dashboard/Dashboard/Dashboard.vue'),
                        header: () =>
                            import ('./views/Dashboard/Dashboard/DashboardHeader.vue')
                    }
                }

            ]
        },
        {
            path: '/login',
            component: () =>
                import ('./views/Auth/AuthLayout.vue'),
            children: [{
                path: '',
                name: 'Login',
                component: () =>
                    import ('./views/Auth/Login.vue')
            }]
        },
        {
            path: '/register',
            component: () =>
                import ('./views/Auth/AuthLayout.vue'),
            children: [{
                path: '',
                name: 'Register',
                component: () =>
                    import ('./views/Auth/Register.vue')
            }]
        }
    ],
    linkActiveClass: 'active'
});

export default router;