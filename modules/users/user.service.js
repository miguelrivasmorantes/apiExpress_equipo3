var jwt = require("jsonwebtoken");

(function () {
  "use strict";

  module.exports = {
    createUser: createUser,
    fetchUsers: fetchUsers,
    fetchUserById: fetchUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    loginUsers: loginUsers,
    validateToken: validateToken,
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

  async function loginUsers(credentials, req, res) {
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
  
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "30s" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 30 * 1000,
      });
  
      return { user };
  
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
  

  async function validateToken(req) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return { valid: false, message: "No token provided" };
      }
  
      return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return resolve({ valid: false, message: "Invalid token" });
          }
          resolve({ valid: true, user: decoded });
        });
      });
    } catch (error) {
      return { valid: false, message: "Server error" };
    }
  }
  
})();