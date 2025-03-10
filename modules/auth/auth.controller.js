(function () {
  "use strict";

  const express = require("express");
  const router = express.Router();
  const UserMiddleware = require("../users/user.module")().UserMiddleware;

  router.post("/login", UserMiddleware.loginUsers, function (req, res) {
    res.status(200).json(req.response);
  });

  module.exports = router;
})(); 