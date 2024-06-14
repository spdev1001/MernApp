//https://github.com/vercel/next.js/discussions/12229
const mongoose = require("mongoose");
global.mongoose = mongoose;
var config = require('../config');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const { readyState } = mongoose.connection;
  if (readyState === readyStates.connected) {
    return next();
  } else if (pendingPromise) {
    // Wait for the already pending promise if there is one.
    await pendingPromise;
    return next();
  }
  if (!pendingPromise) {
    pendingPromise = mongoose.connect(config.mongo.uri, config.mongo.options);
    /*
    cached.promise = mongoose.connect(config.mongo.uri, config.mongo.options).then((mongoose) => {
      return mongoose;
    });
    */
  }
  try {
    await pendingPromise;
  } finally {
    pendingPromise = null;
  }

  next();
}

module.exports = dbConnect;

