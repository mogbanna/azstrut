/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config';

export default {
    index: function(
        limit,
        descending,
        skip,
        include_docs = true
    ) {
        return CONFIG.LOCAL_DB.query('organizations', {
            limit: limit,
            descending: descending,
            skip: skip,
            include_docs: include_docs
        });

    },

    // getOrganizationRequests: function(
    //     ein,
    //     limit = 1000000,
    //     descending = false,
    //     skip = 0,
    //     include_docs = true
    // ) {
    //     return CONFIG.LOCAL_DB.query('tech-requests', {
    //         limit,
    //         descending,
    //         skip,
    //         include_docs,
    //         filter: function(doc) {
    //             return doc.organization.ein === ein; // only get requests matching the given ein
    //         },
    //     });
    // },
    search: function(
        query,
        fields,
        limit,
        skip,
        include_docs = true
    ) {
        return CONFIG.LOCAL_DB.search({
            query: query,
            fields: fields,
            limit: limit,
            skip: skip,
            include_docs: include_docs
        });
    },

    store: function(
        name,
        legal_organization,
        primary_contact,
        secondary_contact,
        organization_type,
        website,
        social_media,
        ein,
        acc_file,
        requests,
        camps,
        notes,
        thumbnail_name,
        _attachments,
        created_by,
        created_at,
        updated_at,
        type = 'organization'
    ) {
        return CONFIG.LOCAL_DB.post({
            type,
            name,
            legal_organization,
            primary_contact,
            secondary_contact,
            organization_type,
            website,
            social_media,
            ein,
            acc_file,
            requests,
            camps,
            notes,
            thumbnail_name,
            _attachments,
            created_by,
            created_at,
            updated_at,
        });
    },

    show: function(
        id
    ) {
        return CONFIG.LOCAL_DB.get(id);
    },

    update: function(
        _id,
        _rev,
        name,
        legal_organization,
        primary_contact,
        secondary_contact,
        organization_type,
        website,
        social_media,
        ein,
        acc_file,
        requests,
        camps,
        notes,
        thumbnail_name,
        _attachments,
        created_by,
        created_at,
        updated_at,
        type
    ) {
        return CONFIG.LOCAL_DB.put({
            _id,
            _rev,
            type,
            name,
            legal_organization,
            primary_contact,
            secondary_contact,
            organization_type,
            website,
            social_media,
            ein,
            acc_file,
            requests,
            camps,
            notes,
            thumbnail_name,
            _attachments,
            created_by,
            created_at,
            updated_at,
        });
    },
    // increaseRequests(id, val, type) {
    //     return CONFIG.LOCAL_DB.get(id).then(function(doc) {
    //         doc.quantity_in_store = parseFloat(doc.quantity_in_store) + parseFloat(val);

    //         return CONFIG.LOCAL_DB.put(doc);
    //     });
    // },

    // decreaseRequests(id, val, type) {
    //     return CONFIG.LOCAL_DB.get(id).then(function(doc) {
    //         doc.quantity_in_store = parseFloat(doc.quantity_in_store) - parseFloat(val);

    //         return CONFIG.LOCAL_DB.put(doc);
    //     });
    // },


    destroy: function(id) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            return CONFIG.LOCAL_DB.remove(doc);
        });
    }
}