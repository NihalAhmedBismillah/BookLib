const authors = require( "../controller/authors");

module.exports = ( app )=>{

	app.route('/')
        .get( authors.index );
}


