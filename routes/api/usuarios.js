const express = require('express');
const router = express.Router();
const { Pago } = require('../../models/pago');
const { Reserva } = require('../../models/reserva');
const { Usuario } = require('../../models/usuario');
const { Hotel } = require('../../models/hotel');

router.get('/:usuario_id/historial/pagos', async (req, res) => {
    try {
        const usuarioId = req.params.usuario_id;
        const pagos = await Pago.find({ usuario_id: usuarioId })
            .populate({
                path: 'reserva_id',
                model: Reserva,
                select: "hotel_id fecha_inicio fecha_fin",
                populate: {
                    path: "hotel_id",
                    model: Hotel,
                    select: "nombre servicios"
                }
            })
            .populate({
                path: 'usuario_id',
                model: Usuario,
                select: "email"
            })
            .select('fecha_pago monto metodo_pago');
        res.send(pagos)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;