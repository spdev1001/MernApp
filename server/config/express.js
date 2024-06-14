var express = require("express");
var config = require("../config/index");
var path = require("path");
var compression = require("compression");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var session = require("express-session");
var hpp = require("hpp");
var helmet = require("helmet");
module.exports = function (app) {
    app.use(express.static("client/rapp/build"));
    //-------------------------use compression--------------------------------
    app.use(compression());
    //-------------------------body Parser------------------------------------
    var urlencodedparser = bodyParser.urlencoded({
        extended: true
    });
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(urlencodedparser);
    /**
   * secure the app
   */

    app.use(
        session({
            name: "SESS_ID",
            secret: "^#$5sX(H_^*f6KUDxo!#65^#@*(&%Br58#@%S",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: 'auto', httpOnly: true }
        })
    );
    app.use(hpp());
    app.use(helmet.hidePoweredBy({ setTo: "eMernApp" })); //change value of X-Powered-By header to given value
    app.use(helmet.noSniff()); // set X-Content-Type-Options header
    app.use(helmet.frameguard()); // set X-Frame-Options header
    app.use(helmet.xssFilter()); // set X-XSS-Protection header
};