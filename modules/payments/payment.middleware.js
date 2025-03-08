(function () {
  "use strict";

  module.exports = {
    addPayment: addPayment,
    getPayments: getPayments,
    getUserPayments: getUserPayments,
    getReservationPayments: getReservationPayments,
  };

  var PaymentService = require("./payment.module")().PaymentService;

  function addPayment(req, res, next) {
    PaymentService.createPayment(req.body).then(success).catch(failure);

    function success(data) {
      req.response = data;
      console.log(data);
      next();
    }

    function failure(error) {
      next(error);
    }
  }

  function getPayments(req, res, next) {
    PaymentService.fetchPayments()
      .then(success)
      .catch(failure);

    function success(data) {
      req.response = data;
      next();
    }

    function failure(error) {
      next(error);
    }
  }

  async function getUserPayments(req, res, next) {
    try {
      const payment = await PaymentService.fetchPaymentByUserId(req.params.usuario_id);
      req.response = payment;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getReservationPayments(req, res, next) {
    try {
      const payment = await PaymentService.fetchPaymentByReservationId(req.params.usuario_id);
      req.response = payment;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
})();
