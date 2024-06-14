var express = require("express");
var apiRouter = express.Router();
var apiController = require("../routes/controller")();

apiRouter
  .route("/:model/get_json")
  .get(apiController.getJson);

  apiRouter
  .route("/getlogs/:logfile")
  .get(apiController.getLogs);
  
module.exports = apiRouter;