require('winston-mongodb');
var config = require("../index");
const { transports, format } = require('winston');
const expresswinston = require('express-winston')
const internalErrorLogger = require('./logger');
const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level} : ${meta.message}`;
});
module.exports = function (app) {
    /*
    app.use(expresswinston.errorLogger({
        winstonInstance: internalErrorLogger,
        statusLevels: true
    }));
*/

    app.use(expresswinston.errorLogger({
        transports: [
            new transports.File({
                filename: 'public/logs/log_internal_error.log'
            })

        ], format: format.combine(
            format.json(),
            format.timestamp(),
            format.prettyPrint(),
            myFormat
        ),
        statusLevels: true
    }));


};