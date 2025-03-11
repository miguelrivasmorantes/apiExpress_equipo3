const express = require("express");
const router = express.Router();

//Rutas para administrar hoteles

const hotelRouter = require("../modules/hotels/hotel.module")().HotelController;
router.use("/hoteles", hotelRouter);

//Rutas para administrar habitaciones

//Rutas para administrar usuarios

const userRouter = require("../modules/users/user.module")().UserController;
router.use("/usuarios", userRouter);

//Rutas para administrar reservas

//Rutas para administrar pagos

//Rutas para administrar reseñas

module.exports = router;
