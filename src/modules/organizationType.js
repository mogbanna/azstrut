/*
|-------------------------------------------------------------------------------
| VUEX modules/organizationType.js
|-------------------------------------------------------------------------------
| The Vuex data organizationType for the organizationType
*/

import organizationTypesAPI from '../apis/organizationType';

export const organizationType = {
    state: {
        organizationTypes: [],
        organizationTypesLoadStatus: 0,
        updateOrganizationTypesLoadStatus: 0,
        updateOrganizationTypesResponse: {}
    },
    actions: {
        loadOrganizationTypes: function({ commit }) {
            commit('setOrganizationTypesLoadStatus', 1);

            organizationTypesAPI.index().then(function(response) {
                commit('setOrganizationTypesLoadStatus', 2);
                commit('setOrganizationTypes', response);
            }).catch(function(response) {
                console.log(response);
                commit('setOrganizationTypesLoadStatus', 3);
                commit('setOrganizationTypes', []);
            });
        },
        updateOrganizationTypes: function({ commit }, data) {
            commit('setUpdateOrganizationTypesLoadStatus', 1);

            organizationTypesAPI.update(
                data._rev,
                data.types,
                data._id
            ).then(function(response) {
                commit('setUpdateOrganizationTypesLoadStatus', 2);
                commit('setUpdateOrganizationTypesResponse', response);
            }).catch(function(response) {
                commit('setUpdateOrganizationTypesLoadStatus', 3);
                commit('setUpdateOrganizationTypesResponse', response);
            });
        }
    },
    mutations: {
        setOrganizationTypes(state, organizationTypes) {
            state.organizationTypes = organizationTypes;
        },
        setOrganizationTypesLoadStatus(state, status) {
            state.organizationTypesLoadStatus = status;
        },
        setUpdateOrganizationTypesLoadStatus(state, status) {
            state.updateOrganizationTypesLoadStatus = status;
        },
        setUpdateOrganizationTypesResponse(state, response) {
            state.updateOrganizationTypesResponse = response;
        }
    },
    getters: {
        getOrganizationTypes(state) {
            return state.organizationTypes;
        },
        getOrganizationTypesLoadStatus(state) {
            return state.organizationTypesLoadStatus;
        },
        getUpdateOrganizationTypesLoadStatus(state) {
            return state.updateOrganizationTypesLoadStatus;
        },
        getUpdateOrganizationTypesResponse(state) {
            return state.updateOrganizationTypesResponse;
        }
    }
};