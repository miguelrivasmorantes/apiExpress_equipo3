const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    servicios: [{
      type: String,
      required: true
    }],
    estrellas: {
      type: Number,
      required: true
    },
});

const Hotel = mongoose.model('hotels', HotelSchema);

module.exports = { Hotel };