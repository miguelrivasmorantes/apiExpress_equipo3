const express = require("express");
const router = express.Router();
const { Usuario, Hotel, Habitacion, Reserva } = require("../../models/reserva");

router.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate({
        path: "usuario_id",
        model: Usuario,
        select: "nombre email telefono",
      })
      .populate({
        path: "hotel_id",
        model: Hotel,
        select: "nombre direccion telefono",
      })
      .populate({
        path: "habitacion_id",
        model: Habitacion,
        select: "tipo capacidad precio_por_noche",
      });

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
