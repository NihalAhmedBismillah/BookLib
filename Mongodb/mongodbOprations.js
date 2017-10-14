require('../config/dbConnnect');
const config = require('./../config/config.json');
/**
 * Desc : This method is use for save data in collection.
 * @param : Passing object module for json object type
 * @param : Passing collection name for type string
 * @param : Passing callback function type function    
 */

module.exports.save = (modelNm, collNm, cb) => {

    try {
        if (modelNm && collNm) {

            let db = global['db'];

            let collection = db.collection(collNm);

            collection.save(modelNm, (err, result) => {

                if (err) {
                    cb(err, null);
                } else {
                    cb(null, result.result.upserted[0]);
                }
            });
        } else {

            cb('Invalid parameter', null);
        }
    } catch (err) {
        cb(err, null);
    }

}

/**
 * Desc: This method is use to find array of documents 
 * @param : Passing query for type string
 * @param : Send collection name for type string
 * @param : callback function for type function
 */
module.exports.find = (query, collNm, cb) => {

    try {

        if (query && collNm) {
            let db = global['db'];
            let collection = db.collection(collNm);
            collection.find(query).toArray((err, result) => {

                if (!err) {
                    cb(null, result);
                } else {
                    cb(err, null);
                }
            });
        } else {
            cb('Invalid parameter', null);
        }
    } catch (err) {
        cb(err, null);
    }
}

/**
 * Desc : This method use to find one document 
 * @param : qeury send as object or any type 
 * @param : Collection name type string
 * @param :Cb type function
 */
module.exports.findOne = (query, collNm, cb) => {
    try {
        if (query && collNm) {
            let db = global['db'];
            let collection = db.collection(collNm);
            collection.findOne(query, (err, result) => {
                if (!err) {
                    cb(null, result);
                } else {
                    cb(err, null);
                }
            });
        } else {
            cb('Invalid parameter', null);
        }
    } catch (err) {
        cb(err, null);
    }
}

/**
 * Desc : This method use to find document on the basic for query 
 * @param : qeury send as object or any type 
 * @param : Collection name type string
 * @param :Cb type function
 */
module.exports.executeQuery = (query, collNm, cb) => {

    try {

        if (query && collNm) {
            let db = global['db'];
            let collection = db.collection(collNm);
            // TODO: here doing limit 100 it should be come from config json..
            collection.find(query).sort({ '_id': -1 }).limit(100).toArray((err, result) => {
                if (!err) {
                    cb(null, result);
                } else {
                    cb(err, null);
                }
            });
        } else {
            cb('Invalid parameter', null);
        }
    } catch (err) {
        cb(err, null);
    }
}


/**
 * Desc : This method use to find document on the basic for query 
 * @param : qeury send as object or any type 
 * @param : Collection name type string
 * @param :Cb type function
 */
module.exports.executeSearchQuery = (queryobj, collNm, cb) => {

    try {

        if (queryobj && queryobj.term && collNm) {
            let searchDefaultPara = config.postcodeDefaultSetting;
            let db = global['db'];
            let searchText = queryobj.term.replace(/[&\/\\^#,+()$~%.'":*?<>{}]/g, '');
            let searchField = (queryobj && queryobj.filters) ? queryobj.filters.split(',') : searchDefaultPara.filters;
            let query;
            if (!Array.isArray(searchField)) {
                query = { [searchField]: { $regex: ".*" + searchText + "." } };
            } else {
                let queryArray = [];
                searchField.forEach((field) => {
                    let qa = { [field]: { $regex: ".*" + searchText + ".", $options: "i" } }
                    queryArray.push(qa);
                });
                query = { $or: queryArray };
            }
            let collection = db.collection(collNm);
            let limit = parseInt((queryobj && queryobj.limit) ? queryobj.limit : searchDefaultPara.limit);
            limit = (limit <= parseInt(searchDefaultPara.limit)) ? limit : parseInt(searchDefaultPara.limit);
            const sort = (queryobj && queryobj.sort) ? queryobj.sort : searchDefaultPara.sort;
            collection.find(query).sort({ sort: -1 }).limit(limit).toArray((err, result) => {
                if (!err) {
                    cb(null, result);
                } else {
                    cb(err, null);
                }
            });
        } else {
            cb('Invalid parameter', null);
        }
    } catch (err) {
        cb(err, null);
    }
}


