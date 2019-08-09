/*
|-------------------------------------------------------------------------------
| VUEX modules/user.js
|-------------------------------------------------------------------------------
| The Vuex data store for the user
*/

import UserAPI from '../apis/user';

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

export const user = {
    state: {
        users: [],
        usersLoadStatus: 0,
        user: {},
        userLoadStatus: 0,
        userSession: {},
        userSessionLoadStatus: 0,
        registerUserLoadStatus: 0,
        loginUserLoadStatus: 0,
        logoutUserLoadStatus: 0,
        updateUserLoadStatus: 0,
        deleteUserLoadStatus: 0,
        changePasswordLoadStatus: 0,
        signUpAdminLoadStatus: 0,
        deleteAdminLoadStatus: 0,
        response: {}
    },
    actions: {
        loadUsers: function({ commit }, data) {
            commit('setUsersLoadStatus', 1);

            UserAPI.index(
                data.limit,
                data.descending,
                data.skip
            ).then(function(response) {
                commit('setUsersLoadStatus', 2);
                commit('setUsers', response);
            }).catch(function() {
                commit('setUsersLoadStatus', 3);
                commit('setUsers', []);
            });
        },
        loadUser: function({ commit }, data) {
            commit('setUserLoadStatus', 1);

            UserAPI.show(
                data.username
            ).then(function(response) {
                commit('setUserLoadStatus', 2);
                commit('setUser', response);
            }).catch(function() {
                commit('setUserLoadStatus', 3);
                commit('setUser', {});
            });
        },
        searchUsers: function({ commit }, data) {
            commit('setUsersLoadStatus', 1);

            UserAPI.search(
                data.query,
                data.fields,
                data.limit,
                data.skip
            ).then(function(response) {
                commit('setUsersLoadStatus', 2);
                commit('setUsers', response);
            }).catch(function() {
                commit('setUsersLoadStatus', 3);
                commit('setUsers', []);
            });
        },
        registerUser: function({ commit, dispatch }, data) {
            commit('setRegisterUserLoadStatus', 1);

            UserAPI.store(
                data.username,
                data.password,
                data.opts
            ).then(function(response) {
                commit('setRegisterUserLoadStatus', 2);
                commit('setResponse', response);
            }).catch(function(response) {
                commit('setRegisterUserLoadStatus', 3);
                commit('setResponse', response);
            });
        },
        loginUser: function({ commit, dispatch }, data) {
            commit('setLoginUserLoadStatus', 1);

            UserAPI.login(
                data.username,
                data.password,
                // data.store
            ).then((response) => {
                commit('setLoginUserLoadStatus', 2);
                commit('setResponse', response);

                if (!navigator.onLine && response.ok == true) {
                    let session = {
                        "info": {
                            "authenticated": "offline",
                            "authentication_db": "_users",
                            "authentication_handlers": ["oauth", "cookie", "default"]
                        },
                        "ok": true,
                        "userCtx": {
                            "name": response.name,
                            "roles": response.roles
                        },
                        // "store": data.store
                    };

                    if (storageAvailable('localStorage')) {
                        //set the new session in local storage
                        localStorage.setItem('session', JSON.stringify(session));
                    }

                    dispatch('loadUserSession');
                } else if (navigator.onLine && response.ok == true) {
                    if (response.ok == true) {
                        dispatch('loadUserSession');
                    }
                }

                if (storageAvailable('localStorage')) {
                    //set the new session in local storage
                    // localStorage.setItem('store', JSON.stringify(data.store));
                }
            }).catch(function(response) {
                commit('setLoginUserLoadStatus', 3);
                commit('setResponse', response);
            });
        },
        loadUserSession: function({ commit }) {
            commit('setUserSessionLoadStatus', 1);

            if (storageAvailable('localStorage') && !localStorage.getItem('session')) {
                let session = {
                    info: {
                        "authenticated": "offline",
                        "authentication_db": "_users",
                        "authentication_handlers": ["oauth", "cookie", "default"]
                    },
                    ok: true,
                    userCtx: {
                        "name": null,
                        "roles": []
                    },
                    // store: JSON.parse(localStorage.getItem('store'))
                };

                //set the new session in local storage
                localStorage.setItem('session', JSON.stringify(session));
            }

            /**
             * Test if there is internet connection. if there isnt, get 
             * session from the local storage. but if there is internet 
             * connection, the session should always be gotten from the 
             * server.
             */

            if (!navigator.onLine &&
                storageAvailable('localStorage') &&
                localStorage.getItem('session')) {
                //getting session from local Storage
                //console.log('getting session from localStorage');
                commit('setUserSessionLoadStatus', 2);
                commit('setUserSession', JSON.parse(localStorage.getItem('session')));
            } else {
                //getting session from across
                UserAPI.getSession().then(function(response) {
                    commit('setUserSessionLoadStatus', 2);

                    // response.store = JSON.parse(localStorage.getItem('store'));
                    commit('setUserSession', response);

                    if (storageAvailable('localStorage')) {
                        //set the new session in local storage
                        localStorage.setItem('session', JSON.stringify(response));
                    }
                }).catch(function() {
                    commit('setUserSessionLoadStatus', 3);
                    //commit('setUserSession', {});
                });
            }
        },
        logoutUser: function({ commit }) {
            commit('setLogoutUserLoadStatus', 1);

            let session = {
                info: {
                    "authenticated": "offline",
                    "authentication_db": "_users",
                    "authentication_handlers": ["oauth", "cookie", "default"]
                },
                ok: true,
                userCtx: {
                    "name": null,
                    "roles": []
                },
                // store: null
            };

            if (storageAvailable('localStorage') && localStorage.getItem('session')) {
                localStorage.setItem('session', JSON.stringify(session));
            }

            if (!navigator.onLine) {
                commit('setLogoutUserLoadStatus', 2);
                commit('setResponse', { "ok": true });
            } else {
                UserAPI.logout().then(function(response) {
                    commit('setLogoutUserLoadStatus', 2);
                    commit('setResponse', response);
                }).catch(function() {
                    commit('setLogoutUserLoadStatus', 3);
                    commit('setResponse', {});
                });
            }
        },
        updateUser: function({ commit }, data) {
            commit('setUpdateUserLoadStatus', 1);

            UserAPI.update(
                data.username,
                data.opts
            ).then(function(response) {
                commit('setUpdateUserLoadStatus', 2);
                commit('setResponse', response);
            }).catch(function() {
                commit('setUpdateUserLoadStatus', 3);
                commit('setResponse', {});
            });
        },
        changePassword: function({ commit }, data) {
            commit('setChangePasswordLoadStatus', 1);

            UserAPI.changePassword(
                data.username,
                data.password
            ).then(function(response) {
                commit('setChangePasswordLoadStatus', 2);
                commit('setResponse', response);
            }).catch(function(response) {
                commit('setChangePasswordLoadStatus', 3);
                commit('setResponse', response);
            });
        },
        deleteUser: function({ commit }, data) {
            commit('setDeleteUserLoadStatus', 1);

            UserAPI.destroy(
                data.username
            ).then(function(response) {
                commit('setDeleteUserLoadStatus', 2);
                commit('setResponse', response);
            }).catch(function() {
                commit('setDeleteUserLoadStatus', 3);
                commit('setResponse', {});
            });
        },
        signUpAdmin: function({ commit }, data) {
            commit('setSignUpAdminLoadStatus', 1);

            UserAPI.signUpAdmin(
                data.username,
                data.password,
                data.opts
            ).then(function(response) {
                commit('setSignUpAdminLoadStatus', 2);
                commit('setResponse', response);
            }).catch(function() {
                commit('setSignUpAdminLoadStatus', 3);
                commit('setResponse', {});
            });
        },
        deleteAdmin: function({ commit }, data) {
            commit('setDeleteAdminLoadStatus', 1);

            UserAPI.deleteAdmin(
                data.username
            ).then(function(response) {
                commit('setDeleteAdminLoadStatus', 2);
                commit('setResponse', response);
            }).catch(function() {
                commit('setDeleteAdminLoadStatus', 3);
                commit('setResponse', {});
            });
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setUsersLoadStatus(state, status) {
            state.usersLoadStatus = status;
        },
        setUser(state, user) {
            state.user = user;
        },
        setUserLoadStatus(state, status) {
            state.userLoadStatus = status;
        },
        setUserSession(state, session) {
            state.userSession = session;
        },
        setUserSessionLoadStatus(state, status) {
            state.userSessionLoadStatus = status;
        },
        setRegisterUserLoadStatus(state, status) {
            state.registerUserLoadStatus = status;
        },
        setLoginUserLoadStatus(state, status) {
            state.loginUserLoadStatus = status;
        },
        setLogoutUserLoadStatus(state, status) {
            state.logoutUserLoadStatus = status;
        },
        setUpdateUserLoadStatus(state, status) {
            state.updateUserLoadStatus = status;
        },
        setDeleteUserLoadStatus(state, status) {
            state.deleteUserLoadStatus = status;
        },
        setChangePasswordLoadStatus(state, status) {
            state.changePasswordLoadStatus = status;
        },
        setSignUpAdminLoadStatus(state, status) {
            state.signUpAdminLoadStatus = status;
        },
        setDeleteAdminLoadStatus(state, status) {
            state.deleteAdminLoadStatus = status;
        },
        setResponse(state, response) {
            state.response = response;
        }
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        getUsersLoadStatus(state) {
            return state.usersLoadStatus;
        },
        getUser(state) {
            return state.user;
        },
        getUserLoadStatus(state) {
            return state.userLoadStatus;
        },
        getUserSession(state) {
            return state.userSession;
        },
        getUserSessionLoadStatus(state) {
            return state.userSessionLoadStatus;
        },
        getRegisterUserLoadStatus(state) {
            return state.registerUserLoadStatus;
        },
        getLoginUserLoadStatus(state) {
            return state.loginUserLoadStatus;
        },
        getLogoutUserLoadStatus(state) {
            return state.logoutUserLoadStatus;
        },
        getUpdateUserLoadStatus(state) {
            return state.updateUserLoadStatus;
        },
        getDeleteUserLoadStatus(state) {
            return state.deleteUserLoadStatus;
        },
        getChangePasswordLoadStatus(state) {
            return state.changePasswordLoadStatus;
        },
        getSignUpAdminLoadStatus(state) {
            return state.signUpAdminLoadStatus;
        },
        getDeleteAdminLoadStatus(state) {
            return state.deleteAdminLoadStatus;
        },
        getResponse(state) {
            return state.response;
        }
    }
};