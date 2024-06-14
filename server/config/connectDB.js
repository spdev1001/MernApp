var mongoose = require('mongoose');
global.mongoose = mongoose;
var config = require('../config');
let pendingPromise = null;
module.exports = {
    /*
    mongoose.connect(config.mongo.uri, config.mongo.options);
    mongoose.connection.on('error', function (err) {
        console.error('MongoDB connection to <' + config.mongo.uri + '> failed: ' + err);
        process.exit(-1);
    });

*/
    cached: global.mongoose,
    ConnectDB1: async function () {
        //console.log(global.mongoose);
        const { readyState } = mongoose.connection;
        console.log('readyState : ' + readyState);
        if (this.cached && this.cached.conn && this.cached.conn.readyState === 1) {
            console.log('Returning cache connection....');
            return this.cached.conn
        }
        // Close the existing connection if it exist but is stale.
        if (this.cached && this.cached.conn) {
            await this.cached.conn.close()
        }
        console.log('Creating new DB connection....');

        this.cached.conn = await mongoose.connect(config.mongo.uri, config.mongo.options)
            .then(() => {
                console.log('Database connected!')
                return mongoose.connection
            })
            .catch(error => {
                console.log('Failed to connect to the database:', error)
                throw error
            })

        return this.cached.conn
    },
    ConnectDB: async function () {
        const { readyState } = mongoose.connection;
        const readyStates = {
            disconnected: 0,
            connected: 1,
            connecting: 2,
            disconnecting: 3,
        };

        if (readyState === readyStates.connected) {
            console.log('Returning connected session');
            return mongoose.connection;
        } else if (pendingPromise) {
            console.log('Waiting for pending promises.');
            await pendingPromise;
            return pendingPromise;
        }
        console.log('Creating new DB connection....');
        pendingPromise = mongoose.connect(config.mongo.uri, config.mongo.options);

        try {
            await pendingPromise;
            console.log('Database connected!')
        } finally {
            //pendingPromise = null;
        }

        return pendingPromise;       
    },
    ConnectDB_old: function () {
        console.log(global.mongoose);

        mongoose.Promise = global.Promise;
        mongoose.connect(config.mongo.uri, config.mongo.options);

        mongoose.connection.on('connected', function () {
            console.log("Mongoose default connection is open to ", config.mongo.uri);
        });

        mongoose.connection.on('error', function (err) {
            console.log("Mongoose default connection has occured " + err + " error");
        });

        mongoose.connection.on('disconnected', function () {
            console.log("Mongoose default connection is disconnected");
        });
    },
    ConnectDBAndReturnDB: function () {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.mongo.uri, config.mongo.options, function (error, db) {

            if (error != null)
                console.log(error);
            else
                return db;
        });
    },
    DisconnectDB: async function () {
        /*
        await Promise.all(mongoose.modelNames().map(model => mongoose.model(model).ensureIndexes()));

        await mongoose.disconnect(function (err) {
            if (err != null)
                console.log(error);
            else
                console.log('DB connection is disconnected');
        });
        */

        mongoose.disconnect(function (err) {
            if (err != null)
                console.log(error);
            else
                console.log('DB connection is disconnected');
        });
        /**/
    },
    testDB: function () {
        mongoose.connect(config.mongo.uri, config.mongo.options, function (error) {

            if (error != null)
                console.log(error);
            else
                console.log('DB connection is connected');
            //DisconnectDB()
        });
        mongoose.connection.on('error', function (err) {
            console.error('MongoDB connection to <' + config.mongo.uri + '> failed: ' + err);
            process.exit(-1);
        });
    }
}