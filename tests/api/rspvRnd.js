let rsvp = require('rsvp');
rsvp.on('error',(reason,leble)=>{ 
 
    console.log('I am error!')
     console.log(reason);
});
function pF1() {

    return new rsvp.Promise((resolve, reject) => {
        console.log('pF1 called!')
        setTimeout(function () {
            let obj = { name: 'nihal', address: 'pune' };
           // resolve(obj);
            reject('I have rejected');
        }, 1000);
    });
}

function pF2() {

    return new rsvp.Promise((resolve, reject) => {
        console.log('pF2 called!')
        setTimeout(function () {
            let obj = { name: 'jalal', address: 'mumbai' };
            resolve(obj);
        }, 1000);

    });

}


function pF3() {

    return new rsvp.Promise((resolve, reject) => {
        console.log('pF3 called!')
        setTimeout(function () {
            let obj = { name: 'jamal', address: 'mumbai' };
            resolve(obj);
        }, 1000);
    });
}
//Test Promise
rsvp.all([pF1(),pF2(),pF3()]).then((data)=>{

console.log(JSON.stringify(data));
}).catch((err)=>{
    console.log(err);
})

// pF1().then((result) => {
//     console.log(JSON.stringify(result));
//     return pF2();
// }).then((data) => {
//     console.log(data);
//     return pF3();
// }).then((data) => {
//     console.log(data);
// }).finally((data) => {
//     console.log('I am in finally!');
// }).catch((err) => {
//     console.log('I am in error ');
//     console.log(JSON.stringify(err));
// })