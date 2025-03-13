(function () {
    "use strict";
  
    module.exports = init;
  
    function init() {
      return {
        ReservationController: require("./reservation.controller"),
        ReservationMiddleware: require("./reservation.middleware"),
        ReservationService: require("./reservation.service"),
        ReservationModel: require("./reservation.model"),
      };
    }
  })();  