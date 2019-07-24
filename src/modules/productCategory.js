/*
|-------------------------------------------------------------------------------
| VUEX modules/productCategory.js
|-------------------------------------------------------------------------------
| The Vuex data productCategory for the productCategory
*/

import productCategoriesAPI from '../apis/productCategory';

export const productCategory = {
    state: {
        productCategories: [],
        productCategoriesLoadStatus: 0,
        updateProductCategoriesLoadStatus: 0,
        updateProductCategoriesResponse: {}
    },
    actions: {
        loadProductCategories: function({ commit }) {
            commit('setProductCategoriesLoadStatus', 1);

            productCategoriesAPI.index().then(function(response) {
                commit('setProductCategoriesLoadStatus', 2);
                commit('setProductCategories', response);
            }).catch(function(response) {
                console.log(response);
                commit('setProductCategoriesLoadStatus', 3);
                commit('setProductCategories', []);
            });
        },
        updateProductCategories: function({ commit }, data) {
            commit('setUpdateProductCategoriesLoadStatus', 1);

            productCategoriesAPI.update(
                data._rev,
                data.categories,
                data._id
            ).then(function(response) {
                commit('setUpdateProductCategoriesLoadStatus', 2);
                commit('setUpdateProductCategoriesResponse', response);
            }).catch(function(response) {
                commit('setUpdateProductCategoriesLoadStatus', 3);
                commit('setUpdateProductCategoriesResponse', response);
            });
        }
    },
    mutations: {
        setProductCategories(state, productCategories) {
            state.productCategories = productCategories;
        },
        setProductCategoriesLoadStatus(state, status) {
            state.productCategoriesLoadStatus = status;
        },
        setUpdateProductCategoriesLoadStatus(state, status) {
            state.updateProductCategoriesLoadStatus = status;
        },
        setUpdateProductCategoriesResponse(state, response) {
            state.updateProductCategoriesResponse = response;
        }
    },
    getters: {
        getProductCategories(state) {
            return state.productCategories;
        },
        getProductCategoriesLoadStatus(state) {
            return state.productCategoriesLoadStatus;
        },
        getUpdateProductCategoriesLoadStatus(state) {
            return state.updateProductCategoriesLoadStatus;
        },
        getUpdateProductCategoriesResponse(state) {
            return state.updateProductCategoriesResponse;
        }
    }
};