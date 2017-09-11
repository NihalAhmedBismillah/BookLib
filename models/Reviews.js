
const dbOpration = require('../Mongodb/mongodbOprations');
const collNm = 'Reviews';

// create review model.
module.exports.reviewsModel = function reviewsModel() {

    let review = {

        _id: '',
        reviewerName: '',
        rating: '',
        reviewTitle: '',
        reviewDescription: ''
    };
    return review;
};

/**
 * Desc : This method is use for save data in collection.
 * @param : Passing object model for json object type
 * @param : Passing callback function type function    
 */
module.exports.dbSave = (reviewModel, callback) => {

    dbOpration.save(reviewModel, collNm, (err, result) => {

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
module.exports.find = (query, callback) => {

    dbOpration.find(query, collNm, (err, result) => {

        callback(null, result);
    });

}

/**
 * Desc : This method is use for find one data in collection.
 * @param : Passing query for json object type
 * @param : Passing callback function type function    
 */
module.exports.findOne = (query, callback) => {

    dbOpration.findOne(query, collNm, (err, result) => {

        callback(null, result);
    });
}
