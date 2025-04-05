"use strict";

const { Payment } = require("./payment.model");
const { User } = require("../users/user.model");
const { Reservation } = require("../reservations/reservation.model");
const { Hotel } = require("../hotels/hotel.model");
const { Room } = require("../rooms/room.model");
const mongoose = require("mongoose");

module.exports = {
  fetchPayments,
  fetchPaymentByUserId,
  fetchPaymentByReservationId,
  fetchLastPaymentByUserId,
  fetchTotalPaymentsByUserId,
  confirmPayment,
  createPendingPayment,
};

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
      select:
        "habitacion_id hotel_id fecha_inicio fecha_fin precio_total estado",
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
  return Payment.find({ usuario_id, estado: "completado" })
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

function fetchTotalPaymentsByUserId(usuario_id) {
  return Payment.aggregate([
    {
      $match: { usuario_id: new mongoose.Types.ObjectId(usuario_id) },
    },
    {
      $group: {
        _id: "$usuario_id",
        totalPagos: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        usuario_id: "$_id",
        totalPagos: 1,
      },
    },
  ]).then((result) => {
    if (result.length > 0) {
      return result[0];
    } else {
      return { usuario_id, totalPagos: 0 };
    }
  });
}

async function createPendingPayment(reserva_id, metodo_pago) {
  if (!reserva_id || !metodo_pago) {
    throw new Error("Faltan datos requeridos para crear el pago");
  }

  const reserva = await Reservation.findById(reserva_id);
  if (!reserva) {
    throw new Error("La reserva no existe");
  }

  if (!reserva.usuario_id || !reserva.precio_total) {
    throw new Error("La reserva no tiene usuario o precio total");
  }

  const newPayment = {
    reserva_id: reserva._id,
    usuario_id: reserva.usuario_id,
    estado: "pendiente",
    monto: reserva.precio_total,
    metodo_pago,
    fecha_pago: new Date(),
  };

  return await Payment.create(newPayment);
}

async function confirmPayment(pago_id, metodo_pago) {
  try {
    const payment = await Payment.findOne({ _id: pago_id });

    const reserva = await Reservation.findOne({ _id: payment.reserva_id });

    if (!reserva) {
      throw new Error("La reserva no existe");
    }

    if (!payment) {
      throw new Error("El pago no existe");
    }

    payment.estado = "completado";
    payment.metodo_pago = metodo_pago;
    payment.fecha_pago = new Date();
    reserva.estado = "confirmada";
    
    await reserva.save();
    await payment.save();

    return payment;

  } catch (error) {
    throw new Error("Error al confirmar el pago: " + error.message);
  }
}
