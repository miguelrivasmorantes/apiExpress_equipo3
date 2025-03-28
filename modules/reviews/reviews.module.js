(function () {
    "use strict";
  
    module.exports = init;
  
    function init() {
      return {
        ReviewController: require("./reviews.controller"),
        ReviewMiddleware: require("./reviews.middleware"),
        ReviewService: require("./reviews.service"),
        ReviewModel: require("./reviews.model"),
      };
    }
  })();  