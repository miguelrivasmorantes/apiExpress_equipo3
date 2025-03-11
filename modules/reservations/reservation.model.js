const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    habitacion_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    precio_total: { type: Number, required: true },
    estado: {
      type: String,
      enum: ["confirmada", "cancelada", "pendiente"],
      default: "pendiente",
    },
  });

  const Reservation = mongoose.model("reservations", ReservationSchema);

  module.exports = { Reservation };
