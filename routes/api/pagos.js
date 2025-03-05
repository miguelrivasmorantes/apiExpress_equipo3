const express = require('express');
const router = express.Router();
const { Pago } = require('../../models/pago');
const { Reserva } = require('../../models/reserva');
const { Usuario } = require('../../models/usuario');
const { Hotel } = require('../../models/hotel');

router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.find()
            .populate({
                path: 'reserva_id',
                model: Reserva,
                select: "fecha_inicio fecha_fin precio_total"
            })
        res.send(pagos);
    } catch (error) {
        res.status(500).send
    }
});

router.get('/historial', async (req, res) => {
    try {
        const pago = await Pago.find()
            .populate({
                path: 'reserva_id',
                model: Reserva,
                select: " hotel_id fecha_inicio fecha_fin",
                populate: {
                    path: "hotel_id",
                    model: Hotel,
                    select: "nombre servicios"
                }
            })
            .populate({
                path: 'usuario_id',
                model: Usuario,
                select: "nombre email"
            })
            .select('fecha_pago monto metodo_pago');
        res.send(pago);
    } catch (error) {
        res.status(500).send
    }
});

router.post('/', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.body.reserva_id);
        if (!reserva) return res.status(400).send('Reserva no encontrada');

        const usuario = await Usuario.findById(req.body.usuario_id);
        if (!usuario) return res.status(400).send('Usuario no encontrado');

        const pago = new Pago({
            reserva_id: req.body.reserva_id,
            fecha_pago: req.body.fecha_pago,
            monto: req.body.monto,
            metodo_pago: req.body.metodo_pago,
            usuario_id: req.body.usuario_id,
            estado: req.body.estado
        });

        const result = await pago.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;