(function () {
  "use strict";

  var express = require("express");
  var router = express.Router();

  var ReservationMiddleware = require("./reservation.module")().ReservationMiddleware;

  router.post("/", ReservationMiddleware.addReservation, function (req, res) {
    res.status(201).json(req.response);
  });

  router.get("/", ReservationMiddleware.getReservations, function (req, res) {
    res.status(200).json(req.response);
  });

  router.get("/:reservationId", ReservationMiddleware.getReservationById, function (req, res) {
    res.status(200).json(req.response);
  });

  router.get("/usuario/:userId", ReservationMiddleware.getReservationsByUserId, function (req, res) {
    res.status(200).json(req.response);
  });
  
  module.exports = router;
})();
