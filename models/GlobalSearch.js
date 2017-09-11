
const dbOpration = require('../Mongodb/mongodbOprations');

/**
 * Desc : This method is use for find data in collection.
 * @param : Passing query for json object type
 * @param : Passing callback function type function    
 */
module.exports.find = (query,collNm, callback) => {

    dbOpration.executeQuery(query, collNm, (err, result) => {
        
        callback(null, result);
    });

}
