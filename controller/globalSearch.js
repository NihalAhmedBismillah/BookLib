const globalSearch = require("../models/GlobalSearch");
const async = require('async');
const collAuthors = 'Authors';
const collBooks = 'Books';
const collReviews = 'Reviews';

/**
 * Desc : This method is use for find  data in collection postman
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.getGlobalSearchResult = (req, res) => {

    // TODO:make query

    const term = req.query;
    //TODO: we need to optimize query
    async.parallel([

        getAuthors = function (callback) {
            // create query to get author details;
            let query = {
                $or: [{ 'authorName': { $regex: ".*" + term.term + ".", $options: "i" } },
                { 'academics': { $regex: ".*" + term.term + ".", $options: "i" } }]
            };

            globalSearch.find(query, 'Authors', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        },
        getReviews = function (callback) {

            // create query to get author details;
            let query = {
                $or: [{ 'reviewerName': { $regex: ".*" + term.term + ".", $options: "i" } },
                { 'reviewTitle': { $regex: ".*" + term.term + ".", $options: "i" } }]
            };

            globalSearch.find(query, 'Reviews', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        },
        getBooks = function (callback) {
            // create query to get author details;
            let query = {
                $or: [{ 'bookName': { $regex: ".*" + term.term + ".", $options: "i" } },
                { 'title': { $regex: ".*" + term.term + ".", $options: "i" } },
                { 'description': { $regex: ".*" + term.term + ".", $options: "i" } }]
            };

            globalSearch.find(query, 'Books', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(err, result);
                }
            });
        }
    ],
        // optional callback
        function (err, results) {
            let searchResponse = [];
            res.send({ success: true, results: results });
        });

}


/**
 * Desc : This method is use for find  data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.getGlobalSearchAutoComplete = (req, res) => {

    // TODO:make query

    const term = req.query;

    //TODO: we need to optimize query as well as hard code matching by using config
    async.parallel({

        getAuthors: function (callback) {
            // create query to get author details;
            let query = { 'authorName': { $regex: ".*" + term.term + ".", $options: "i" } };

            globalSearch.find(query, 'Authors', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        },
        getReviews: function (callback) {

            // create query to get author details;
            let query = { 'reviewTitle': { $regex: ".*" + term.term + ".", $options: "i" } };

            globalSearch.find(query, 'Reviews', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        },
        getBooks: function (callback) {
            // create query to get author details;
            let query = { 'bookName': { $regex: ".*" + term.term + ".", $options: "i" } };

            globalSearch.find(query, 'Books', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(err, result);
                }
            });
        }
    },
        // optional callback
        function (err, results) {

            let searchResponse = [];
            (results.getAuthors && results.getAuthors.length > 0) ? searchResponse.push('Matched Author List        ') : '';
            results.getAuthors.forEach((x) => {
                searchResponse.push(x.authorName);
            });
            (results.getBooks && results.getBooks.length > 0) ? searchResponse.push('Matched Book List       ') : '';
            results.getBooks.forEach((x) => {
                searchResponse.push(x.bookName);
            });
            (results.getReviews && results.getReviews.length > 0) ? searchResponse.push('Matched Review Title List    ') : '';
            results.getReviews.forEach((x) => {
                searchResponse.push(x.reviewerName);
            });
            res.json(searchResponse)

        });

}
    //getAddressAutoComplete
module.exports.getAddressPostCodeSearchAutoComplete = (req, res) => {

    const term = req.query;
    //TODO: we need to optimize query as well as hard code matching by using config
    async.parallel({

        postCodes: function (callback) {
            let searchText  = term.term.replace(/[&\/\\^#,+()$~%.'":*?<>{}]/g, '')
            let query = { 'pincode_no': { $regex: ".*" + searchText } };
            globalSearch.find(query, 'PostCode', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    },
        // optional callback
        function (err, results) {

            let searchResponse = [];
            (results.postCodes && results.postCodes.length > 0) ? searchResponse.push('Matched Address List        ') : '';
            results.postCodes.forEach((x) => {
                searchResponse.push(x.village_locality_name + ',' + x.post_box_no + ','
                    + x.pincode_no + ',' +
                    x.sub_dist_name + ',' +
                    x.district_name);
            });

            res.json(searchResponse)

        });

}

module.exports.getAddressAutoComplete = (req, res) => {

    const term = req.query;
    //TODO: we need to optimize query as well as hard code matching by using config
    async.parallel({

        postCodes: function (callback) {
            let searchText  = term.term.replace(/[&\/\\^#,+()$~%.'":*?<>{}]/g, '')
            let query = { 'search_text': { $regex: ".*" + searchText+"." } };
            globalSearch.find(query, 'PostCode', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    },
        // optional callback
        function (err, results) {

            let searchResponse = [];
            (results.postCodes && results.postCodes.length > 0) ? searchResponse.push('Matched Address List        ') : '';
            results.postCodes.forEach((x) => {
                searchResponse.push(x.village_locality_name + ',' + x.post_box_no + ','
                    + x.pincode_no + ',' +
                    x.sub_dist_name + ',' +
                    x.district_name);
            });

            res.json(searchResponse)

        });

}



module.exports.getAddressWithQuery = (req, res) => {

    const queryObject = req.query;
    async.parallel({

        postCodes: function (callback) {
           
            globalSearch.executeSearchQuery(queryObject, 'PostCode', (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    },
        // optional callback
        function (err, results) {

            let searchResponse = [];
            (results.postCodes && results.postCodes.length > 0) ? searchResponse.push('Matched Address List        ') : '';
            results.postCodes.forEach((x) => {
                searchResponse.push(x.village_locality_name + ',' + x.post_box_no + ','
                    + x.pincode_no + ',' +
                    x.sub_dist_name + ',' +
                    x.district_name);
            });

            res.json(searchResponse)

        });

}

