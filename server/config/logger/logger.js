require('winston-mongodb');
var config = require("../index");
const { createLogger, format, transports, addColors } = require('winston');
const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'public/logs/log_warning.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'public/logs/log_error.log'
        }),
        new transports.File({
            level: 'info',
            filename: 'public/logs/log_info.log'
        })
    ], format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    )
});
module.exports = logger;

//to store the logs in the mongo dn url
/*
 new transports.MongoDB({
            db: config.mongo.uri,
            collection: 'logs'
        })
*/