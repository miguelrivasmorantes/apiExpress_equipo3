const express = require('express');
const router = express.Router();
const { Pago } = require('../../models/pago');

router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.find();
        res.send(pagos);
    } catch (error) {
        res.status(500).send
    }
});

module.exports = router;