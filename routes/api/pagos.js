const express = require('express');
const router = express.Router();
const { Pago } = require('../../models/pago');
const { Reserva } = require('../../models/reserva');
const { Usuario } = require('../../models/usuario');

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