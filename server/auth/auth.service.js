var passport = require("passport");
var config = require("../config");
var jwt = require("jsonwebtoken");
var compose = require("composable-middleware");
var expressJwt = require("express-jwt");
var User = require("../collections/models/user");
//var { expressjwt: ejwt } = require("express-jwt");

var validateJwt = expressJwt({
    secret: config.secrets.session
  });

function signToken(id, role) {
    return jwt.sign({
        _id: id,
        role: role
    },
        config.secrets.session, {
        expiresIn: 60 * 60 * 5
    }
    );
};
function isAuthenticated() {
    return (
        compose()
            // Validate jwt
            .use(function (req, res, next) {
                // allow access_token to be passed through query parameter as well
                if (req.query && req.query.hasOwnProperty("access_token")) {
                    req.headers.authorization = "Bearer " + req.query.access_token;
                }

                var a = validateJwt(req, res, next);
                console.log('validate jwt token : ' + a);
            })
            // Attach user to request
            .use(function (req, res, next) {
                require("../config/connectDB").ConnectDB();
                var selectJson = {
                    groups: 1,
                    email: 1,
                    first_name: 1,
                    last_name: 1,
                    mobile: 1,
                    alternate_contact_no: 1,
                    isactive: 1
                };
                var lookup = [];
                lookup.push({
                    path: "groups",
                    model: "group",
                    select: "title",
                    populate: {
                        path: "grouppermission",
                        model: "permission",
                        select: "title"
                    }
                });
                var obj = {};
                obj['id'] = req.user._id;
                obj['select'] = selectJson;
                obj['lookup'] = lookup;
                User.fn_ReadById(obj).then(
                    function (user) {
                        if (!user) {
                            return res.status(401).end();
                        }
                        req.user = user;
                        next();
                    },
                    function (err) {
                        console.log(err);
                        //return next(err);
                        //res.json({});
                        req.user = {};
                    }
                );

            })
    );
}
exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;