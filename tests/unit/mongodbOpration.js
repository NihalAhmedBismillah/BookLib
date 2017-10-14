let assert = require('assert');
let rsvp = require('rsvp');
let mongodbOprations = require('./../../Mongodb/mongodbOprations');
describe('mongodbOprations',  ()=> {

    //console.log(rsvp)
    describe('#save method',  (done)=> {

        it('should return Invalid parameter when the value is not passing ', function (done) {

            mongodbOprations.save(null, null, (data) => {

                assert.equal(data, 'Invalid parameter');

                done();
            });
        });
        it('should complete this test', (done) => {

            return new rsvp.Promise((resolve, reject) => {
                assert.ok(true);
                resolve();
            }).then(()=>{
                done();
            })
                
        });
    });

});


