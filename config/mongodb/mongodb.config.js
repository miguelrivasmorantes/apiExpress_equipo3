"use strict";

const config = require('../config');

const mongoConfig = {
    mongodb: {
        server: config.database.server,
        database: config.database.name,
        user: config.database.user,
        password: config.database.password
    }
};

module.exports = mongoConfig; 