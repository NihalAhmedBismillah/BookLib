const books = require("../models/Books");
const shortId = require('shortid');
const config = require('./../config/config.json');
const faker = require('Faker');
let async = require('async');

/**
 * Desc : This method is use for find all book data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.getAllBooks = (req, res) => {

    books.find({}, (err, result) => {
        if (err) {
            res.send({ success: false, message: err.message });
        } else {
            res.send({ success: true, result: result });
        }
    });
}

/**
 * Desc : This method is use for save book data in collection use by postman.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */

exports.saveBook = (req, res) => {

    if (req.body) {

        let bookObject = books.booksModel();
        bookObject._id = shortId.generate();
        bookObject.bookChapterIndex = req.body.bookChapterIndex;
        bookObject.bookName = req.body.bookName;
        bookObject.dateOfPublish = req.body.bookName;
        bookObject.description = req.body.description;
        bookObject.title = req.body.title;
        bookObject.genre = req.body.genre;
        books.dbSave(bookObject, (err, SaveResult) => {

            if (err) {
                res.send({ error: "Failed to save book " + JSON.stringify(err) });
            } else {
                res.send({ success: "Books Saved!", lastInserId: SaveResult._id });
            }
        });

    } else {
        res.send({ error: "Bad body parameter" + JSON.stringify(err) });
    }
}

/**
 * Desc : This method is use for save book data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.saveDummyBooks = (req, res) => {

    if (req.body) {

        let bookObjectList = [];
        //const count = req.body.no_of_book;
        const count = 10;
        // Create dummay object
        for (let i = 0; i < count; i++) {

            let bookObject = books.booksModel();
            bookObject._id = shortId.generate();
            bookObject.bookChapterIndex = faker.random.number(1000);
            bookObject.bookName = faker.Lorem.words()[0];
            bookObject.dateOfPublish = faker.Date.recent(20);
            bookObject.description = faker.Lorem.sentence();
            bookObject.title = faker.Lorem.words()[0]; // short description
            let genres  = [];
            let genre = {
                name : faker.Lorem.words()[0],
                url : faker.Image.imageUrl(),
            }
            genres.push(genre);
            bookObject.genre = genres;
            bookObjectList.push(bookObject);
        }
        // save data in to database..
        async.each(bookObjectList, (item, callback) => {

            if (item) {

                books.dbSave(item, (err, SaveResult) => {
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
                res.send({ error: "Failed to save book " + JSON.stringify(err) });
            } else {
                res.send({ success: "Books Saved!" });
            }
        });

    } else {
        res.send({ error: "Bad body parameter" + JSON.stringify(err) });
    }
}
