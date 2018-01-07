const fs = require('fs');
const parse = require('csv-parse');
let shortId = require('shortid');
let async = require('async');
let rsvp = require('rsvp');
require('../config/dbConnnect').connectDb(() => {

    let count = 0;
    let collection = global['db'].collection('PostCodeSearch');

    function saveData(data, callback) {
        collection.save(data, { w: 1 }, (error, resultData) => {
            if (!error) {
                console.log(count);
                count++;
                callback(undefined, 'Row Inserted!');
            } else {
                callback(error, undefined);
            }

        });
    }


    let insertData1 = [];
    let insertData2 = [];
    let insertData3 = [];

    let readcount = 0;
    fs.createReadStream('./postcode.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', (csvrow) => {
            console.log('reading count ' + readcount);
            //readcount++;
            let coll = {
                _id: shortId.generate(),
                village_locality_name: csvrow[0],
                post_box_no: csvrow[1],
                pincode_no: csvrow[2],
                sub_dist_name: csvrow[3],
                district_name: csvrow[4],
                state_name: csvrow[5],
                search_text: csvrow[0] + '' + csvrow[1] + csvrow[2] + csvrow[3] + csvrow[4] + csvrow[5]
            }
            if (readcount >= 0 && readcount <= 50000) {
                insertData1.push(coll);
            } else if (readcount > 50001 && readcount <= 100000) {
                insertData2.push(coll);
            } else if (readcount > 100001 && readcount <= 155050) {
                insertData3.push(coll);
            }
            readcount++;

        })
        .on('end', () => {

            // console.log(`data 1 ${insertData1.length} \n`);
            // console.log(`data 2 ${insertData2.length} \n`);
            // console.log(`data 3 ${insertData3.length} \n`);
            // console.log('reading data end!');
            async.waterfall([

                (callback) => {

                    async.eachLimit(insertData1, 5, (item, callback) => {
                        saveData(item, (error, result) => {
                            if (!error)
                                callback(undefined);
                            else
                                callback(error);
                        });
                    }, (error, finalResult) => {

                        (!error) ? callback(undefined, 'data Inserted!') : callback(error, undefined);

                    });
                },
                (data, callback) => {
                    async.eachLimit(insertData2, 5, (item, callback) => {
                        saveData(item, (error, result) => {
                            if (!error)
                                callback(undefined);
                            else
                                callback(error);
                        });
                    }, (error, finalResult) => {

                        (!error) ? callback(undefined, 'data Inserted!') : callback(error, undefined);

                    });
                },
                (data, callback) => {
                    async.eachLimit(insertData3, 5, (item, callback) => {
                        saveData(item, (error, result) => {
                            if (!error)
                                callback(undefined);
                            else
                                callback(error);
                        });
                    }, (error, finalResult) => {

                        (!error) ? callback(undefined, 'data Inserted!') : callback(error, undefined);

                    });
                }
            ],
                (error, finalResult) => {
                    console.log('data save successfully!');
                    process.exit(0);
                })

        });
})

