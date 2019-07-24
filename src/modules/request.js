/*
|-------------------------------------------------------------------------------
| VUEX modules/request.js
|-------------------------------------------------------------------------------
| The Vuex data request for the request
*/

import RequestAPI from '../apis/request';

export const request = {
    state: {
        requests: [],
        requestsLoadStatus: 0,
        request: {},
        requestLoadStatus: 0,
        addRequestLoadStatus: 0,
        addRequestResponse: {},
        updateRequestLoadStatus: 0,
        updateRequestResponse: {},
        deleteRequestLoadStatus: 0,
        deleteRequestResponse: {},
        completeRequestLoadStatus: 0,
        completeRequestResponse: {}
    },
    actions: {
        loadRequests: function({ commit }, data) {
            commit('setRequestsLoadStatus', 1);

            RequestAPI.index(
                data.limit,
                data.descending,
                data.skip
            ).then(function(response) {
                commit('setRequestsLoadStatus', 2);
                commit('setRequests', response);
            }).catch(function(response) {
                commit('setRequestsLoadStatus', 3);
                commit('setRequests', []);
            });
        },
        loadRequest: function({ commit }, data) {
            commit('setRequestLoadStatus', 1);

            RequestAPI.show(
                data.id
            ).then(function(response) {
                commit('setRequestLoadStatus', 2);
                commit('setRequest', response);
            }).catch(function(response) {
                commit('setRequestLoadStatus', 3);
                commit('setRequest', response);
            });
        },
        searchRequests: function({ commit }, data) {
            commit('setRequestsLoadStatus', 1);

            RequestAPI.search(
                data.query,
                data.fields,
                data.limit,
                data.skip
            ).then(function(response) {
                commit('setRequestsLoadStatus', 2);
                commit('setRequests', response);
            }).catch(function() {
                commit('setRequestsLoadStatus', 3);
                commit('setRequests', []);
            });
        },
        addRequest: function({ commit }, data) {
            commit('setAddRequestLoadStatus', 1);

            RequestAPI.store(
                data.product,
                data.from_store,
                data.to_store,
                data.quantity,
                data.status,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.completed_at
            ).then(function(response) {
                commit('setAddRequestLoadStatus', 2);
                commit('setAddRequestResponse', response);
            }).catch(function(response) {
                commit('setAddRequestLoadStatus', 3);
                commit('setAddRequestResponse', response);
            });
        },
        updateRequest: function({ commit }, data) {
            commit('setUpdateRequestLoadStatus', 1);
            RequestAPI.update(
                data._id,
                data._rev,
                data.product,
                data.from_store,
                data.to_store,
                data.quantity,
                data.status,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.completed_at,
                data.type
            ).then(function(response) {
                commit('setUpdateRequestLoadStatus', 2);
                commit('setUpdateRequestResponse', response);
            }).catch(function(response) {
                commit('setUpdateRequestLoadStatus', 3);
                commit('setUpdateRequestResponse', response);
            });
        },
        completeRequest: function({ commit }, data) {
            commit('setCompleteRequestLoadStatus', 1);

            RequestAPI.completeRequest(
                data.id,
                data.status,
                data.notes,
                data.completed_by
            ).then(function(response) {
                commit('setCompleteRequestLoadStatus', 2);
                commit('setCompleteRequestResponse', response);
            }).catch(function(response) {
                commit('setCompleteRequestLoadStatus', 3);
                commit('setCompleteRequestResponse', response);
            });
        },
        deleteRequest: function({ commit }, data) {
            commit('setDeleteRequestLoadStatus', 1);

            RequestAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteRequestLoadStatus', 2);
                commit('setDeleteRequestResponse', response);
            }).catch(function(response) {
                commit('setDeleteRequestLoadStatus', 2);
                commit('setDeleteRequestResponse', response);
            });
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests;
        },
        setRequestsLoadStatus(state, status) {
            state.requestsLoadStatus = status;
        },
        setRequest(state, request) {
            state.request = request;
        },
        setRequestLoadStatus(state, status) {
            state.requestLoadStatus = status;
        },
        setAddRequestLoadStatus(state, status) {
            state.addRequestLoadStatus = status;
        },
        setAddRequestResponse(state, response) {
            state.addRequestResponse = response;
        },
        setUpdateRequestLoadStatus(state, status) {
            state.updateRequestLoadStatus = status;
        },
        setUpdateRequestResponse(state, response) {
            state.updateRequestResponse = response;
        },
        setDeleteRequestLoadStatus(state, status) {
            state.deleteRequestLoadStatus = status;
        },
        setDeleteRequestResponse(state, response) {
            state.deleteRequestResponse = response;
        },
        setCompleteRequestLoadStatus(state, status) {
            state.completeRequestLoadStatus = status;
        },
        setCompleteRequestResponse(state, response) {
            state.completeRequestResponse = response;
        }
    },
    getters: {
        getRequests(state) {
            return state.requests;
        },
        getRequestsLoadStatus(state) {
            return state.requestsLoadStatus;
        },
        getRequest(state) {
            return state.request;
        },
        getRequestLoadStatus(state) {
            return state.requestLoadStatus;
        },
        getAddRequestLoadStatus(state) {
            return state.addRequestLoadStatus;
        },
        getAddRequestResponse(state) {
            return state.addRequestResponse;
        },
        getUpdateRequestLoadStatus(state) {
            return state.updateRequestLoadStatus;
        },
        getUpdateRequestResponse(state) {
            return state.updateRequestResponse;
        },
        getDeleteRequestLoadStatus(state) {
            return state.deleteRequestLoadStatus;
        },
        getDeleteRequestResponse(state) {
            return state.deleteRequestResponse;
        },
        getCompleteRequestLoadStatus(state) {
            return state.completeRequestLoadStatus;
        },
        getCompleteRequestResponse(state) {
            return state.completeRequestResponse;
        }
    }
};