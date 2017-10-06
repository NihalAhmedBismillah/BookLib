const authors = require("../models/Authors");
const shortId = require('shortid');
const config = require('./../config/config.json');
const faker = require('Faker');
const async = require('async');

/**
 * Desc : This method is use for find all author data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.getAllAuthors = (req, res) => {

	authors.find({}, (err, result) => {
		if (err) {
			res.send({ success: false, message: err.message });
		} else {
			res.send({ success: true, result: result });
		}
	});
}

/**
 * Desc : This method is use for save author data in collection use by postman.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */

exports.saveAuthor = (req, res) => {

	if (req.body) {

		let authObject = authors.authorsModel();
		authObject._id = shortId.generate();
		authObject.academics = req.body.academics;
		authObject.authorBio = req.body.authorBio;
		authObject.authorName = req.body.authorName;
		authObject.awards = req.body.awards;
		authObject.profilePicUrl = req.body.profilePicUrl;
		authors.dbSave(authObject, (err, SaveResult) => {

			if (err) {
				res.send({ error: "Failed to save author " + JSON.stringify(err) });
			} else {
				res.send({ success: "Auther Saved!", lastInserId: SaveResult._id });
			}
		});

	} else {
		res.send({ error: "Bad body parameter" + JSON.stringify(err) });
	}
}

/**
 * Desc : This method is use for save author data in collection.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.saveDummyAuthors = (req, res) => {

	if (req.body) {

		let authObjectList = [];
	//	const count = req.body.no_of_authors;
		const count = 10;
		// Create dummay object
		for (let i = 0; i < count; i++) {

			let authObject = authors.authorsModel();
			authObject._id = shortId.generate();
			authObject.academics = faker.Lorem.sentence();
			authObject.authorBio = faker.Lorem.words()[0];
			authObject.authorName = faker.Name.findName();
			authObject.awards = faker.random.number(1000);
			authObject.profilePicUrl = faker.Image.imageUrl();
			authObjectList.push(authObject);
		}
		// save data in to database..
		async.each(authObjectList, (item, callback) => {
			
			if (item) {

				authors.dbSave(item, (err, SaveResult) => {
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
				res.send({ error: "Failed to save author " + JSON.stringify(err) });
			} else {
				res.send({ success: "Auther Saved!" });
			}
		});

	} else {
		res.send({ error: "Bad body parameter" + JSON.stringify(err) });
	}
}

/**
 * Desc : This method is use for home page.
 * @param : Passing req for object type
 * @param : Passing res for object type    
 */
exports.index = (req, res) => {

	res.render('index.html');
}