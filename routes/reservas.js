const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reserva = require('../models/reserva.model');

// Definir modelos temporales sin necesidad de archivos separados
const Usuario = mongoose.model('usuarios', new mongoose.Schema({ nombre: String, email: String, telefono: String }));
const Hotel = mongoose.model('hoteles', new mongoose.Schema({ nombre: String, direccion: String, telefono: String, estrellas: Number }));
const Habitacion = mongoose.model('habitaciones', new mongoose.Schema({ tipo: String, capacidad: Number, precio_por_noche: Number }));

// ✅ Obtener todas las reservas con los datos completos
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find()
            .populate({ path: 'usuario_id', model: Usuario, select: 'nombre email telefono' })
            .populate({ path: 'hotel_id', model: Hotel, select: 'nombre direccion telefono estrellas' })
            .populate({ path: 'habitacion_id', model: Habitacion, select: 'tipo capacidad precio_por_noche' });

        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
