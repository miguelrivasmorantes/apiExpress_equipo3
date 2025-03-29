(function () {
    "use strict";
  
    module.exports = {
      addHotel: addHotel,
      getHotels: getHotels,
      getHotelById: getHotelById,
      modifyHotel: modifyHotel,
      removeHotel: removeHotel,
    };
  
    var HotelService = require("./hotel.module")().HotelService;
  
    function addHotel(req, res, next) {
      HotelService.createHotel(req.body).then(success).catch(failure);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function failure(error) {
        next(error);
      }
    }
  
    function getHotels(req, res, next) {
      HotelService.fetchHotels().then(success).catch(failure);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function failure(err) {
        next(err);
      }
    }
  
    function getHotelById(req, res, next) {
      HotelService.fetchHotelById(req.params.hotelId).then(success).catch(failure);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function failure(err) {
        next(err);
      }
    }
  
    function modifyHotel(req, res, next) {
      HotelService.updateHotel(req.params.hotelId, req.body)
        .then(success)
        .catch(error);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function error(err) {
        next(err);
      }
    }
  
    function removeHotel(req, res, next) {
      HotelService.deleteHotel(req.params.hotelId).then(success).catch(error);
  
      function success(data) {
        req.response = data;
        next();
      }
  
      function error(err) {
        next(err);
      }
    }
  })();