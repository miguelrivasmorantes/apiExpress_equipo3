"use strict";

const PaymentService = require("./payment.module")().PaymentService;
const { formatPaymentDates } = require("../../utils/dateFormatter");

module.exports = {
  getPayments: getPayments,
  getPaymentsByUserId: getPaymentsByUserId,
  getPaymentsByReservationId: getPaymentsByReservationId,
  formatPaymentDates: formatPaymentDatesMiddleware,
  getLastPaymentByUserId: getLastPaymentByUserId,
  getTotalPaymentsByUserId: getTotalPaymentsByUserId,
  confirmPayment: confirmPaymentMiddleware,
  createPendingPaymentMiddleware: createPendingPaymentMiddleware,
};

async function handleRequest(serviceFunction, req, res, next, ...params) {
  try {
    req.response = await serviceFunction(...params);
    next();
  } catch (error) {
    next(error);
  }
}

function getPayments(req, res, next) {
  handleRequest(PaymentService.fetchPayments, req, res, next);
}

function getPaymentsByUserId(req, res, next) {
  handleRequest(
    PaymentService.fetchPaymentByUserId,
    req,
    res,
    next,
    req.params.usuario_id,
  );
}

function getPaymentsByReservationId(req, res, next) {
  handleRequest(
    PaymentService.fetchPaymentByReservationId,
    req,
    res,
    next,
    req.params.reserva_id,
  );
}

function getLastPaymentByUserId(req, res, next) {
  handleRequest(
    PaymentService.fetchLastPaymentByUserId,
    req,
    res,
    next,
    req.params.usuario_id,
  );
}

function getTotalPaymentsByUserId(req, res, next) {
  handleRequest(
    PaymentService.fetchTotalPaymentsByUserId,
    req,
    res,
    next,
    req.params.usuario_id,
  );
}

function formatPaymentDatesMiddleware(req, res, next) {
  handleRequest(formatPaymentDates, req, res, next, req.response);
}

function confirmPaymentMiddleware(req, res, next) {
  const { pago_id } = req.params;
  const { metodo_pago } = req.body;
  const { fecha_pago } = req.body;

  if (!pago_id || !/^[0-9a-fA-F]{24}$/.test(pago_id)) {
    return res.status(400).json({ message: "El ID de pago no es válido" });
  }

  handleRequest(PaymentService.confirmPayment, req, res, next, pago_id, metodo_pago, fecha_pago);
}

function createPendingPaymentMiddleware(req, res, next) {
  const { reserva_id } = req.params;
  const metodo_pago = req.body.metodo_pago;

  handleRequest(
    PaymentService.createPendingPayment,
    req,
    res,
    next,
    reserva_id,
    metodo_pago,
  );
}
