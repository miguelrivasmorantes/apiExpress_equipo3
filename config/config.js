"use strict";

require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'ApiExpress',
    user: process.env.DB_USER || null,
    password: process.env.DB_PASSWORD || null,
    server: process.env.DB_HOST ? `${process.env.DB_HOST}:${process.env.DB_PORT}` : 'mongo:27017'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  api: {
    prefix: process.env.API_PREFIX || '/api',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  }
};

module.exports = config; 