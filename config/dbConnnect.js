
const config = require('./config.json');
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config['dbConnectionUrl'] + config['dbName'], (err, db) => {
//MongoClient.connect("mongodb://test:test@ds147884.mlab.com:47884/booklab",  (err, db) => {

  if (err) {
    console.log('Database connection error occur!', JSON.stringify(err));
    throw new (Error(err));
  }
  else {
    console.log('Database connection ok!');
        global['db'] = db;
  }
});
// module.exports.connectDb = (cb) => {

//   if (global['db'] === undefined) {

//     MongoClient.connect(config['dbConnectionUrl'] + config['dbName'], (err, db) => {
//       //MongoClient.connect("mongodb://test:test@ds147884.mlab.com:47884/booklab",  (err, db) => {

//       if (err) {
//         console.log('Database connection error occur!', JSON.stringify(err));
//         throw new (Error(err));
//       }
//       else {
//         console.log('Database connection ok!');
//         // assign db in to global object
//         global['db'] = db;
//         cb(true);

//       }
//     });
//   } else {
//     cb(true)
//   }
// }

