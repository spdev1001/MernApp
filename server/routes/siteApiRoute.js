var express = require("express");
var apiRouter = express.Router();
var apiController = require("./controller")();
var auth = require("../auth/auth.service");

apiRouter.route("/user/me").get(auth.isAuthenticated(), apiController.me);//auth.isAuthenticated(),
//apiRouter.route("/user/me").get(apiController.me);
apiRouter.route("/user/auth/:mode").post(apiController.login);

module.exports = apiRouter;