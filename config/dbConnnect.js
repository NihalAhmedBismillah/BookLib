
const config = require('./config.json');
const MongoClient = require('mongodb').MongoClient;
// connect with mongoClient
MongoClient.connect(config['dbConnectionUrl'] + config['dbName'],  (err, db) => {

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
  