const PORT   = process.env.PORT || '5000';
let app    = require("./config/express")('');
let router =  require( "./config/router")(app);
app.listen(PORT);
console.log( "Express application listening on port " + PORT );
