import Vue from 'vue';
import Vuex from 'vuex';

/**
 * VueX persisted store
 * https://github.com/robinvdvleuten/vuex-persistedstate
 */
import createPersistedState from 'vuex-persistedstate';

/*
    Initializes Vuex on Vue.
*/
Vue.use(Vuex);

/*
    Imports all of the modules used in the application to build the data store.
*/
import { user } from './modules/user';
import { organization } from './modules/organization';
import { organizationType } from './modules/organizationType';
import { tech_request } from './modules/tech_request';

/* 
Exports our data store.
*/
export default new Vuex.Store({
    modules: {
        user,
        organization,
        organizationType,
        tech_request
    },
    plugins: [
        createPersistedState()
    ]
});