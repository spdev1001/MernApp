"use strict";
const { error } = require("console");
var config = require("./config");
const express = require("express");
var path = require("path");
const app = express();
var jwt = require("jsonwebtoken");
const socketCookieParser = require("socket.io-cookie-parser");
var server = require("http").Server(app);
var io = require("socket.io")(server, { serveClient: true, path: "/socket.io", cookie: true })
  .use(socketCookieParser())
  .use(function (socket, next) {
    if (socket.request.cookies && socket.request.cookies["token"] != undefined) {
      var token = socket.request.cookies["token"];
      console.log(token);
      //console.log('url : ' + socket.request.url);
      //console.log('socket cookies : ' + stringify(socket.request.cookies));
      var SESS_ID = socket.request.cookies["SESS_ID"];
      var sessionId = '';
      if (SESS_ID) {
        sessionId = SESS_ID.split(".")[0].replace(/s:/g, "");
      }
      jwt.verify(token, config.secrets.session, function (err, decoded) {
        if (err) {
          return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        socket.sessionId = sessionId;
        next();
      });

    } else {
      next(new Error('Authentication error'));
    }
  });

//import dbConnect from '../../config/dbConnect';
//const db = require("../server/config");

app.use(express.json());
app.use(express.static("public"));
app.use("/media", express.static("public"));

//https://www.youtube.com/watch?v=2UTER21MCdk

//require("./config/logger/winston")(app);
app.get('/', (req, res) => {
  res.send('Hello World!1')
});

app.get('/cerror', (req, res) => {
  throw new Error('error page');
});


require("./config/socketio")(io);
require("./config/express")(app);
require("./routes")(app);
//for internal errors
//require("./config/logger/winston_internal")(app);


function startServer() {
  server.listen(config.port, config.ip, function () {
    if ("test" !== app.get("env")) {
      console.log(
        "Express server listening on %s:%d, in %s mode",
        config.ip,
        config.port,
        app.get("env")
      );
    }
  });
}
setImmediate(startServer);


/*
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, config.mongo.options).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
/**/

//const port = process.env.PORT || 5000;
//require("./config/connectDB").ConnectDB();
//require("./config/connectDB").DisconnectDB();