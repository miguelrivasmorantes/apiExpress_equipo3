(function () {
  "use strict";

  module.exports = {
    addPayment: addPayment,
    getPayments: getPayments,
    getUserPayments: getUserPayments,
  };

  var PaymentService = require("./payment.module")().PaymentService;

  function addPayment(req, res, next) {
    PaymentService.createPayment(req.body).then(success).catch(failure);

    function success(data) {
      req.response = data;
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

  function getUserPayments(req, res, next) {
    PaymentService.fetchPaymentByUser(req.params.usuario_id)
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
})();
