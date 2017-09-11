
/**
 * Define all routes..
 */
module.exports = function( app ){
    require('../routes/index')(app);
    require('../routes/author')(app);
    require('../routes/book')(app);
    require('../routes/review')(app);
    require('../routes/globalSearch')(app);
    app.use('/*',  (req, res, next)=> {
        res.status(404).json({ "error": "No such service present" });
    })
    
    app.use('*',  (req, res, next) => {
        res.status(404).send('<html><body><h1>404 Page Not Found</h1></body></html>');
    });
}
