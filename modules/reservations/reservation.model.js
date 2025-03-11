const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('../users/user.model');
const Hotel = require('../hotels/hotel.model');
const Room = require('../rooms/room.model');

const ReservationSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    habitacion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    precio_total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['confirmada', 'pendiente', 'cancelada'],
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Reservation', ReservationSchema);
