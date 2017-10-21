/**
 * Create express REST api server
 */
let express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');
const config = require('./config.json');
const helmet = require('helmet');
module.exports = function () {

    let app = express();
    const secret = config['secret'];
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('view option', { laylut: false });
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride('_method'));
    app.use(cookieParser());
    //app.use(cors({ origin: 'http://localhost:3001' }));
    app.use(cors());
    app.options('*', cors());
    app.use(helmet());
    app.use(helmet.noCache())
    app.use(helmet.frameguard())


    //begin jwt 

    // api for generate jwt token
    app.post('/generatejwt', (req, res) => {

        // create dummy user      
        let user = {
            name: req.body.userName,
            password: req.body.password,
            address: ' asfafasdfasdf    adsfasdfasdfasdfas32e33adfasdfasd  fasdfads'
        }

        // create a token
        let token = jwt.sign(user, secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
            success: true,
            message: 'token generated!',
            token: token
        });
    });

    // middleware for authenticate all api
    let apiRoutes = (function (req, res, next) {

        let token = req.headers['x-access-token'];
        if (token) {

            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    /**
     * For now we are by pass jwt Authorization.
     * if we want to enable jwt Authorization, generate jwt and pass in request headers key as 'x-access-token' and value jwt  
     */
    app.use('/api', apiRoutes);

    //end

    // error handlers
    // development error handler will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500).send({
                success: false,
                message: 'internal server error .'
            });
        });
    }

    // production error handler, no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({
            success: false,
            message: 'internal server error .'
        });
    });

    return app;
}
