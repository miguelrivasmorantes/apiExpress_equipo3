(function () {
  "use strict";

  var express = require("express");
  var router = express.Router();

  var UserMiddleware = require("./user.module")().UserMiddleware;

  router.post("/", UserMiddleware.addUser, function (req, res) {
    res.status(201).json(req.response);
  });

  router.get("/", UserMiddleware.getUsers, function (req, res) {
    res.status(200).json(req.response);
  });

  router.post("/login", UserMiddleware.loginUser, function (req, res) {
    res.status(200).json(req.response);
  });

  router.get("/:usuario_id", UserMiddleware.getUserById, function (req, res) {
    res.status(200).json(req.response);
  });

  router.put("/:usuario_id", UserMiddleware.modifyUser, function (req, res) {
    res.status(200).json(req.response);
  });

  router.delete("/:usuario_id", UserMiddleware.removeUser, function (req, res) {
    res.status(200).json(req.response);
  });

  module.exports = router;
})();
