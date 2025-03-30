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
  payReservation: payReservationMiddleware,
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
    req.params.usuario_id
  );
}

function getPaymentsByReservationId(req, res, next) {
  handleRequest(
    PaymentService.fetchPaymentByReservationId,
    req,
    res,
    next,
    req.params.reserva_id
  );
}

function getLastPaymentByUserId(req, res, next) {
  handleRequest(
    PaymentService.fetchLastPaymentByUserId,
    req,
    res,
    next,
    req.params.usuario_id
  );
}

function getTotalPaymentsByUserId(req, res, next) {
  handleRequest(
    PaymentService.fetchTotalPaymentsByUserId,
    req,
    res,
    next,
    req.params.usuario_id
  );
}

function formatPaymentDatesMiddleware(req, res, next) {
  handleRequest(formatPaymentDates, req, res, next, req.response);
}

function payReservationMiddleware(req, res, next) {
  const { reserva_id } = req.params;
  const paymentData = req.body;

  handleRequest(
    PaymentService.payReservation,
    req,
    res,
    next,
    reserva_id,
    paymentData
  );
}
