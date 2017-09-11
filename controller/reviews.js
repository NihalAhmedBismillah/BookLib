const reviews = require("../models/Reviews");
const shortId = require('shortid');
const config = require('./../config/config.json');
const faker = require('Faker');
const async = require('async');

/**
 * Desc : This method is use for find all review data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.getAllReviews = (req, res) => {

    reviews.find({}, (err, result) => {
        if (err) {
            res.send({ success: false, message: err.message });
        } else {
            res.send({ success: true, result: result });
        }
    });
}

/**
 * Desc : This method is use for save review data in collection use by web client or mobile client.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */

exports.saveReview = (req, res) => {

    if (req.body) {

        let reviewObject = reviews.reviewsModel();
        reviewObject._id = shortId.generate();
        reviewObject.rating = req.body.rating;
        reviewObject.reviewDescription = req.body.reviewDescription;
        reviewObject.reviewerName = req.body.reviewerName;
        reviewObject.reviewTitle = req.body.reviewTitle;
        reviews.dbSave(reviewObject, (err, SaveResult) => {

            if (err) {
                res.send({ error: "Failed to save review " + JSON.stringify(err) });
            } else {
                res.send({ success: "Review Saved!", lastInserId: SaveResult._id });
            }
        });

    } else {
        res.send({ error: "Bad body parameter" + JSON.stringify(err) });
    }
}

/**
 * Desc : This method is use for save review data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.saveDummyReviews = (req, res) => {

    if (req.body) {

        let reviewObjectList = [];
        const count = req.body.no_of_reviews;
        // Create dummay object
        for (let i = 0; i < count; i++) {

            let reviewObject = reviews.reviewsModel();
            reviewObject._id = shortId.generate();
            reviewObject.rating = faker.random.number(5);;
            reviewObject.reviewDescription = faker.Lorem.paragraph();
            reviewObject.reviewerName = faker.Name.findName();
            reviewObject.reviewTitle = faker.Lorem.sentence();
            reviewObjectList.push(reviewObject);
        }
        // save data in to database..
        async.each(reviewObjectList, (item, callback) => {

            if (item) {

                reviews.dbSave(item, (err, SaveResult) => {
                    if (err) {
                        callback(err);
                    } else {
                        console.log('data saved!');
                        callback(null);
                    }
                });
            } else {
                callback(null);
            }

        }, function (err) {
            if (err) {
                console.log(err);
                res.send({ error: "Failed to save review " + JSON.stringify(err) });
            } else {
                res.send({ success: "Reviews Saved!" });
            }
        });

    } else {
        res.send({ error: "Bad body parameter" + JSON.stringify(err) });
    }
}
