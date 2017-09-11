const authors = require( "../controller/authors");

module.exports = ( app )=>{
    
    app.route('/api/v1/getauthors')
        .get( authors.getAllAuthors )
    app.route('/api/v1/createauthor')
        .post( authors.saveAuthor )
   app.route('/api/v1/createdummyauthors')
        .post( authors.saveDummyAuthors )
}