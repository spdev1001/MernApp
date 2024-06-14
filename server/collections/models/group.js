var mongoose = require("mongoose");
var baseModel = require("./baseModel");
var Schema = mongoose.Schema;
var GroupSchema = new Schema({
  title: {
    type: String,
    uppercase: true,
    required: true,
    unique: true
  },
  grouppermission: [{ type: Schema.Types.ObjectId, ref: "permission" }],
  sitegrouppermission: [
    {
      type: String,
      uppercase: true,
      required: true
    }
  ],
  createdby: {},
  modifiedby: {},
  created: Date,
  modified: Date
});

var GroupModel = mongoose.model("group", GroupSchema);
module.exports = GroupModel;

GroupModel.fn_Read = fn_Read;
GroupModel.fn_ReadById = fn_ReadById;
GroupModel.fn_ReadCount = fn_ReadCount;

function fn_Read(obj) {
  return baseModel.b_Read(
    GroupModel,
    obj
  );
}

function fn_ReadCount(searchJson) {
  return baseModel.b_GetCount(GroupModel, searchJson);
}

function fn_ReadById(obj) {
  return baseModel.b_ReadById(GroupModel, obj);
}


