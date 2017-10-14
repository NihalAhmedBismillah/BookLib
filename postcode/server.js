const fs = require('fs');
const parse = require('csv-parse');

let shortId = require('shortid');
let async = require('async');
let rsvp = require('rsvp');
require('../config/dbConnnect').connectDb(() => {

    let count = 0;
    function saveData(data) {

        return new rsvp.Promise((res, rej) => {
            let collection = global['db'].collection('PostCode');
            collection.save(data, { w: 1 }, (_err, resultData) => {

                console.log(count);
                count++;
                res();
            })
        })
    }

    let promises = [];
    let readcount  = 0;
    fs.createReadStream('postcode.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', (csvrow) => {
            console.log('reading count '+readcount);
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
            promises.push(saveData(coll));
        })
        .on('end', () => {
            console.log('reading data end!')
            Promise.all((promises) => {
                console.log('data save successfully!')
            });
        });
})

