var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel.model'); // Importamos el modelo

// Obtener todos los hoteles
router.get('/', async (req, res) => {
    try {
        const hoteles = await Hotel.find({});
        res.json(hoteles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un hotel por ID
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar un nuevo hotel
router.post('/', async (req, res) => {
    try {
        const nuevoHotel = new Hotel(req.body);
        const hotelGuardado = await nuevoHotel.save();
        res.status(201).json(hotelGuardado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar un hotel por ID
router.delete('/:id', async (req, res) => {
    try {
        const hotelEliminado = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotelEliminado) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }
        res.json({ message: 'Hotel eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
