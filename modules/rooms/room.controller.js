(function () {
    "use strict";
  
    var express = require("express");
    var router = express.Router();
  
    var RoomMiddleware = require("./room.module")().RoomMiddleware;
    
    router.post("/", RoomMiddleware.addRoom, function (req, res) {
      res.status(201).json(req.response);
    });
    
    router.get("/", RoomMiddleware.getRooms, function (req, res) {
      res.status(200).json(req.response);
    });
    
    router.get("/hotel/:hotel_id", RoomMiddleware.getRoomByHotelId, function (req, res) {
      res.status(200).json(req.response);
    });
  
    router.get("/habitaciones/:tipos", RoomMiddleware.getRoomByType, function (req, res) {
      res.status(200).json(req.response);
    });
    

    module.exports = router;
  })();