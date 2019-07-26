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
        return CONFIG.LOCAL_DB.query('products', {
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
                return doc.type === 'product'; // only index persons
            },
            limit: limit,
            skip: skip,
            include_docs: include_docs
        });
    },

    store: function(
        name,
        description,
        store,
        barcode,
        category,
        manufacturer,
        can_be,
        unit,
        cost_price,
        selling_price,
        promo_price,
        is_promo_active,
        tax,
        reorder_level,
        quantity_in_store,
        _attachments,
        created_by,
        created_at,
        updated_at,
        type = 'product'
    ) {
        return CONFIG.LOCAL_DB.post({
            type,
            name,
            description,
            store,
            barcode,
            category,
            manufacturer,
            can_be,
            unit,
            cost_price,
            selling_price,
            promo_price,
            is_promo_active,
            tax,
            reorder_level,
            quantity_in_store,
            _attachments,
            created_by,
            created_at,
            updated_at
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
        description,
        store,
        barcode,
        category,
        manufacturer,
        can_be,
        unit,
        supplier,
        cost_price,
        selling_price,
        promo_price,
        is_promo_active,
        tax,
        reorder_level,
        quantity_in_store,
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
            description,
            store,
            barcode,
            category,
            manufacturer,
            can_be,
            unit,
            supplier,
            cost_price,
            selling_price,
            promo_price,
            is_promo_active,
            tax,
            reorder_level,
            quantity_in_store,
            _attachments,
            created_by,
            created_at,
            updated_at
        });
    },

    increaseQuantity(id, val) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            doc.quantity_in_store = parseFloat(doc.quantity_in_store) + parseFloat(val);

            return CONFIG.LOCAL_DB.put(doc);
        });
    },

    decreaseQuantity(id, val) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            doc.quantity_in_store = parseFloat(doc.quantity_in_store) - parseFloat(val);

            return CONFIG.LOCAL_DB.put(doc);
        });
    },

    destroy: function(id) {
        return CONFIG.LOCAL_DB.get(id).then(function(doc) {
            return CONFIG.LOCAL_DB.remove(doc);
        });
    }
}