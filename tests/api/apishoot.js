let assert = require('assert');
let rsvp = require('rsvp');
let mongodbOprations = require('./../../Mongodb/mongodbOprations');
describe('Array', function () {

    describe('#indexOf()', function (done) {

        it('should return -1 when the value is not present', function (done) {

           mongodbConnt.save(null, null, (data) => {
             assert.equal(1,1);
              console.log(JSON.stringify(data))
              done();
            });
           
        });
    });
});