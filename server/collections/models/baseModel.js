var mongoose = require("mongoose");
var db = require("../../config/connectDB");
var q = require("q");
var bModel = {};
bModel.b_Read = b_Read;
bModel.b_ReadById = b_ReadById;
bModel.b_GetCount = b_GetCount;

module.exports = bModel;




function b_Read(
    objModel,
    objData
) {
    db.ConnectDB();
    var deffered = q.defer();
    objModel = objModel
        .find({});
        
    objModel.exec(function (err, data) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}

function b_Read_w(
    objModel,
    objData
) {
    db.ConnectDB();
    var deffered = q.defer();
    objModel = objModel
        .find(objData.search)
        .sort(objData.sort)
        .select(objData.select)
        .skip(objData.limit * objData.page - objData.limit)
        .limit(objData.limit);
    objModel = CreatePopulateExpression(objModel, objData.lookup);
    objModel.exec(function (err, data) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}

function b_ReadById(objModel, objData) {
    db.ConnectDB();
    var deffered = q.defer();
    objModel = objModel
        .findOne({
            _id: objData.id
        })
        .select(objData.select);
    objModel = CreatePopulateExpression(objModel, objData.lookup);
    objModel.exec(function (err, data) {
        //require("../config/connectDB").DisconnectDB();
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}
function b_GetCount(objModel, searchJson) {
    db.ConnectDB();
    var deffered = q.defer();
    objModel.countDocuments(searchJson).exec(function (err, data) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}
function CreatePopulateExpression(SchemaModel, lookup) {
    lookup = Object.assign([], lookup);
    //console.log('length : '+lookup.length);
    if (lookup && lookup.length > 0) {
        lookup.forEach(element => {
            //console.log(element);
            SchemaModel.populate({
                path: element.path,
                model: element.model,
                select: element.select,
                populate: element.populate ? element.populate : undefined
            });
            try {
                require("./" + element.model);
                //require("./models/KHS/" + element.model);
            } catch (error) {
                //require("./models/" + element.model);
            }
            try {
                if (element.populate) {
                    //require("./models/KHS/" + element.populate.model);
                    require("./" + element.populate.model);                    
                }
            } catch (error) {
                if (element.populate && element.populate.length > 0) {
                    //require("./models/KHS/" + element.populate.model);
                    element.populate.forEach(m => {
                        require("./" + m.model);
                    });
                }
            }
        });
    }
    return SchemaModel;
}