"use strict";
var config = require("../../config");
var passport = require("passport");
var auth = require("../../auth/auth.service");
var logger = require('../../config/logger/logger');
var apiController = function () {
    var login = function (req, res, next) {
        var User = GetModelObject("user");
        var mode = req.params.mode;

        logger.info('Inside login mode : ' + mode);
        console.log('inside login mode : ' + mode);
        if (mode == "local") {
            var localPassport = require("../../auth/local/passport_local").setup(User, config);
            passport.authenticate("local", function (err, user, info) {
                var error = err || info;
                if (error) {
                    return res
                        .status(401)
                        .json(error)
                        .end();
                }
                if (!user) {
                    console.log('user not found');
                    return res.status(404).json({
                        message: "Something went wrong, please try again."
                    });
                }
                if (user) {
                    console.log('user found');
                    var token = auth.signToken(user._id, user.groups);
                    res.json({
                        token: token,
                        data: user
                        //data: {}
                    });
                }
            })(req, res, next);


        } else if (mode == "google") { }
    };
    var me = function (req, res, next) {
        //return res.status(200).json({ message: "Ok" });
        res.json(req.user);
    }
    var parseQueryString = function (param, defaultValue) {
        if (
            param != "" &&
            param != "undefined" &&
            param != null &&
            param.length > 0
        ) {
            return JSON.parse(param);
        } else {
            return defaultValue;
        }
    };
    var GetModelObject = function (param) {
        var obj = null;
        if (param === "user") {
            obj = require("../../collections/models/user");
        }
        return obj;
    };

    var getJson = function (req, res) {
        var objData = {};
        var model = req.params.model;
        var id = req.params.id;
        var selectJson = parseQueryString(req.query.select, {});
        var lookup = parseQueryString(req.query.lookup, {});
        var currentModel = GetModelObject(model);
        //console.log('api called for model ' + model + '..........');
        logger.info('Api called for model ' + model);
        if (id != null && id != undefined) {
            objData['id'] = id;
            objData['select'] = selectJson;
            objData['lookup'] = lookup;
            currentModel.fn_ReadById(objData).then(
                function (data) {
                    res.json({
                        d: data
                    });
                },
                function (err) {
                    console.log(err);
                    res.status(422).json(err);
                }
            );
        } else {
            var perPage = parseQueryString(req.query.limit, 10);
            var page = parseQueryString(req.query.page, 1);

            var sortParam = parseQueryString(req.query.sort, "title");
            var sortOrder = parseQueryString(req.query.desc, false);
            sortOrder = sortOrder == true ? -1 : 1;
            var sortJson = {};
            sortJson[sortParam] = sortOrder;
            var searchParam = parseQueryString(req.query.search, "");
            var searchkeypassed = parseQueryString(req.query.searchkeypassed, false);
            var searchJson = {};
            if (
                searchParam != undefined &&
                searchParam != "" &&
                searchParam != '""'
            ) {
                if (searchkeypassed) {
                    searchJson = Object.assign({}, searchParam);
                } else {
                    searchJson[sortParam] = {
                        $regex: searchParam,
                        $options: "i"
                    };
                }
            } else {
                searchJson = {};
            }
            objData['select'] = selectJson;
            objData['search'] = searchJson;
            objData['sort'] = sortJson;
            objData['limit'] = perPage;
            objData['page'] = page;
            objData['lookup'] = lookup;
            //.fn_Read(selectJson, searchJson, sortJson, perPage, page, lookup)
            currentModel
                .fn_Read(objData)
                .then(
                    function (data) {
                        currentModel.fn_ReadCount(searchJson).then(
                            function (total) {
                                console.log('20240517 : Api call to model ' + model + ' is successfull.');
                                res.json({
                                    d: data,
                                    total: total
                                });
                            },
                            function (err) {
                                res.status(422).json(err);
                            }
                        );
                    },
                    function (err) {
                        res.status(422).json(err);
                    }
                );
        }
    };

    var getLogs = function (req, res) {
        const fs = require('fs');
        var path = require("path");
        var logFileName = req.params.logfile;

        try {
            var newpath = path.resolve("./") + "\\public\\logs\\" + logFileName;
            logger.info('The path of log file is : ' + newpath);
            if (fs.existsSync(newpath)) {
                fs.readFile(newpath, 'utf8', (e, data) => {
                    if (e) throw e;
                    //logger.info(data);
                    res.json(data);
                });
            } else {
                res.json({ status: 200, 'error': 'File not found' });
            }

        } catch (error) {
            res.json({ status: 200, 'error': 'OK' });
        }




    }
    return {
        getJson: getJson,
        login: login,
        me: me,
        getLogs: getLogs
    };
};
module.exports = apiController;