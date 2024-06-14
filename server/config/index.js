"use strict";
var path = require("path");
var allConfig = {
    env: process.env.NODE_ENV,
    // Root path of server
    root: path.normalize(__dirname + "/../.."),
    // Server port
    port: process.env.PORT || 5000,

    siteUrl: "http://localhost:" + this.port,

    // Server IP
    ip: process.env.IP || "0.0.0.0",
    mongo: {
        uri_local: process.env.MONGODB_DB_URL || "mongodb://localhost/esale",
        uri: process.env.MONGODB_DB_URL || "mongodb+srv://saurabhkumarmt:Z8ioHXdSie6RrWXN@cluster0.ycvkm6b.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
        options: {
            keepAlive: true,
            maxIdleTimeMS:10000,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: false,
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4,
            useUnifiedTopology: true
        }
    },
    secrets: {
        session: "mApp-IJNxPtI1PpJVMh@@#@!vlOZDzrOb6-secret"
      }
}
module.exports = allConfig;