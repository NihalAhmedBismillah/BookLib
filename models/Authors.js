
const dbOpration = require('../Mongodb/mongodbOprations');
const collNm = 'Authors';

// create author model.
module.exports.authorsModel = function authorsModel()  {

    let author = {
        _id: '',
        authorName: '',
        authorBio: '',
        profilePicUrl: '',
        academics: '',
        awards: ''
    };
    return author;
};

/**
 * Desc : This method is use for save data in collection.
 * @param : Passing object model for json object type
 * @param : Passing callback function type function    
 */
module.exports.dbSave =  (authorsModel, callback)=> {

    dbOpration.save(authorsModel, collNm, (err, result) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }

    });

}

/**
 * Desc : This method is use for find data in collection.
 * @param : Passing query for json object type
 * @param : Passing callback function type function    
 */
module.exports.find =  (query, callback)=> {

    dbOpration.find(query, collNm, (err, result) => {

        callback(null, result);
    });

}

/**
 * Desc : This method is use for find one data in collection.
 * @param : Passing query for json object type
 * @param : Passing callback function type function    
 */
module.exports.findOne =  (query, callback)=> {

    dbOpration.findOne(query, collNm, (err, result) => {
        
        callback(null, result);
    });
}
