const reviews = require( "../controller/reviews");

module.exports = ( app )=>{
    
    app.route('/api/v1/getreviews')
        .get( reviews.getAllReviews )
    app.route('/api/v1/createreview')
        .post( reviews.saveReview )
   app.route('/api/v1/createdummyreviews')
        .post( reviews.saveDummyReviews )
}