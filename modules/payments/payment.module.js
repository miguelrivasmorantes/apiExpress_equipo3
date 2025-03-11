(function () {
  "use strict";

  module.exports = init;

  function init() {
    return {
      PaymentController: require("./payment.controller"),
      PaymentMiddleware: require("./payment.middleware"),
      PaymentService: require("./payment.service"),
      PaymentModel: require("./payment.model"),
    };
  }
})();
