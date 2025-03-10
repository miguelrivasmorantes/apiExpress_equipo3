"use strict";

const config = require('../config');
const jsonConfig = require('./mongodb-config.json');

// Configuración por defecto desde el archivo JSON
const defaultConfig = jsonConfig.mongodb;

// Configuración con variables de entorno
const mongoConfig = {
  mongodb: {
    server: config.database.server || defaultConfig.server,
    database: config.database.name || defaultConfig.database,
    user: config.database.user || defaultConfig.user,
    password: config.database.password || defaultConfig.password
  }
};

module.exports = mongoConfig; 