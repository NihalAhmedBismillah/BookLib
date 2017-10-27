const assert = require('assert');
const rsvp = require('rsvp');
const basicTest = require('./../basicTest');
const basicTestWithPromise = require('./../basicTestWithPromise');


describe('math basic operation with out promise ========>>>>>>>\n\n', () => {

    const objMath = new basicTest();
    let a = 20, b = 10;
    it('test for add method :===== which take 2 params and result is some of 2 value', (done) => {

        assert.equal(objMath.add(a, b), a + b);
        done();

    })

    it('test for sub method :===== which take 2 params and result is some of 2 value', (done) => {

        assert.equal(objMath.sub(a, b), a - b);
        done();

    })

    it('test for multi method :===== which take 2 params and result is some of 2 value', (done) => {

        assert.equal(objMath.mult(a, b), a * b);
        done();

    })
    it('test for div method :===== which take 2 params and result is some of 2 value', (done) => {

        assert.equal(objMath.div(a, b), a / b);
        done();

    })
})


describe('math basic operation with promise================>>>>>>>>>>>>>>\n\n', () => {

    const objMath = new basicTestWithPromise();
    let a = 20, b = 10;
    it('test for add method :===== which take 2 params and result is some of 2 value', (done) => {
        objMath.add(a, b).then((data) => {

            assert.equal(data, a + b);
            done();
        })

    })

    it('test for sub method :===== which take 2 params and result is some of 2 value', (done) => {

        objMath.sub(a, b).then((data) => {

            assert.equal(data, a - b);
            done();
        })

    })

    it('test for multi method :===== which take 2 params and result is some of 2 value', (done) => {
        objMath.mult(a, b).then((data) => {

            assert.equal(data, a * b);
            done();
        })

    })
    it('test for div method :===== which take 2 params and result is some of 2 value', (done) => {
        objMath.div(a, b).then((data) => {

            assert.equal(data, a / b);
            done();
        })
    })
})