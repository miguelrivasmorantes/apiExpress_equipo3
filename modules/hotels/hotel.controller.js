(function () {
    "use strict";
  
    var express = require("express");
    var router = express.Router();
  
    var HotelMiddleware = require("./hotel.module")().HotelMiddleware;
  
    router.post("/", HotelMiddleware.addHotel, function (req, res) {
      res.status(201).json(req.response);
    });
  
    router.get("/", HotelMiddleware.getHotels, function (req, res) {
      res.status(200).json(req.response);
    });
  
    router.get("/:hotelId", HotelMiddleware.getHotelById, function (req, res) {
      res.status(200).json(req.response);
    });
  
    router.put("/:hotelId", HotelMiddleware.modifyHotel, function (req, res) {
      res.status(200).json(req.response);
    });
  
    router.delete("/:hotelId", HotelMiddleware.removeHotel, function (req, res) {
      res.status(200).json(req.response);
    });
  
    module.exports = router;
  })();