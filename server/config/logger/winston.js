require('winston-mongodb');
var config = require("../index");
const { transports, format } = require('winston');
const expresswinston = require('express-winston');
const logger = require('./logger');

module.exports = function (app) {

    app.use(expresswinston.logger({
        winstonInstance: logger,
        statusLevels: true
    }));

    /*
        app.use(expresswinston.logger({
            transports: [
                new transports.Console(),
                new transports.File({
                    level: 'warn',
                    filename: 'logs/log_warning.log'
                }),           
                new transports.File({
                    level: 'error',
                    filename: 'logs/log_error.log'
                }),
                new transports.MongoDB({
                    db:config.mongo.uri,
                    collection:'logs'
                })
            ], format: format.combine(
                format.json(),
                format.timestamp(),
                format.prettyPrint()
            ),
            statusLevels:true
        }));
    */

};