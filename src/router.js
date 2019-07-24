import Vue from 'vue'
import Router from 'vue-router'

import DashboardLayout from './layouts/Dashboard/DashboardLayout.vue'

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
            component: DashboardLayout,
            children: [{
                    path: '',
                    name: 'Dashboard',
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
                                    alias: '/organizations/view',
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

export default router;