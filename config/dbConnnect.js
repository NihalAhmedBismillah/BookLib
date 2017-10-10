
const config = require('./config.json');
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://test321:test323@ds14666884.mlab.com:47884/booklab",  (err, db) => {

      if (err) {
        console.log('Database connection error occur!', JSON.stringify(err));  
        throw new (Error(err));
      }
      else {
        console.log('Database connection ok!');
        // assign db in to global object
        global['db'] = db;
     
      }
    });



