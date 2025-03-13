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

const reservationRouter = require("../modules/reservations/reservation.module")().ReservationController;
router.use("/reservas", reservationRouter);

//Rutas para administrar pagos
const paymentRouter = require("../modules/payments/payment.module")().PaymentController;
router.use("/pagos", paymentRouter);

//Rutas para administrar reseñas

const loginRouter = require("../modules/auth/auth.controller")
router.use("/auth", loginRouter);

module.exports = router;
