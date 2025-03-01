const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    descripcion: { type: String },
    servicios: { type: [String] },
    estrellas: { type: Number, min: 1, max: 5 }
}, { collection: 'hoteles' });

module.exports = hotelSchema;
