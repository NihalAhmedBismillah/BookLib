
const assert = require('assert');
const rsvp = require('rsvp');
const request  = require('request');
//import { request } from 'request';
describe('test API for Search ', () => {

    describe('Test api search', (done) => {

        it('should return -some matching results', (done) => {

            request.post('http://localhost:5000/generatejwt',{form:{userName:'test user',password:'test password'}}, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                done();
            });
        });
    });
});