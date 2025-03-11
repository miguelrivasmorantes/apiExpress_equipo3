(function () {
  "use strict";

  module.exports = {
    createUser: createUser,
    fetchUsers: fetchUsers,
    fetchUserById: fetchUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    loginUsers: loginUsers,
  };

  const { User } = require("./user.model");

  function createUser(user) {
    return User.create(user);
  }

  function fetchUsers() {
    return User.find().exec();
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

  async function loginUsers(credentials) {
    try {
      const { username, password } = credentials;
      const user = await User.findOne({ username });
  
      if (!user) {
        throw new Error("User not found");
      }
      
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
  
      return user;
      
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
  
  
})();