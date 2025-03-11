const express = require("express");
const router = express.Router();

//Rutas para administrar hoteles

//Rutas para administrar habitaciones

//Rutas para autenticación
const authRouter = require("../modules/auth/auth.controller");
router.use("/auth", authRouter);

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

module.exports = router;
