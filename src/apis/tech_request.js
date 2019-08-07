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
        return CONFIG.LOCAL_DB.query('tech_requests', {
            limit: limit,
            descending: descending,
            skip: skip,
            include_docs: include_docs
        });
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
            filter: function(doc) {
                return doc.type === 'tech_request'; // only index tech_request
            },
            limit: limit,
            skip: skip,
            include_docs: include_docs
        });
    },

    store: function(
        organization,
        num_desktops,
        num_laptops,
        received_before,
        usage,
        other_items,
        comments,
        status = "new",
        todos = [],
        notes = [],
        created_by = {},
        created_at = [],
        completed_at = [],
        type = 'tech_request'
    ) {
        return CONFIG.LOCAL_DB.post({
            type,
            organization,
            num_desktops,
            num_laptops,
            received_before,
            usage,
            other_items,
            comments,
            status,
            todos,
            notes,
            created_by,
            created_at,
            completed_at
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
        organization,
        num_desktops,
        num_laptops,
        received_before,
        usage,
        other_items,
        comments,
        status,
        todos,
        notes,
        created_by,
        created_at,
        completed_at,
        type
    ) {
        return CONFIG.LOCAL_DB.put({
            _id,
            _rev,
            type,
            organization,
            num_desktops,
            num_laptops,
            received_before,
            usage,
            other_items,
            comments,
            status,
            todos,
            notes,
            created_by,
            created_at,
            completed_at
        });
    },

    completeRequest(id, status, distribution, completed_by) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            let d = new Date();

            return CONFIG.LOCAL_DB.put({
                _id: doc._id,
                _rev: doc._rev,
                type: doc.type,
                product: doc.product,
                from_store: doc.from_store,
                to_store: doc.to_store,
                quantity: doc.quantity,
                status: status,
                notes: doc.notes,
                created_by: doc.created_by,
                created_at: doc.created_at,
                updated_at: doc.updated_at,
                updated_by: doc.updated_by,
                distribution: distribution,
                completed_at: [
                    d.getFullYear(),
                    d.getMonth(),
                    d.getDate(),
                    d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()
                ],
                completed_by: completed_by,
            });
        });
    },

    destroy: function(id) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            return CONFIG.LOCAL_DB.remove(doc);
        });
    }
}