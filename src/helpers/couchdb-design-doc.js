//create map functions
function createDesignDoc(name, mapFunction = null, valUpdateDocFunc = null) {
    var ddoc = {
        _id: '_design/' + name,
        views: {}
    };

    if(mapFunction) {
        ddoc.views[name] = { map: mapFunction.toString() };
    }

    if(valUpdateDocFunc) {
        ddoc.validate_update_doc = valUpdateDocFunc.toString();
    }

    return ddoc;
}

//config document
var configDoc = {
    _id: 'site-config',
    site_title: '',
    about: '',
    links: {
        twitter: '',
        facebook: '',
        instagram: '',
        linkedin: ''
    },
    updated_at: []
}

export const DESIGN_DOCS = {
    save: function() {

        //this is for the _user database
        createDesignDoc('allUsers', function(doc) {
            if(doc.type == 'user') {
                emit(doc.fullname);
            }
        });

        createDesignDoc('reflections', function(doc) {
            if(doc.type == 'reflection') {
                emit([doc.created_at, doc.scribble_id], doc);
            }
        });

        createDesignDoc('crafts', function(doc) {
            if(doc.type == 'craft') {
                emit(doc.created_at, doc);
            }
        });

        createDesignDoc('scribbles', function(doc) {
            if(doc.type == 'scribble') {
                emit(doc.created_at, doc);
            }
        });

        createDesignDoc('crudval', null, function(newDoc, oldDoc, userCtx) {
            function unchanged(field) {
                if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field]))
                    throw({forbidden : 'Field cant be changed: ' + field});
            }

            function require(field, message) {
                message = message || 'Document must have a ' + field;
                if (!newDoc[field]) throw({forbidden : message});
            }

            function maxLength(field, length) {
                message = field + ' cant be more than ' + length + 'chars';
                if(newDoc[field].length > length) throw({forbidden: message});
            }

            function checkArray(field) {
                message = field + ' is of wrong format';
                if(!newDoc[field].isArray()) throw({forbidden: message});
            }

            //make sure required fields are supplied
            if(newDoc.type == 'session') {
                require('store');
                require('created_by');
                require('opening_date');
                require('closing_date');
                require('sales');

                checkArray('created_by');
                checkArray('opening_date');
                checkArray('closing_date');
                checkArray('sales');
            }
            
            /**
             * for every doc with author field,
             * make sure the same author is making edits
             */
            /*if(newDoc.author) {
                enforce(newDoc.author == userCtx.name,
                    'You may only update documents with author ' + userCtx.name);
            }*/

            unchanged('created_at');
            unchanged('opening_date');
        });
    }
}