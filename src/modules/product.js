/*
|-------------------------------------------------------------------------------
| VUEX modules/product.js
|-------------------------------------------------------------------------------
| The Vuex data product for the product
*/

import ProductAPI from '../apis/product';

export const product = {
    state: {
        products: [],
        productsLoadStatus: 0,
        product: {},
        productLoadStatus: 0,
        addProductLoadStatus: 0,
        addProductResponse: {},
        updateProductLoadStatus: 0,
        updateProductResponse: {},
        deleteProductLoadStatus: 0,
        deleteProductResponse: {},
        incProQuantityLoadStatus: 0,
        incProQuantityResponse: {},
        decProQuantityLoadStatus: 0,
        decProQuantityResponse: {}
    },
    actions: {
        loadProducts: function({ commit }, data) {
            commit('setProductsLoadStatus', 1);

            ProductAPI.index(
                data.limit,
                data.descending,
                data.skip
            ).then(function(response) {
                commit('setProductsLoadStatus', 2);
                commit('setProducts', response);
            }).catch(function(response) {
                commit('setProductsLoadStatus', 3);
                commit('setProducts', []);
            });
        },
        loadProduct: function({ commit }, data) {
            commit('setProductLoadStatus', 1);

            ProductAPI.show(
                data.id
            ).then(function(response) {
                commit('setProductLoadStatus', 2);
                commit('setProduct', response);
            }).catch(function(response) {
                commit('setProductLoadStatus', 3);
                commit('setProduct', response);
            });
        },
        searchProducts: function({ commit }, data) {
            commit('setProductsLoadStatus', 1);

            ProductAPI.search(
                data.query,
                data.fields,
                data.limit,
                data.skip
            ).then(function(response) {
                commit('setProductsLoadStatus', 2);
                commit('setProducts', response);
            }).catch(function() {
                commit('setProductsLoadStatus', 3);
                commit('setProducts', []);
            });
        },
        addProduct: function({ commit }, data) {
            commit('setAddProductLoadStatus', 1);

            ProductAPI.store(
                data.name,
                data.description,
                data.store,
                data.barcode,
                data.category,
                data.manufacturer,
                data.can_be,
                data.unit,
                data.cost_price,
                data.selling_price,
                data.promo_price,
                data.is_promo_active,
                data.tax,
                data.reorder_level,
                data.quantity_in_store,
                data._attachments,
                data.created_by,
                data.created_at,
                data.updated_at
            ).then(function(response) {
                commit('setAddProductLoadStatus', 2);
                commit('setAddProductResponse', response);
            }).catch(function(response) {
                commit('setAddProductLoadStatus', 3);
                commit('setAddProductResponse', response);
            });
        },
        updateProduct: function({ commit }, data) {
            commit('setUpdateProductLoadStatus', 1);
            ProductAPI.update(
                data._id,
                data._rev,
                data.name,
                data.description,
                data.store,
                data.barcode,
                data.category,
                data.manufacturer,
                data.can_be,
                data.unit,
                data.supplier,
                data.cost_price,
                data.selling_price,
                data.promo_price,
                data.is_promo_active,
                data.tax,
                data.reorder_level,
                data.quantity_in_store,
                data._attachments,
                data.created_by,
                data.created_at,
                data.updated_at,
                data.type
            ).then(function(response) {
                commit('setUpdateProductLoadStatus', 2);
                commit('setUpdateProductResponse', response);
            }).catch(function(response) {
                commit('setUpdateProductLoadStatus', 3);
                commit('setUpdateProductResponse', response);
            });
        },
        deleteProduct: function({ commit }, data) {
            commit('setDeleteProductLoadStatus', 1);

            ProductAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteProductLoadStatus', 2);
                commit('setDeleteProductResponse', response);
            }).catch(function(response) {
                commit('setDeleteProductLoadStatus', 2);
                commit('setDeleteProductResponse', response);
            });
        },
        incProQuantity: function({ commit }, data) {
            commit('setIncProQuantityLoadStatus', 1);

            ProductAPI.increaseQuantity(
                data.id,
                data.val
            ).then(function(response) {
                commit('setIncProQuantityLoadStatus', 2);
                commit('setIncProQuantityResponse', response);
            }).catch(function(response) {
                commit('setIncProQuantityLoadStatus', 3);
                commit('setIncProQuantityResponse', response);
            });
        },
        decProQuantity: function({ commit }, data) {
            commit('setDecProQuantityLoadStatus', 1);

            ProductAPI.decreaseQuantity(
                data.id,
                data.val
            ).then(function(response) {
                commit('setDecProQuantityLoadStatus', 2);
                commit('setDecProQuantityResponse', response);
            }).catch(function(response) {
                commit('setDecProQuantityLoadStatus', 3);
                commit('setDecProQuantityResponse', response);
            });
        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setProductsLoadStatus(state, status) {
            state.productsLoadStatus = status;
        },
        setProduct(state, product) {
            state.product = product;
        },
        setProductLoadStatus(state, status) {
            state.productLoadStatus = status;
        },
        setAddProductLoadStatus(state, status) {
            state.addProductLoadStatus = status;
        },
        setAddProductResponse(state, response) {
            state.addProductResponse = response;
        },
        setUpdateProductLoadStatus(state, status) {
            state.updateProductLoadStatus = status;
        },
        setUpdateProductResponse(state, response) {
            state.updateProductResponse = response;
        },
        setDeleteProductLoadStatus(state, status) {
            state.deleteProductLoadStatus = status;
        },
        setDeleteProductResponse(state, response) {
            state.deleteProductResponse = response;
        },
        setIncProQuantityLoadStatus(state, status) {
            state.incProQuantityLoadStatus = status;
        },
        setIncProQuantityResponse(state, response) {
            state.incProQuantityResponse = response;
        },
        setDecProQuantityLoadStatus(state, status) {
            state.decProQuantityLoadStatus = status;
        },
        setDecProQuantityResponse(state, response) {
            state.decProQuantityResponse = response;
        }
    },
    getters: {
        getProducts(state) {
            return state.products;
        },
        getProductsLoadStatus(state) {
            return state.productsLoadStatus;
        },
        getProduct(state) {
            return state.product;
        },
        getProductLoadStatus(state) {
            return state.productLoadStatus;
        },
        getAddProductLoadStatus(state) {
            return state.addProductLoadStatus;
        },
        getAddProductResponse(state) {
            return state.addProductResponse;
        },
        getUpdateProductLoadStatus(state) {
            return state.updateProductLoadStatus;
        },
        getUpdateProductResponse(state) {
            return state.updateProductResponse;
        },
        getDeleteProductLoadStatus(state) {
            return state.deleteProductLoadStatus;
        },
        getDeleteProductResponse(state) {
            return state.deleteProductResponse;
        },
        getIncProQuantityLoadStatus(state) {
            return state.incProQuantityLoadStatus;
        },
        getIncProQuantityResponse(state) {
            return state.incProQuantityResponse;
        },
        getDecProQuantityLoadStatus(state) {
            return state.decProQuantityLoadStatus;
        },
        getDecProQuantityResponse(state) {
            return state.decProQuantityResponse;
        }
    }
};