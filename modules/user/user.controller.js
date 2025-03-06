(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var { Pago } = require('../../models/pago');
    var { Reserva } = require('../../models/reserva');
    var { Usuario } = require('../../models/usuario');
    var { Hotel } = require('../../models/hotel');

    var UserMiddleware = require('./user.module')().UserMiddleware;

    router.post('/',
        UserMiddleware.addUser,
        function (req, res) {
            res.status(201).json(req.response);
            
        });

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

    router.get('/:userId',
        UserMiddleware.getUserById,
        function (req, res) {
            res.status(200).json(req.response);
        });

router.put('/:UserId',
        UserMiddleware.modifyUser,
        function (req, res) {
            res.status(200).json(req.response);
        });


    router.delete('/:UserId',
        UserMiddleware.removeUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();
