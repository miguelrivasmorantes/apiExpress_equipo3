(function () {
  "use strict";

  module.exports = {
    createReservation: createReservation,
    fetchReservations: fetchReservations,
    fetchReservationById: fetchReservationById,
    fetchReservationsByUserId: fetchReservationsByUserId,
  };

  const { Reservation } = require("./reservation.model");
  const { User } = require("../users/user.model");
  const { Room } = require("../rooms/room.model");
  const { Hotel } = require("../hotels/hotel.model");

  function createReservation(reservation) {
    return Promise.all([
      User.findById(reservation.usuario_id),
      Hotel.findById(reservation.hotel_id),
      Room.findById(reservation.habitacion_id),
      Reservation.findOne({
        habitacion_id: reservation.habitacion_id,
        $or: [
          { fecha_inicio: { $lt: reservation.fecha_fin }, fecha_fin: { $gt: reservation.fecha_inicio } }
        ]
      })
    ])
    .then(([usuario, hotel, habitacion, reservaExistente]) => {
      const errores = [];
  
      if (!usuario) errores.push("Usuario no encontrado");
      if (!hotel) errores.push("Hotel no encontrado");
      if (!habitacion) errores.push("Habitación no encontrada");
      if (habitacion && habitacion.hotel_id.toString() !== reservation.hotel_id) {
        errores.push("La habitación no pertenece al hotel indicado");
      }
      if (reservaExistente) {
        errores.push("La habitación ya está reservada en las fechas seleccionadas");
      }
  
      if (errores.length > 0) throw new Error(errores.join(" | "));
  
        const diasReserva = Math.ceil(
          (new Date(reservation.fecha_fin) - new Date(reservation.fecha_inicio)) / (1000 * 60 * 60 * 24)
        );
        const precio_total = diasReserva * habitacion.precio_por_noche;
  
        return Reservation.create({
          usuario_id: reservation.usuario_id,
          hotel_id: reservation.hotel_id,
          habitacion_id: reservation.habitacion_id,
          fecha_inicio: reservation.fecha_inicio,
          fecha_fin: reservation.fecha_fin,
          precio_total,
          estado: reservation.estado,
        });
      })
      .then(nuevaReserva => {
        return User.findByIdAndUpdate(reservation.usuario_id, {
          $push: { historial_reservas: nuevaReserva._id },
        }).then(() => nuevaReserva);
      });
  }
  
  
  function fetchReservations() {
    return Reservation.find()
        .populate("usuario_id", "nombre email telefono")
        .populate("hotel_id", "nombre direccion telefono")
        .populate("habitacion_id", "tipo capacidad precio_por_noche")
        .then((reservas) => reservas.map((reserva) => ({
            _id: reserva._id,
            usuario: reserva.usuario_id,
            hotel: reserva.hotel_id,
            habitacion: reserva.habitacion_id,
            fecha_inicio: reserva.fecha_inicio,
            fecha_fin: reserva.fecha_fin,
            precio_total: reserva.precio_total,
            estado: reserva.estado,
        })));
  }  
    
  function fetchReservationById(reservationId) {
    return Reservation.findById(reservationId)
      .populate("usuario_id", "nombre email telefono")
      .populate("hotel_id", "nombre direccion telefono")
      .populate("habitacion_id", "tipo capacidad precio_por_noche")
      .then(reserva => {
        if (!reserva) throw new Error("Reserva no encontrada");
  
        return {
          _id: reserva._id,
          usuario: reserva.usuario_id,
          hotel: reserva.hotel_id,
          habitacion: reserva.habitacion_id,
          fecha_inicio: reserva.fecha_inicio,
          fecha_fin: reserva.fecha_fin,
          precio_total: reserva.precio_total,
          estado: reserva.estado,
        };
      });
  }

  function fetchReservationsByUserId(userId) {
    return Reservation.find({ usuario_id: userId })
      .populate("usuario_id", "nombre email telefono")
      .populate("hotel_id", "nombre direccion telefono")
      .populate("habitacion_id", "tipo capacidad precio_por_noche")
      .then(reservas => {
        if (reservas.length === 0) throw new Error("No se encontraron reservas para este usuario");
  
        return reservas.map(reserva => ({
          _id: reserva._id,
          usuario: reserva.usuario_id,
          hotel: reserva.hotel_id,
          habitacion: reserva.habitacion_id,
          fecha_inicio: reserva.fecha_inicio,
          fecha_fin: reserva.fecha_fin,
          precio_total: reserva.precio_total,
          estado: reserva.estado,
        }));
      });
  }
})();
