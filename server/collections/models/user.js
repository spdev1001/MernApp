var mongoose = require("mongoose");
var baseModel = require("./baseModel");
var Schema = mongoose.Schema;
var db = require("../../config/connectDB");
var q = require("q");
var bCrypt = require("bcrypt-nodejs");

var UserSchema = new Schema({
    name: String,
    title: String,
    first_name: String,
    last_name: String,
    mobile: Number,
    alternate_contact_no: String,
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    isactive: Boolean,
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "group"
    }],
    password: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    github: {},
    createdby: {},
    modifiedby: {},
    created: Date,
    modified: Date
});

var User = mongoose.model("user", UserSchema);
module.exports = User;
User.fn_Read = fn_Read;
User.fn_ReadCount = fn_ReadCount;
User.fn_ValidateUser = fn_ValidateUser;
User.fn_ReadById = fn_ReadById;



function fn_Read(obj) {
    return baseModel.b_Read(
        User,
        obj
    );
}

function fn_ReadCount(obj) {
    return baseModel.b_GetCount(User, obj);
}

function fn_ValidateUser(email, password, done) {
    db.ConnectDB();
    console.log('validating user 2');
    var selectJson = { name: 1, email: 1, groups: 1 };
    User.findOne(
        {
            email: email
        },
        function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: "This email is not registered."
                });
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, {
                    message: "This password is not correct."
                });
            }
            return done(null, user);
        }
    );
}

function fn_ReadById(obj) {
    return baseModel.b_ReadById(User, obj);
  }

var isValidPassword = function (user, password) {
    //return (user.password==password)?true:false;
    return bCrypt.compareSync(password, user.password);
};