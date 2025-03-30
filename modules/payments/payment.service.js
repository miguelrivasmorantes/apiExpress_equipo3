"use strict";

const { Payment } = require("./payment.model");
const { User } = require("../users/user.model");
const { Reservation } = require("../reservations/reservation.model");
const { Hotel } = require("../hotels/hotel.model");
const { Room } = require("../rooms/room.model");

module.exports = {
  createPayment,
  fetchPayments,
  fetchPaymentByUserId,
  fetchPaymentByReservationId,
  fetchLastPaymentByUserId,
};

function createPayment(payment) {
  return Payment.create(payment);
}

function fetchPayments() {
  return Payment.find()
    .populate({
      path: "usuario_id",
      model: User,
      select: "nombre email",
    })
    .populate({
      path: "reserva_id",
      model: Reservation,
      select: "fecha_inicio fecha_fin hotel_id",
      populate: {
        path: "hotel_id",
        model: Hotel,
        select: "nombre",
      },
    })
    .select("fecha_pago monto metodo_pago estado");
}

function fetchPaymentByUserId(usuario_id) {
  return Payment.find({ usuario_id })
    .populate({
      path: "reserva_id",
      model: Reservation,
      select: "fecha_inicio fecha_fin hotel_id",
      populate: {
        path: "hotel_id",
        model: Hotel,
        select: "nombre",
      },
    })
    .populate({
      path: "usuario_id",
      model: User,
      select: "nombre email telefono",
    })
    .select("fecha_pago monto metodo_pago estado");
}

function fetchPaymentByReservationId(reserva_id) {
  return Payment.find({ reserva_id })
    .populate({
      path: "reserva_id",
      model: Reservation,
      select: "habitacion_id hotel_id fecha_inicio fecha_fin precio_total estado",
      populate: [
        { path: "hotel_id", model: Hotel, select: "nombre" },
        { path: "habitacion_id", model: Room, select: "tipo capacidad" },
      ],
    })
    .populate({
      path: "usuario_id",
      model: User,
      select: "nombre email telefono",
    })
    .select("fecha_pago monto metodo_pago estado");
}

function fetchLastPaymentByUserId(usuario_id) {
  return Payment.find({ usuario_id, estado: "completado"})
    .populate({
      path: "usuario_id",
      model: User,
      select: "nombre email telefono",
    })
    .select("fecha_pago monto metodo_pago estado")
    .sort({ fecha_pago: -1 })
    .limit(1)
    .then((payments) => {
      if (payments.length > 0) {
        return payments[0];
      } else {
        return null;
      }
    });
}
