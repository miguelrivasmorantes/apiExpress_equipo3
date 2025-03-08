(function () {
  "use strict";

  module.exports = {
    createPayment: createPayment,
    fetchPayments: fetchPayments,
    fetchPaymentById: fetchPaymentById,
    fetchPaymentByUser: fetchPaymentByUser,
    fetchPaymentByReservationId: fetchPaymentByReservationId,
  };

  const { Payment } = require("./payment.model");
  const { User } = require("../users/user.model");
  const { Reservation } = require("../reservations/reservation.model");
  const { Hotel } = require("../hotels/hotel.model");

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
          select: "nombre"
        }
      })
      .select("fecha_pago monto metodo_pago");
      console.log(Payment);
  }

  function fetchPaymentById(paymentId) {
    return Payment.findById(paymentId).exec();
  }

  async function fetchPaymentByUser(usuario_id) {
    try {
      const pagos = await Payment.find({ usuario_id: usuario_id })
        .populate({
          path: "usuario_id",
          model: User,
          select: "nombre email"
        })
        .populate({
          path: "reserva_id",
          model: Reservation,
          select: "fecha_inicio fecha_fin hotel_id",
          populate: {
            path: "hotel_id",
            model: Hotel,
            select: "nombre"
          }
        })
        .select("fecha_pago monto metodo_pago");
      return pagos;
    } catch (error) {
      throw error;
    }
  }

  function fetchPaymentByReservationId(reservationId) {
    return Payment.find({ reserva_id: reservationId }).exec();
  }
})();