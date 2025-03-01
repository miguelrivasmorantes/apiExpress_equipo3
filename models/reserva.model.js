const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true },
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'hoteles', required: true },
    habitacion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'habitaciones', required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    precio_total: { type: Number, required: true },
    estado: { type: String, enum: ['confirmada', 'cancelada', 'pendiente'], default: 'pendiente' }
});

module.exports = mongoose.model('reservas', ReservaSchema);
