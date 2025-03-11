const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    email: String,
    descripcion: String,
    servicios: [String],
    estrellas: Number,
});

const Hotel = mongoose.model('hotels', HotelSchema);

module.exports = { Hotel };