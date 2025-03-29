const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const users = require('../users/user.model');
const hotels = require('../hotels/hotel.model');
const rooms = require('../rooms/room.model');

const ReservationSchema = new Schema({
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
        enum: ['confirmada', 'pendiente', 'cancelada'],
        required: true
    }
}, {
    timestamps: true,
});

const Reservation = mongoose.model("reservations", ReservationSchema);

module.exports = { Reservation };
