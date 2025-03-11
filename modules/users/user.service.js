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
      console.log("Credenciales recibidas:", credentials);
  
      // Buscar el usuario por nombre de usuario
      const user = await User.findOne({ username });
      console.log("Usuario encontrado:", user);
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Imprimir la contraseña almacenada (cifrada) y la contraseña proporcionada para comparar
      console.log("Contraseña proporcionada:", password);
      console.log("Contraseña almacenada (cifrada):", user.password);
  
      // Comparar la contraseña con el método comparePassword
      const isMatch = await user.comparePassword(password);
      console.log("Contraseña válida:", isMatch);
  
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
  
      // Retornar el usuario si todo es correcto
      return user;
    } catch (error) {
      console.error("Error al hacer login:", error);
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
  
  
})();