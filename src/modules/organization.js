/*
|-------------------------------------------------------------------------------
| VUEX modules/organization.js
|-------------------------------------------------------------------------------
| The Vuex data organization for the organization
*/

import OrganizationAPI from '../apis/organization';

export const organization = {
    state: {
        organizations: [],
        organizationsLoadStatus: 0,
        organization: {},
        organizationLoadStatus: 0,
        addOrganizationLoadStatus: 0,
        addOrganizationResponse: {},
        updateOrganizationLoadStatus: 0,
        updateOrganizationResponse: {},
        deleteOrganizationLoadStatus: 0,
        deleteOrganizationResponse: {}
    },
    actions: {
        loadOrganizations: function({ commit }, data) {
            commit('setOrganizationsLoadStatus', 1);

            OrganizationAPI.index(
                data.limit,
                data.descending,
                data.skip
            ).then(function(response) {
                commit('setOrganizationsLoadStatus', 2);
                commit('setOrganizations', response);
            }).catch(function(response) {
                commit('setOrganizationsLoadStatus', 3);
                commit('setOrganizations', []);
            });
        },
        loadOrganization: function({ commit }, data) {
            commit('setOrganizationLoadStatus', 1);

            OrganizationAPI.show(
                data.id
            ).then(function(response) {
                commit('setOrganizationLoadStatus', 2);
                commit('setOrganization', response);
            }).catch(function(response) {
                commit('setOrganizationLoadStatus', 3);
                commit('setOrganization', response);
            });
        },
        searchOrganizations: function({ commit }, data) {
            commit('setOrganizationsLoadStatus', 1);

            OrganizationAPI.search(
                data.query,
                data.fields,
                data.limit,
                data.skip
            ).then(function(response) {
                commit('setOrganizationsLoadStatus', 2);
                commit('setOrganizations', response);
            }).catch(function(response) {
                commit('setOrganizationsLoadStatus', 3);
                commit('setOrganizations', []);
            });
        },
        addOrganization: function({ commit }, data) {
            commit('setAddOrganizationLoadStatus', 1);

            OrganizationAPI.store(
                data._id,
                data.name,
                data.legal_organization,
                data.primary_contact,
                data.secondary_contact,
                data.organization_type,
                data.website,
                data.social_media,
                data.ein,
                data.acc_file,
                data.requests,
                data.camps,
                data.notes,
                data.thumbnail_name,
                data._attachments,
                data.created_by,
                data.created_at,
                data.updated_at
            ).then(function(response) {
                commit('setAddOrganizationLoadStatus', 2);
                commit('setAddOrganizationResponse', response);
            }).catch(function(response) {
                commit('setAddOrganizationLoadStatus', 3);
                commit('setAddOrganizationResponse', response);
            });
        },
        updateOrganization: function({ commit }, data) {
            commit('setUpdateOrganizationLoadStatus', 1);

            OrganizationAPI.update(
                data._id,
                data._rev,
                data.name,
                data.legal_organization,
                data.primary_contact,
                data.secondary_contact,
                data.organization_type,
                data.website,
                data.social_media,
                data.ein,
                data.acc_file,
                data.requests,
                data.camps,
                data.notes,
                data.thumbnail_name,
                data._attachments,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.type
            ).then(function(response) {
                commit('setUpdateOrganizationLoadStatus', 2);
                commit('setUpdateOrganizationResponse', response);
            }).catch(function(response) {
                commit('setUpdateOrganizationLoadStatus', 3);
                commit('setUpdateOrganizationResponse', response);
            });
        },
        deleteOrganization: function({ commit }, data) {
            commit('setDeleteOrganizationLoadStatus', 1);

            OrganizationAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteOrganizationLoadStatus', 2);
                commit('setDeleteOrganizationResponse', response);
            }).catch(function(response) {
                commit('setDeleteOrganizationLoadStatus', 2);
                commit('setDeleteOrganizationResponse', response);
            });
        }
    },
    mutations: {
        setOrganizations(state, organizations) {
            state.organizations = organizations;
        },
        setOrganizationsLoadStatus(state, status) {
            state.organizationsLoadStatus = status;
        },
        setOrganization(state, organization) {
            state.organization = organization;
        },
        setOrganizationLoadStatus(state, status) {
            state.organizationLoadStatus = status;
        },
        setAddOrganizationLoadStatus(state, status) {
            state.addOrganizationLoadStatus = status;
        },
        setAddOrganizationResponse(state, response) {
            state.addOrganizationResponse = response;
        },
        setUpdateOrganizationLoadStatus(state, status) {
            state.updateOrganizationLoadStatus = status;
        },
        setUpdateOrganizationResponse(state, response) {
            state.updateOrganizationResponse = response;
        },
        setDeleteOrganizationLoadStatus(state, status) {
            state.deleteOrganizationLoadStatus = status;
        },
        setDeleteOrganizationResponse(state, response) {
            state.deleteOrganizationResponse = response;
        }
    },
    getters: {
        getOrganizations(state) {
            return state.organizations;
        },
        getOrganizationsLoadStatus(state) {
            return state.organizationsLoadStatus;
        },
        getOrganization(state) {
            return state.organization;
        },
        getOrganizationLoadStatus(state) {
            return state.organizationLoadStatus;
        },
        getAddOrganizationLoadStatus(state) {
            return state.addOrganizationLoadStatus;
        },
        getAddOrganizationResponse(state) {
            return state.addOrganizationResponse;
        },
        getUpdateOrganizationLoadStatus(state) {
            return state.updateOrganizationLoadStatus;
        },
        getUpdateOrganizationResponse(state) {
            return state.updateOrganizationResponse;
        },
        getDeleteOrganizationLoadStatus(state) {
            return state.deleteOrganizationLoadStatus;
        },
        getDeleteOrganizationResponse(state) {
            return state.deleteOrganizationResponse;
        }
    }
};