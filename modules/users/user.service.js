(function () {
  "use strict";

  module.exports = {
    createUser: createUser,
    fetchUsers: fetchUsers,
    fetchUserById: fetchUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
  };

  const { User } = require("./user.model");

  function createUser(user) {
    return User.create(user);
  }

  function fetchUsers() {
    return User.find({}).exec();
  }

  function fetchUserById(userId) {
    return User.findById(userId).exec();
  }

  function updateUser(userId, user) {
    w;
    return User.findByIdAndUpdate(userId, user, { new: true }).exec();
  }

  function deleteUser(userId) {
    return User.findByIdAndRemove(userId).exec();
  }
})();
