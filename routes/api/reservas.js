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

router.get("/reservas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id)
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

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reservas/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const reservas = await Reserva.find({ usuario_id: id })
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

    if (reservas.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservas para este usuario" });
    }

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
