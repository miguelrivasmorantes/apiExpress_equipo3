(function () {
    "use strict";
  
    module.exports = init;
  
    function init() {
      return {
        HotelController: require("./hotel.controller"),
        HotelMiddleware: require("./hotel.middleware"),
        HotelService: require("./hotel.service"),
        HotelModel: require("./hotel.model"),
      };
    }
  })();
  