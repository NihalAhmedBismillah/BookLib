
const assert = require('assert');
const rsvp = require('rsvp');
const request = require('request');
const config = require('./../../config/config.json');
let jwttoken;
describe('test API for Search ', () => {

    before((done) => {
        // runs before all tests in this block
        return request.post(`${config.baseUrl}generatejwt`,
            { form: { userName: 'test user', password: 'test password' } }, (error, response, body) => {

                let parseJwtToken = JSON.parse(body)
                jwttoken = parseJwtToken.token;
                done();
            });
    });

    describe('Test api search', (done) => {

        it('should return -some matching results =====================>globalsearchtext auther', (done) => {

            let options = {
                url: `${config.baseUrl}api/v1/globalsearchtext/?term=bea`,
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': jwttoken
                }
            };
            request.get(options, (error, response, body) => {
                assert.notEqual(body, null)
                done();
            })
        });

        it('should return -some matching results=========================>getauthors', (done) => {

            let options = {
                url: `${config.baseUrl}api/v1/getauthors`,
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': jwttoken
                }
            };
            request.get(options, (error, response, body) => {
                assert.notEqual(body, null)
                done();
            })
        });
        it('should return -some matching results=========================>createdummyauthors', (done) => {

            let postData = {
                no_of_reviews: '1'
            }
            let url = `${config.baseUrl}api/v1/createdummyauthors`
            let options = {
                method: 'POST',
                body: postData,
                json: true,
                url: url,
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': jwttoken
                }
            }
            request(options, function (err, response, body) {
                if (!err) {
                    assert.notEqual(response.body, null)
                    done();
                }
            });
        });
    });
});