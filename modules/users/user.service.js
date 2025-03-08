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

  function fetchUserById(usuario_id) {
    return User.findById(usuario_id).exec();
  }

  function updateUser(usuario_id, user) {
    return User.findByIdAndUpdate(usuario_id, user, { new: true }).exec();
  }

  function deleteUser(usuario_id) {
    return User.findByIdAndRemove(usuario_id).exec();
  }
})();
