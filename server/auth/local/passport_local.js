var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
    //debugger;
    console.log('validating user');
    return User.fn_ValidateUser(email.toLowerCase(), password,done);
}

exports.setup = function (User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function (email, password, done) {
        console.log('validating user 0');
        return localAuthenticate(User, email, password, done);
    }));
};