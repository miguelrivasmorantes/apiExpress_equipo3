(function () {
    "use strict";
  
    var express = require("express");
    var router = express.Router();
  
    var UserMiddleware = require("../users/user.module")().UserMiddleware;
  
    router.post("/login", UserMiddleware.loginUser, function (req, res) {
      res.status(200).json(req.response);
    });

    router.get("/validate-token", UserMiddleware.validateToken, function (req, res) {
      res.status(200).json(req.response);
    });
    
    
    module.exports = router;
  })();