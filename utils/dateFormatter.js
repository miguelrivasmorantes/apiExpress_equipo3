"use strict";

const formatDate = (date) =>
  date && !isNaN(new Date(date))
    ? new Date(date).toLocaleDateString("es-ES", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : "Fecha no disponible";

const formatPaymentDates = (data) => {
  if (Array.isArray(data)) {
    return data.map((pago) => ({
      ...pago.toObject(),
      fecha_pago: formatDate(pago.fecha_pago),
      reserva_id: pago.reserva_id ? {
        ...pago.reserva_id.toObject(),
        fecha_inicio: formatDate(pago.reserva_id.fecha_inicio),
        fecha_fin: formatDate(pago.reserva_id.fecha_fin),
      } : null,
    }));
  }
  return data;
};

module.exports = {
  formatPaymentDates
};