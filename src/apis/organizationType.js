/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config';

export default {
    index: function() {
        return CONFIG.LOCAL_DB.get('ORGANIZATION_TYPES');
    },

    update: function(
        _rev,
        types,
        _id = 'ORGANIZATION_TYPES'
    ) {
        return CONFIG.LOCAL_DB.put({
            _id,
            _rev,
            types
        });
    }
}