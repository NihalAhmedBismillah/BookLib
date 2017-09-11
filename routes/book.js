const books = require( "../controller/books");

module.exports = ( app )=>{
    
    app.route('/api/v1/getbooks')
        .get( books.getAllBooks )
    app.route('/api/v1/createbook')
        .post( books.saveBook )
   app.route('/api/v1/createdummybooks')
        .post( books.saveDummyBooks )
}