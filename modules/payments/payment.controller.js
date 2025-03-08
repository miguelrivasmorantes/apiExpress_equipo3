(function () {
  "use strict";

  var express = require("express");
  var router = express.Router();

  var PaymentMiddleware = require("./payment.module")().PaymentMiddleware;

  router.post("/", PaymentMiddleware.addPayment, function (req, res) {
    res.status(201).json(req.response);
  });

  router.get("/", PaymentMiddleware.getPayments, function (req, res) {
    res.status(200).json(req.response);
  });

  router.get("/historial/:usuario_id", PaymentMiddleware.getUserPayments, function (req, res) {
    res.status(200).json(req.response);
  });
  module.exports = router;
})();
