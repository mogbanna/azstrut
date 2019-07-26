import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import DashboardLayout from './layouts/Dashboard/DashboardLayout.vue';

Vue.use(Router);

/*
	This will check to see if the user is authenticated or not.
*/
function requireAuth(to, from, next) {
    /*
    	Determines where we should send the user.
    */
    function proceed() {
        /*
        if there is no internent connection `
        and no session saved in storage
		*/
        //if (!navigator.onLine && !localStorage.getItem('session')) {
        //    next({ path: '/no-connection' });
        //}

        /*
        If the user is not empty, that means there's a user
        authenticated we allow them to continue. Otherwise, we
        send the user back to the home page.
        */
        if (store.getters.getUserSession.userCtx.name) {
            next();
        } else {
            /**
             * user is not logged in'
             * redirect to login page
             */
            next({ path: '/login' });
        }
    }

    proceed();
}

const router = new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: () =>
                import ('./views/Home.vue')
        },
        {
            path: '/dashboard',
            component: DashboardLayout,
            children: [{
                    path: '',
                    name: 'Dashboard',
                    alias: '/dashboard-main',
                    beforeEnter: requireAuth,
                    components: {
                        default: () =>
                            import ('./views/Dashboard/Dashboard/Dashboard.vue'),
                        header: () =>
                            import ('./views/Dashboard/Dashboard/DashboardHeader.vue')
                    }
                },
                {
                    path: 'organizations',
                    name: 'Organizations',
                    beforeEnter: requireAuth,
                    components: {
                        default: () =>
                            import ('./views/Organizations/App.vue'),
                        header: () =>
                            import ('./views/Dashboard/DefaultHeader.vue')
                    },
                    children: [{
                            path: '',
                            alias: '/organizations/dashboard',
                            name: 'OrganizationsDashboard',
                            component: () =>
                                import ('./pages/Organizations/Dashboard.vue'),
                            meta: {
                                parentTitle: 'Organizations',
                                title: 'Dashboard',
                                module: 'Organizations'
                            }
                        },
                        {
                            path: 'organizations',
                            component: () =>
                                import ('./views/Organizations/Organization.vue'),
                            children: [{
                                    path: '',
                                    alias: '/organizations/browse',
                                    name: 'BrowseOrganizations',
                                    component: () =>
                                        import ('./pages/Organizations/Organization/Browse.vue'),
                                    meta: {
                                        parentTitle: 'Organizations',
                                        title: 'Browse Organizations',
                                        module: 'Organizations'
                                    }
                                },
                                {
                                    path: 'view/:organizationId',
                                    name: 'ViewOrganization',
                                    component: () =>
                                        import ('./pages/Organizations/Organization/View.vue'),
                                    meta: {
                                        parentTitle: 'Organizations',
                                        title: 'View Organization',
                                        module: 'Organizations'
                                    }
                                },
                                {
                                    path: 'add',
                                    alias: '/organizations/add',
                                    name: 'AddOrganization',
                                    component: () =>
                                        import ('./pages/Organizations/Organization/Add.vue'),
                                    meta: {
                                        parentTitle: 'Organizations',
                                        title: 'Add Organization',
                                        module: 'Organizations'
                                    }
                                },
                                {
                                    path: 'update/:organizationId',
                                    alias: '/organizations/update',
                                    name: 'UpdateOrganizations',
                                    component: () =>
                                        import ('./pages/Organizations/Organization/Browse.vue'),
                                    meta: {
                                        parentTitle: 'Organizations',
                                        title: 'Update Organization',
                                        module: 'Organizations'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/tech-requests',
                    name: 'Tech Requests',
                    beforeEnter: requireAuth,
                    component: {
                        default: () =>
                            import ('./views/TechRequests/App.vue'),
                        header: () =>
                            import ('./views/Dashboard/DefaultHeader.vue')
                    },
                    children: [{
                            path: '',
                            alias: '/tech-requests/dashboard',
                            name: 'TechRequestsDashboard',
                            component: () =>
                                import ('./pages/TechRequests/Dashboard.vue'),
                            meta: {
                                parentTitle: 'Tech Requests',
                                title: 'Dashboard',
                                module: 'Tech Requests'
                            }
                        },
                        {
                            path: 'requests',
                            component: () =>
                                import ('./views/TechRequests/TechRequest.vue'),
                            children: [{
                                    path: '',
                                    alias: '/tech-requests/browse',
                                    name: 'BrowseTechRequests',
                                    component: () =>
                                        import ('./pages/TechRequests/TechRequest/Browse.vue'),
                                    meta: {
                                        parentTitle: 'Tech Requests',
                                        title: 'Browse Tech Requests',
                                        module: 'Tech Requests'
                                    }
                                },
                                {
                                    path: 'view/:requestId',
                                    alias: '/tech-requests/view',
                                    name: 'ViewTechRequest',
                                    component: () =>
                                        import ('./pages/TechRequests/TechRequest/View.vue'),
                                    meta: {
                                        parentTitle: 'Tech Requests',
                                        title: 'View Tech Request',
                                        module: 'Tech Requests'
                                    }
                                },
                                {
                                    path: 'add',
                                    alias: '/tech-requests/add',
                                    name: 'AddTechRequest',
                                    component: () =>
                                        import ('./pages/TechRequests/TechRequest/Add.vue'),
                                    meta: {
                                        parentTitle: 'Tech Requests',
                                        title: 'Add Tech Request',
                                        module: 'Tech Requests'
                                    }
                                },
                                {
                                    path: 'update/:requestId',
                                    alias: '/tech-requests/update',
                                    name: 'UpdateTechRequest',
                                    component: () =>
                                        import ('./pages/TechRequests/TechRequest/Browse.vue'),
                                    meta: {
                                        parentTitle: 'Tech Requests',
                                        title: 'Update Tech Request',
                                        module: 'Tech Requests'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'user',
                    components: {
                        default: () =>
                            import ('./views/Dashboard/Pages/UserProfile.vue'),
                        header: () =>
                            import ('./views/Dashboard/DefaultHeader.vue')
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

router.beforeEach((to, from, next) => {
    /*let cont = true;
    let onlyAdminPaths = [];
    let st = store;

    /**
     * make sure only admins are allowed to navigate to this route
     */

    /*if(onlyAdminPaths.length > 0 && (onlyAdminPaths.includes(to.name) || onlyAdminPaths.includes(to.meta.name)) && 
        st.getters.getUserSession.userCtx.roles.indexOf('_admin') === -1) {
        cont = false;
    }

    if(cont) {
        next();
    } else {
        next('/');
    }*/
    store.dispatch('loadUserSession');
    //console.log("to ", to, " from ", from)
    next();
});

export default router;