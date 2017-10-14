const fs = require('fs');
const shortId = require('shortid');
const config = require('./../config/config.json');
const rsvp = require('rsvp');
const CHUNK_SIZE = 10 * 512; // 52KB
let buffer = new Buffer(CHUNK_SIZE);
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://test323!@:test43@#$@ds147884.mlab.com:47884/booklab",  (err, db) => {
//MongoClient.connect(config['dbConnectionUrl'] + config['dbName'], (err, db) => {
  
    function saveData(data) {

        return new rsvp.Promise((res, rej) => {
            
            let collection = db.collection('PostCode');
            var batch = collection.initializeUnorderedBulkOp({ useLegacyOps: true });
            data.forEach((doc) => {
                batch.insert(doc);
            })
            batch.execute(function (err, result) {
                if (err) throw err;
                res()
            })//;
        })
    }
    fs.open('postcode/postcode.csv', 'r', (err, fd) => {
        if (err) throw err;
        function readNextChunk() {
            fs.read(fd, buffer, 0, CHUNK_SIZE, null, (err, nread) => {
                if (err) throw err;

                if (nread === 0) {
                    console.log('stop !')
                    fs.close(fd, (err) => {
                        if (err) throw err;
                    });
                    process.exit(0);
                    //preturn;
                }

                let data;
                if (nread < CHUNK_SIZE)
                    data = buffer.slice(0, nread);
                else {
                    data = buffer;
                    let lines = data.toString('utf-8').split("\n");
                    let insertData = [];
                    lines.forEach((iteam) => {
                        let csvrow = iteam.split(',');
                        let coll = {
                            _id: shortId.generate(),
                            village_locality_name: csvrow[7],
                            post_box_no: csvrow[0],
                            pincode_no: csvrow[1],
                            sub_dist_name: csvrow[4],
                            district_name: csvrow[8],
                            state_name: csvrow[9],
                            search_text: csvrow[0] + '' + csvrow[1] + csvrow[4] + csvrow[8] + csvrow[9] + csvrow[7]
                        }
                        insertData.push(coll);
                    });
                    saveData(insertData).then(() => {
                        console.log('bulk data inserted !');
                        readNextChunk();
                    })
                }
            });
        }
        readNextChunk();
    });
})
