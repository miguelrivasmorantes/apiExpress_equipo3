(function () {
  "use strict";

  module.exports = {
    createReservation: createReservation,
    fetchReservations: fetchReservations,
    fetchReservationById: fetchReservationById,
    fetchReservationsByUserId: fetchReservationsByUserId,
    updateReservation: updateReservation,
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

  function updateReservation(reservationId, updatedData) {
    return Reservation.findById(reservationId)
      .then((reservaExistente) => {
        if (!reservaExistente) {
          throw new Error("Reserva no encontrada");
        }
  
        const usuarioAnteriorId = reservaExistente.usuario_id.toString();
  
        const nuevaReserva = {
          usuario_id: updatedData.usuario_id || reservaExistente.usuario_id,
          hotel_id: updatedData.hotel_id || reservaExistente.hotel_id,
          habitacion_id: updatedData.habitacion_id || reservaExistente.habitacion_id,
          fecha_inicio: updatedData.fecha_inicio || reservaExistente.fecha_inicio,
          fecha_fin: updatedData.fecha_fin || reservaExistente.fecha_fin,
          estado: updatedData.estado || reservaExistente.estado,
        };
  
        return Promise.all([
          User.findById(nuevaReserva.usuario_id),
          Hotel.findById(nuevaReserva.hotel_id),
          Room.findById(nuevaReserva.habitacion_id),
          Reservation.findOne({
            habitacion_id: nuevaReserva.habitacion_id,
            _id: { $ne: reservationId },
            $and: [
              { fecha_inicio: { $lt: nuevaReserva.fecha_fin } },
              { fecha_fin: { $gt: nuevaReserva.fecha_inicio } },
            ],
          }),
        ]).then(([usuario, hotel, habitacion, conflictoReserva]) => {
          const errores = [];
  
          if (!usuario) errores.push("Usuario no encontrado");
          if (!hotel) errores.push("Hotel no encontrado");
          if (!habitacion) errores.push("Habitación no encontrada");
  
          if (updatedData.hotel_id || updatedData.habitacion_id) {
            if (habitacion && habitacion.hotel_id.toString() !== nuevaReserva.hotel_id.toString()) {
              errores.push("La habitación no pertenece al hotel indicado");
            }
          }
  
          if (conflictoReserva) {
            errores.push("La habitación ya está reservada en las fechas seleccionadas");
          }
  
          if (errores.length > 0) throw new Error(errores.join(" | "));
  
          const diasReserva = Math.ceil(
            (new Date(nuevaReserva.fecha_fin) - new Date(nuevaReserva.fecha_inicio)) / (1000 * 60 * 60 * 24)
          );
          const precio_total = diasReserva * habitacion.precio_por_noche;
  
          return Reservation.findByIdAndUpdate(
            reservationId,
            { ...nuevaReserva, precio_total },
            { new: true }
          ).then((reservaActualizada) => {
            if (!reservaActualizada) throw new Error("Error al actualizar la reserva");
  
            if (usuarioAnteriorId !== nuevaReserva.usuario_id.toString()) {
              return Promise.all([
                User.findByIdAndUpdate(usuarioAnteriorId, {
                  $pull: { historial_reservas: reservationId },
                }),
                User.findByIdAndUpdate(nuevaReserva.usuario_id, {
                  $addToSet: { historial_reservas: reservationId },
                }),
              ]).then(() => reservaActualizada);
            } else {
              return User.findByIdAndUpdate(nuevaReserva.usuario_id, {
                $addToSet: { historial_reservas: reservationId },
              }).then(() => reservaActualizada);
            }
          });
        });
      });
  }
  
})();
