var mongoose = require("mongoose");
var baseModel = require("./baseModel");
var Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  title: {
    type: String,
    uppercase: true,
    required: true
  },
  createdby: {},
  modifiedby: {},
  created: Date,
  modified: Date
});

var PermissionModel = mongoose.model("permission", PermissionSchema);
module.exports = PermissionModel;

PermissionModel.fn_Read = fn_Read;
PermissionModel.fn_ReadById = fn_ReadById;
PermissionModel.fn_ReadCount = fn_ReadCount;

function fn_Read(obj) {
  return baseModel.b_Read(
    PermissionModel,
    obj
  );
}

function fn_ReadCount(searchJson) {
  return baseModel.b_GetCount(PermissionModel, searchJson);
}

function fn_ReadById(obj) {
  return baseModel.b_ReadById(PermissionModel, obj);
}