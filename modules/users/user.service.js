"use strict";

const { User } = require("./user.model");

module.exports = {
  createUser,
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  loginUsers,
};

async function createUser(user) {
  try {
    return await User.create(user);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function fetchUsers() {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

async function fetchUserById(usuario_id) {
  try {
    const user = await User.findById(usuario_id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
}

async function updateUser(usuario_id, userData) {
  try {
    const user = await User.findById(usuario_id);
    if (!user) {
      throw new Error("User not found");
    }

    Object.assign(user, userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

async function deleteUser(usuario_id) {
  try {
    const user = await User.findByIdAndDelete(usuario_id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
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
