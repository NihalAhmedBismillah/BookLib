/**
 * This class use to perfor some mathematical operations
 */
class mathOperation {

    add(para1, para2) {

        return parseInt(para1) + parseInt(para2)
    }

    sub(para1, para2) {

        return parseInt(para1) - parseInt(para2)
    }
    mult(para1, para2) {

        return parseInt(para1) * parseInt(para2)
    }
    div(para1, para2) {

        return parseInt(para1) / parseInt(para2)
    }

}
module.exports = mathOperation;
