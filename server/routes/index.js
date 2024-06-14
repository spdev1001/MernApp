var path = require("path");
module.exports = function (app) {
    app.use("/adminapi", require("./adminApiRoute"));
    app.use("/openapi", require("./adminApiRoute"));
    app.use("/api", require("./siteApiRoute"));
}