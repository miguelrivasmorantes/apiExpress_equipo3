"use strict";

const PaymentService = require("./payment.module")().PaymentService;

module.exports = {
  addPayment: addPayment,
  getPayments: getPayments,
  getPaymentsByUserId: getPaymentsByUserId,
  getPaymentsByReservationId: getPaymentsByReservationId,
  formatPaymentDates: formatPaymentDates,
};

async function handleRequest(serviceFunction, req, res, next, ...params) {
  try {
    req.response = await serviceFunction(...params);
    next();
  } catch (error) {
    next(error);
  }
}

function addPayment(req, res, next) {
  handleRequest(PaymentService.createPayment, req, res, next, req.body);
}

function getPayments(req, res, next) {
  handleRequest(PaymentService.fetchPayments, req, res, next);
}

function getPaymentsByUserId(req, res, next) {
  handleRequest(
    PaymentService.fetchPaymentByUserId, req, res, next, req.params.usuario_id);
}

function getPaymentsByReservationId(req, res, next) {
  handleRequest(PaymentService.fetchPaymentByReservationId, req, res, next, req.params.reserva_id);
}

const formatDate = (date) =>
  date && !isNaN(new Date(date))
    ? new Date(date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
    : "Fecha no disponible";

function formatPaymentDates(req, res, next) {
  if (Array.isArray(req.response)) {
    req.response = req.response.map((pago) => ({
      ...pago.toObject(),
      fecha_pago: formatDate(pago.fecha_pago),
      reserva_id: {
        ...pago.reserva_id?.toObject(),
        fecha_inicio: formatDate(pago.reserva_id?.fecha_inicio),
        fecha_fin: formatDate(pago.reserva_id?.fecha_fin),
      },
    }));
  }

  next();
}




