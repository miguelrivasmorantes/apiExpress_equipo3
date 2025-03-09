(function () {
    "use strict";
  
    module.exports = {
      addReservation: addReservation,
      getReservations: getReservations,
      getReservationById: getReservationById,
      getReservationsByUserId: getReservationsByUserId,
      modifyReservation: modifyReservation,
    };
  
    var ReservationService = require("./reservation.module")().ReservationService;
  
    function addReservation(req, res, next) {
      ReservationService.createReservation(req.body).then(success).catch(failure);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function failure(error) {
        next(error);
      }
    }
  
    function getReservations(req, res, next) {
      ReservationService.fetchReservations().then(success).catch(failure);
  
      function success(data) {
        req.response = data;
        console.log("Xde", data);
        next();
      }
  
      function failure(err) {
        next(err);
      }
    }
  
    function getReservationById(req, res, next) {
      ReservationService.fetchReservationById(req.params.reservationId).then(success).catch(failure);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function failure(err) {
        next(err);
      }
    }

    function getReservationsByUserId(req, res, next) {
      ReservationService.fetchReservationsByUserId(req.params.userId).then(success).catch(failure);
    
      function success(data) {
        req.response = data;
        next();
      }
    
      function failure(err) {
        next(err);
      }
    }

    function modifyReservation(req, res, next) {
      ReservationService.updateReservation(req.params.reservationId, req.body)
        .then(success)
        .catch(failure);    
    
      function success(data) {
        req.response = data;
        next();
      }
    
      function failure(err) {
        next(err);
      }
    }
})();
  