const express = require("express");
const router = express.Router();

const holaMundoRouter = require("./api/holaMundo");
router.use("/", holaMundoRouter);



//Rutas para administrar hoteles

//Rutas para administrar habitaciones

//Rutas para administrar usuarios

//Rutas para administrar reservas
const reservasRouter = require("./api/reservas");
router.use("/", reservasRouter);

//Rutas para administrar pagos

//Rutas para administrar reseñas

module.exports = router;
