var UserProfile = (function () {
  var full_name = "";
  var objUser = {};

  var getName = function () {
    return full_name;    // Or pull this from cookie/localStorage
  };

  var getUser = function () {
    return objUser;    // Or pull this from cookie/localStorage
  };

  var setName = function (name) {
    full_name = name;
    // Also set this in cookie/localStorage
  };
  var setUser = function (user) {
    objUser = user;
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName,
    getUser: getUser,
    setUser: setUser
  }

})();

export default UserProfile;