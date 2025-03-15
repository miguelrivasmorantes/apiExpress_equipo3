(function () {
    "use strict";
  
    module.exports = init;
  
    function init() {
      return {
        RoomController: require("./room.controller"),
        RoomMiddleware: require("./room.middleware"),
        RoomService: require("./room.service"),
        RoomModel: require("./room.model"),
      };
    }
  })();
  