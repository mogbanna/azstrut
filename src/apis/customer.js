/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config';

export default {
    index: function(
        limit,
        descending,
        skip,
        flag = null,
        include_docs = true
    ) {
        if(flag) {
            return CONFIG.LOCAL_DB.query(flag, {
                limit: limit,
                descending: descending,
                skip: skip,
                include_docs: include_docs
            });
        } else {
            return CONFIG.LOCAL_DB.query('customers', {
                limit: limit,
                descending: descending,
                skip: skip,
                include_docs: include_docs
            });
        }
    },

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
        phone_number,
        email,
        customer_type,
        address,
        account_info,
        website,
        created_by,
        created_at,
        updated_at,
        type = 'customer'
    ) {
        return CONFIG.LOCAL_DB.post({
            type,
            name,
            phone_number,
            email,
            customer_type,
            address,
            account_info,
            website,
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
        phone_number,
        email,
        customer_type,
        address,
        account_info,
        website,
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
            phone_number,
            email,
            customer_type,
            address,
            account_info,
            website,
            created_by,
            created_at,
            updated_at
        });
    },

    destroy: function(id) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            return CONFIG.LOCAL_DB.remove(doc);
        });
    }
}