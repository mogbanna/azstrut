/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config';
import pwd from 'couch-pwd';
import sha1 from '../helpers/sha1';
import bcrypt from 'bcryptjs';

export default {
    index: function(
        limit,
        descending,
        skip
    ) {
        return CONFIG.LOCAL_USER_DB.query('allUsers', {
            limit: limit,
            descending: descending,
            skip: skip
        });
    },

    search: function(
        query,
        fields,
        limit,
        skip,
        include_docs = true
    ) {
        return CONFIG.LOCAL_USER_DB.search({
            query: query,
            fields: fields,
            filter: function(doc) {
                return doc.type === 'user'; // only index persons
            },
            limit: limit,
            skip: skip,
            include_docs: include_docs
        });
    },

    store: function(username, password, opts) {
        // return CONFIG.REMOTE_DB.signUp(username, password, {
        //     metadata: opts.metadata,
        //     roles: opts.roles
        // });
        // console.log(opts);
        var salt = bcrypt.genSaltSync(10);

        return CONFIG.LOCAL_USER_DB.get("org.couchdb.user:" + username).then(function(doc) {
            return new Promise((resolve, reject) => {
                reject({
                    docId: "org.couchdb.user:" + username,
                    error: true,
                    message: "username already exists",
                    name: "found",
                    reason: "duplication",
                    status: 503
                });
            })
        }).catch((response) => {
            return CONFIG.LOCAL_USER_DB.put({
                _id: "org.couchdb.user:" + username,
                name: username,
                roles: opts.roles,
                type: "user",
                first_name: opts.metadata.first_name,
                last_name: opts.metadata.last_name,
                email: opts.metadata.email,
                created_at: opts.metadata.created_at,
                updated_at: opts.metadata.updated_at,
                password_scheme: "simple",
                salt: salt,
                password_sha: sha1.hex_sha1(password + salt)
            });
        });
    },

    login: function(username, password) {

        if (!navigator.onLine) {
            return new Promise((resolve, reject) => {
                let error_msg = null;

                CONFIG.LOCAL_USER_DB.get("org.couchdb.user:" + username).then((user) => {
                    let success = false;

                    switch (user.password_scheme) {
                        /**
                         * (deprecated) for cloudant support
                         */
                        case "simple":
                            if (user.password_sha == sha1.hex_sha1(password + user.salt)) {
                                success = true;
                            } else {
                                error_msg = "username or password does not match"
                            }
                            break;

                            /**
                             * (recommended)
                             */
                        case "pbkdf2":
                            pwd.hash(password, user.salt, function(err, hash) {
                                if (user.hash === hash) {
                                    success = true;
                                } else {
                                    error_msg = "username or password does not match"
                                }
                            })
                            break;

                        default:
                            break;
                    }

                    if (success) {
                        resolve({
                            "ok": true,
                            "name": username,
                            "roles": user.roles
                        });
                    } else {
                        reject({
                            "ok": false,
                            "name": null,
                            "roles": [],
                            "error_msg": error_msg
                        });
                    }
                }).catch(function(response) {
                    error_msg = response;
                });
            });
        }

        return CONFIG.REMOTE_DB.logIn(username, password);
    },

    getSession: function() {
        return CONFIG.REMOTE_DB.getSession();
    },

    logout: function() {
        if (!navigator.onLine) {

        }

        return CONFIG.REMOTE_DB.logOut();
    },

    show: function(username) {
        //return CONFIG.REMOTE_DB.getUser(username);
        return CONFIG.LOCAL_USER_DB.get("org.couchdb.user:" + username);
    },

    update: function(username, opts) {
        /*return CONFIG.REMOTE_DB.putUser(username, {
            metadata: opts.metadata, 
            roles: opts.roles
        });*/
        return CONFIG.LOCAL_USER_DB.get("org.couchdb.user:" + username).then(function(doc) {
            return CONFIG.LOCAL_USER_DB.put({
                _id: doc._id,
                _rev: doc._rev,
                name: doc.name,
                roles: opts.roles,
                type: doc.type,
                first_name: opts.metadata.first_name,
                last_name: opts.metadata.last_name,
                email: opts.metadata.email,
                created_at: opts.metadata.created_at,
                updated_at: opts.metadata.updated_at,
                password_scheme: doc.password_scheme,
                salt: doc.salt,
                password_sha: doc.password_sha
            });
        });
    },

    changePassword: function(username, password) {
        return CONFIG.REMOTE_DB.changePassword(username, password);
    },

    destroy: function(username) {
        //return CONFIG.REMOTE_DB.deleteUser(username);
        return CONFIG.LOCAL_USER_DB.get("org.couchdb.user:" + username).then(function(doc) {
            return CONFIG.LOCAL_USER_DB.remove(doc);
        });
    },

    signUpAdmin: function(username, password, opts) {
        return CONFIG.REMOTE_DB.signUpAdmin(username, password, {
            metadata: opts.metadata,
            roles: opts.roles
        });
    },

    deleteAdmin: function(username) {
        return CONFIG.REMOTE_DB.deleteAdmin(username);
    }
};