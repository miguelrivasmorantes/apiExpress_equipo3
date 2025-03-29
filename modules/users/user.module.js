(function (){
    "use strict";

    module.exports = init;
    function init() {
        return {
            UserController: require("./user.controller"),
            UserService: require("./user.service"),
            UserMiddleware: require("./user.middleware"),
            UserModel: require("./user.model"),
        };
    }
})();