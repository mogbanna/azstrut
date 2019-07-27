/*
|-------------------------------------------------------------------------------
| VUEX modules/techRequest.js
|-------------------------------------------------------------------------------
| The Vuex data techRequest for the techRequest
*/

import TechRequestAPI from '../apis/tech_request';

export const techRequest = {
    state: {
        techRequests: [],
        techRequestsLoadStatus: 0,
        techRequest: {},
        techRequestLoadStatus: 0,
        addTechRequestLoadStatus: 0,
        addTechRequestResponse: {},
        updateTechRequestLoadStatus: 0,
        updateTechRequestResponse: {},
        deleteTechRequestLoadStatus: 0,
        deleteTechRequestResponse: {},
        completeTechRequestLoadStatus: 0,
        completeTechRequestResponse: {}
    },
    actions: {
        loadTechRequests: function({ commit }, data) {
            commit('setTechRequestsLoadStatus', 1);

            TechRequestAPI.index(
                data.limit,
                data.descending,
                data.skip
            ).then(function(response) {
                commit('setTechRequestsLoadStatus', 2);
                commit('setTechRequests', response);
            }).catch(function(response) {
                commit('setTechRequestsLoadStatus', 3);
                commit('setTechRequests', []);
            });
        },
        loadTechRequest: function({ commit }, data) {
            commit('setTechRequestLoadStatus', 1);

            TechRequestAPI.show(
                data.id
            ).then(function(response) {
                commit('setTechRequestLoadStatus', 2);
                commit('setTechRequest', response);
            }).catch(function(response) {
                commit('setTechRequestLoadStatus', 3);
                commit('setTechRequest', response);
            });
        },
        searchTechRequests: function({ commit }, data) {
            commit('setTechRequestsLoadStatus', 1);

            TechRequestAPI.search(
                data.query,
                data.fields,
                data.limit,
                data.skip
            ).then(function(response) {
                commit('setTechRequestsLoadStatus', 2);
                commit('setTechRequests', response);
            }).catch(function() {
                commit('setTechRequestsLoadStatus', 3);
                commit('setTechRequests', []);
            });
        },
        addTechRequest: function({ commit }, data) {
            commit('setAddTechRequestLoadStatus', 1);

            TechRequestAPI.store(
                data.organization,
                data.num_desktops,
                data.num_laptops,
                data.status,
                data.notes,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.updated_by,
                data.completed_at
            ).then(function(response) {
                commit('setAddTechRequestLoadStatus', 2);
                commit('setAddTechRequestResponse', response);
            }).catch(function(response) {
                commit('setAddTechRequestLoadStatus', 3);
                commit('setAddTechRequestResponse', response);
            });
        },
        updateTechRequest: function({ commit }, data) {
            commit('setUpdateTechRequestLoadStatus', 1);
            TechRequestAPI.update(
                data._id,
                data._rev,
                data.organization,
                data.num_desktops,
                data.num_laptops,
                data.status,
                data.notes,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.updated_by,
                data.completed_at,
                data.type
            ).then(function(response) {
                commit('setUpdateTechRequestLoadStatus', 2);
                commit('setUpdateTechRequestResponse', response);
            }).catch(function(response) {
                commit('setUpdateTechRequestLoadStatus', 3);
                commit('setUpdateTechRequestResponse', response);
            });
        },
        completeTechRequest: function({ commit }, data) {
            commit('setCompleteTechRequestLoadStatus', 1);

            TechRequestAPI.completeTechRequest(
                data.id,
                data.status,
                data.distribution,
                data.completed_by
            ).then(function(response) {
                commit('setCompleteTechRequestLoadStatus', 2);
                commit('setCompleteTechRequestResponse', response);
            }).catch(function(response) {
                commit('setCompleteTechRequestLoadStatus', 3);
                commit('setCompleteTechRequestResponse', response);
            });
        },
        deleteTechRequest: function({ commit }, data) {
            commit('setDeleteTechRequestLoadStatus', 1);

            TechRequestAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteTechRequestLoadStatus', 2);
                commit('setDeleteTechRequestResponse', response);
            }).catch(function(response) {
                commit('setDeleteTechRequestLoadStatus', 2);
                commit('setDeleteTechRequestResponse', response);
            });
        }
    },
    mutations: {
        setTechRequests(state, techRequests) {
            state.techRequests = techRequests;
        },
        setTechRequestsLoadStatus(state, status) {
            state.techRequestsLoadStatus = status;
        },
        setTechRequest(state, techRequest) {
            state.techRequest = techRequest;
        },
        setTechRequestLoadStatus(state, status) {
            state.techRequestLoadStatus = status;
        },
        setAddTechRequestLoadStatus(state, status) {
            state.addTechRequestLoadStatus = status;
        },
        setAddTechRequestResponse(state, response) {
            state.addTechRequestResponse = response;
        },
        setUpdateTechRequestLoadStatus(state, status) {
            state.updateTechRequestLoadStatus = status;
        },
        setUpdateTechRequestResponse(state, response) {
            state.updateTechRequestResponse = response;
        },
        setDeleteTechRequestLoadStatus(state, status) {
            state.deleteTechRequestLoadStatus = status;
        },
        setDeleteTechRequestResponse(state, response) {
            state.deleteTechRequestResponse = response;
        },
        setCompleteTechRequestLoadStatus(state, status) {
            state.completeTechRequestLoadStatus = status;
        },
        setCompleteTechRequestResponse(state, response) {
            state.completeTechRequestResponse = response;
        }
    },
    getters: {
        getTechRequests(state) {
            return state.techRequests;
        },
        getTechRequestsLoadStatus(state) {
            return state.techRequestsLoadStatus;
        },
        getTechRequest(state) {
            return state.techRequest;
        },
        getTechRequestLoadStatus(state) {
            return state.techRequestLoadStatus;
        },
        getAddTechRequestLoadStatus(state) {
            return state.addTechRequestLoadStatus;
        },
        getAddTechRequestResponse(state) {
            return state.addTechRequestResponse;
        },
        getUpdateTechRequestLoadStatus(state) {
            return state.updateTechRequestLoadStatus;
        },
        getUpdateTechRequestResponse(state) {
            return state.updateTechRequestResponse;
        },
        getDeleteTechRequestLoadStatus(state) {
            return state.deleteTechRequestLoadStatus;
        },
        getDeleteTechRequestResponse(state) {
            return state.deleteTechRequestResponse;
        },
        getCompleteTechRequestLoadStatus(state) {
            return state.completeTechRequestLoadStatus;
        },
        getCompleteTechRequestResponse(state) {
            return state.completeTechRequestResponse;
        }
    }
};