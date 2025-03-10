"use strict";

const PaymentService = require("./payment.module")().PaymentService;
const { formatPaymentDates } = require("../../utils/dateFormatter");

module.exports = {
  addPayment: addPayment,
  getPayments: getPayments,
  getPaymentsByUserId: getPaymentsByUserId,
  getPaymentsByReservationId: getPaymentsByReservationId,
  formatPaymentDates: formatPaymentDatesMiddleware,
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

function formatPaymentDatesMiddleware(req, res, next) {
  handleRequest(formatPaymentDates, req, res, next, req.response);
}




