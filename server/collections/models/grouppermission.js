var mongoose = require('mongoose');
var baseModel = require('./baseModel');
var Schema = mongoose.Schema;



var GroupPermissionSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    required: true
  },
  group: {
    type: String,
    lowercase: true,
    required: true
  },
  permission: [{
    type: String,
    lowercase: true,
    required: true
  }]

});

var GroupPermissionModel = mongoose.model('grouppermission', GroupPermissionSchema);
module.exports = GroupPermissionModel;
GroupPermissionModel.fn_Read = fn_Read;
GroupPermissionModel.fn_ReadById = fn_ReadById;
GroupPermissionModel.fn_ReadCount = fn_ReadCount;


function fn_Read(obj) {
  return baseModel.b_Read(GroupPermissionModel, obj);
}

function fn_GetCount(searchJson) {
  return baseModel.b_GetCount(GroupPermissionModel, searchJson);
}

function fn_ReadById(obj) {
  return baseModel.b_ReadById(GroupPermissionModel, obj);
}