const express = require("express");
const router = express.Router();

const holaMundoRouter = require("./api/holaMundo");
router.use("/", holaMundoRouter);


//Rutas para administrar hoteles

//Rutas para administrar habitaciones

//Rutas para administrar usuarios

const usuarioRouter = require("./api/usuarios");
router.use("/usuarios", usuarioRouter);

const userRouter = require('../modules/user/user.module')().UserController;
router.use("/users", userRouter);

//Rutas para administrar reservas

//Rutas para administrar pagos

const pagoRouter = require("./api/pagos");
router.use("/pagos", pagoRouter);

//Rutas para administrar reseñas

module.exports = router;
