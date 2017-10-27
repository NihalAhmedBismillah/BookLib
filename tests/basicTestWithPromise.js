class methOperationWithPromise {

    constructor() {

    }
    add(para1, para2) {

        return new Promise((res, rej) => {
            setTimeout(() => {
                res(parseInt(para1) + parseInt(para2));
            }, 0);
        })
    }

    sub(para1, para2) {

        return new Promise((res, rej) => {
            setTimeout(() => {
                res(parseInt(para1) - parseInt(para2));
            }, 0);
        })

    }
    mult(para1, para2) {

        return new Promise((res, rej) => {
            setTimeout(() => {
                res(parseInt(para1) * parseInt(para2));
            }, 0);
        })

    }
    div(para1, para2) {

        return new Promise((res, rej) => {
            setTimeout(() => {
                res(parseInt(para1) / parseInt(para2));
            }, 0);
        })

    }
}

module.exports = methOperationWithPromise;