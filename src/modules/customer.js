/*
|-------------------------------------------------------------------------------
| VUEX modules/customer.js
|-------------------------------------------------------------------------------
| The Vuex data customer for the customer
*/

import CustomerAPI from '../apis/customer';

export const customer = {
    state: {
        customers: [],
        customersLoadStatus: 0,
        customer: {},
        customerLoadStatus: 0,
        addCustomerLoadStatus: 0,
        addCustomerResponse: {},
        updateCustomerLoadStatus: 0,
        updateCustomerResponse: {},
        deleteCustomerLoadStatus: 0,
        deleteCustomerResponse: {}
    },
    actions: {
        loadCustomers: function({ commit }, data) {
            commit('setCustomersLoadStatus', 1);

            CustomerAPI.index(
                data.limit,
                data.descending,
                data.skip,
                data.flag = null
            ).then(function(response) {
                commit('setCustomersLoadStatus', 2);
                commit('setCustomers', response);
            }).catch(function(response) {
                commit('setCustomersLoadStatus', 3);
                commit('setCustomers', []);
            });
        },
        loadCustomer: function({ commit }, data) {
            commit('setCustomerLoadStatus', 1);

            CustomerAPI.show(
                data.id
            ).then(function(response) {
                commit('setCustomerLoadStatus', 2);
                commit('setCustomer', response);
            }).catch(function(response) {
                commit('setCustomerLoadStatus', 3);
                commit('setCustomer', response);
            });
        },
        searchCustomers: function({ commit }, data) {
            commit('setCustomersLoadStatus', 1);

            CustomerAPI.search(
                data.query,
                data.fields,
                data.limit,
                data.skip
            ).then(function(response) {
                commit('setCustomersLoadStatus', 2);
                commit('setCustomers', response);
            }).catch(function(response) {
                commit('setCustomersLoadStatus', 3);
                commit('setCustomers', []);
            });
        },
        addCustomer: function({ commit }, data) {
            commit('setAddCustomerLoadStatus', 1);

            CustomerAPI.store(
                data.name,
                data.phone_number,
                data.email,
                data.customer_type,
                data.address,
                data.account_info,
                data.website,
                data.created_by,
                data.created_at,
                data.updated_at
            ).then(function(response) {
                commit('setAddCustomerLoadStatus', 2);
                commit('setAddCustomerResponse', response);
            }).catch(function(response) {
                commit('setAddCustomerLoadStatus', 3);
                commit('setAddCustomerResponse', response);
            });
        },
        updateCustomer: function({ commit }, data) {
            commit('setUpdateCustomerLoadStatus', 1);

            CustomerAPI.update(
                data._id,
                data._rev,
                data.name,
                data.phone_number,
                data.email,
                data.customer_type,
                data.address,
                data.account_info,
                data.website,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.type
            ).then(function(response) {
                commit('setUpdateCustomerLoadStatus', 2);
                commit('setUpdateCustomerResponse', response);
            }).catch(function(response) {
                commit('setUpdateCustomerLoadStatus', 3);
                commit('setUpdateCustomerResponse', response);
            });
        },
        deleteCustomer: function({ commit }, data) {
            commit('setDeleteCustomerLoadStatus', 1);

            CustomerAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteCustomerLoadStatus', 2);
                commit('setDeleteCustomerResponse', response);
            }).catch(function(response) {
                commit('setDeleteCustomerLoadStatus', 2);
                commit('setDeleteCustomerResponse', response);
            });
        }
    },
    mutations: {
        setCustomers(state, customers) {
            state.customers = customers;
        },
        setCustomersLoadStatus(state, status) {
            state.customersLoadStatus = status;
        },
        setCustomer(state, customer) {
            state.customer = customer;
        },
        setCustomerLoadStatus(state, status) {
            state.customerLoadStatus = status;
        },
        setAddCustomerLoadStatus(state, status) {
            state.addCustomerLoadStatus = status;
        },
        setAddCustomerResponse(state, response) {
            state.addCustomerResponse = response;
        },
        setUpdateCustomerLoadStatus(state, status) {
            state.updateCustomerLoadStatus = status;
        },
        setUpdateCustomerResponse(state, response) {
            state.updateCustomerResponse = response;
        },
        setDeleteCustomerLoadStatus(state, status) {
            state.deleteCustomerLoadStatus = status;
        },
        setDeleteCustomerResponse(state, response) {
            state.deleteCustomerResponse = response;
        }
    },
    getters: {
        getCustomers(state) {
            return state.customers;
        },
        getCustomersLoadStatus(state) {
            return state.customersLoadStatus;
        },
        getCustomer(state) {
            return state.customer;
        },
        getCustomerLoadStatus(state) {
            return state.customerLoadStatus;
        },
        getAddCustomerLoadStatus(state) {
            return state.addCustomerLoadStatus;
        },
        getAddCustomerResponse(state) {
            return state.addCustomerResponse;
        },
        getUpdateCustomerLoadStatus(state) {
            return state.updateCustomerLoadStatus;
        },
        getUpdateCustomerResponse(state) {
            return state.updateCustomerResponse;
        },
        getDeleteCustomerLoadStatus(state) {
            return state.deleteCustomerLoadStatus;
        },
        getDeleteCustomerResponse(state) {
            return state.deleteCustomerResponse;
        }
    }
};