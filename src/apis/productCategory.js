/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config';

export default {
    index: function() {
        return CONFIG.LOCAL_DB.get('PRODUCT_CATEGORIES');
    },

    update: function(
        _rev,
        categories,
        _id = 'PRODUCT_CATEGORIES'
    ) {
        return CONFIG.LOCAL_DB.put({
            _id,
            _rev,
            categories
        });
    }
}