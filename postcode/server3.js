const fs = require('fs');
const parse = require('csv-parse');

let shortId = require('shortid');
let async = require('async');
let rsvp = require('rsvp');
require('../config/dbConnnect').connectDb(() => {

    let count = 0;
    let collection = global['db'].collection('PostCode1');

    function saveData(data, callback) {
        collection.save(data, { w: 1 }, (_err, resultData) => {
            console.log(count);
            count++;
            callback();
        });
    }


    let insertData1 = [];
    let insertData2 = [];
    let insertData3 = [];
    
    let readcount = 0;
    fs.createReadStream('./postcode/postcode.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', (csvrow) => {
            console.log('reading count ' + readcount);
            readcount++;
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
            if(readcount<= 50000){
                insertData1.push(coll);
            }else if(readcount>500001 && readcount<=100000){
                insertData2.push(coll);
            }else if(readcount>100001 && readcount<=155050){
                insertData3.push(coll);
            }
            
        })
        .on('end', () => {

            console.log('reading data end!');
            //console.log()
            async.eachLimit(insertData1, 5, (item, callback) => {
                saveData(item, () => {
                    callback();
                });
            }, (error, finalResult) => {
                console.log('data save successfully!');
            })
        });
})

