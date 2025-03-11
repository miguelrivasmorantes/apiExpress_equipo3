"use strict";
const UserService = require("./user.module")().UserService;

module.exports = {
  addUser,
  getUsers,
  getUserById,
  modifyUser,
  removeUser,
  loginUser,
};

async function handleRequest(serviceFunction, req, res, next, ...params){
  try{
    req.response = await serviceFunction(...params);
    next();
  } catch (error) {
    next(error);
  }
}

function addUser(req, res, next) {
  handleRequest(UserService.createUser, req, res, next, req.body);
}

function loginUser(req, res, next) {
  handleRequest(UserService.loginUsers, req, res, next, req.body);
}

function getUsers(req, res, next) {
  handleRequest(UserService.fetchUsers, req, res, next);
}

function getUserById(req, res, next) {
  handleRequest(UserService.fetchUserById, req, res, next, req.params.usuario_id);
}

function modifyUser(req, res, next) {
  handleRequest(UserService.updateUser, req, res, next, req.params.usuario_id, req.body);
}

function removeUser(req, res, next) {
  handleRequest(UserService.deleteUser, req, res, next, req.params.usuario_id);
}