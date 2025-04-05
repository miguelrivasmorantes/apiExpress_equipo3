(function () {
  "use strict";

  var express = require("express");
  var router = express.Router();

  var PaymentMiddleware = require("./payment.module")().PaymentMiddleware;

  router.put(
    "/pagar/:pago_id",
    PaymentMiddleware.confirmPayment,
    PaymentMiddleware.formatPaymentDates,
    (req, res) => {
      res.status(200).json(req.response);
    },
  );

  router.post(
    "/crear/:reserva_id",
    PaymentMiddleware.createPendingPaymentMiddleware,
    PaymentMiddleware.formatPaymentDates,
    (req, res) => {
      res.status(201).json(req.response);
    },
  );

  router.get(
    "/",
    PaymentMiddleware.getPayments,
    PaymentMiddleware.formatPaymentDates,
    function (req, res) {
      res.status(200).json(req.response);
    },
  );

  router.get(
    "/usuario/:usuario_id",
    PaymentMiddleware.getPaymentsByUserId,
    PaymentMiddleware.formatPaymentDates,
    function (req, res) {
      res.status(200).json(req.response);
    },
  );

  router.get(
    "/reserva/:reserva_id",
    PaymentMiddleware.getPaymentsByReservationId,
    PaymentMiddleware.formatPaymentDates,
    function (req, res) {
      res.status(200).json(req.response);
    },
  );

  router.get(
    "/usuario/:usuario_id/ultimo",
    PaymentMiddleware.getLastPaymentByUserId,
    PaymentMiddleware.formatPaymentDates,
    function (req, res) {
      res.status(200).json(req.response);
    },
  );

  router.get(
    "/usuario/:usuario_id/total",
    PaymentMiddleware.getTotalPaymentsByUserId,
    function (req, res) {
      res.status(200).json(req.response);
    },
  );

  module.exports = router;
})();
