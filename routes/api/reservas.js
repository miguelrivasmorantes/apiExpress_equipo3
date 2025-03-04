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


router.post("/reservas", async (req, res) => {
  try {
    const { usuario_id, hotel_id, habitacion_id, fecha_inicio, fecha_fin } = req.body;

    const usuarioExiste = await Usuario.findById(usuario_id);
    if (!usuarioExiste) return res.status(400).json({ error: "Usuario no encontrado" });

    const hotelExiste = await Hotel.findById(hotel_id);
    if (!hotelExiste) return res.status(400).json({ error: "Hotel no encontrado" });

    const habitacionExiste = await Habitacion.findById(habitacion_id);
    if (!habitacionExiste) return res.status(400).json({ error: "Habitación no encontrada" });

    if (habitacionExiste.hotel_id.toString() !== hotel_id) {
      return res.status(400).json({ error: "La habitación no pertenece al hotel indicado" });
    }

    const diasReserva = Math.ceil((new Date(fecha_fin) - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24));
    const precio_total = diasReserva * habitacionExiste.precio_por_noche;

    const nuevaReserva = new Reserva({
      usuario_id,
      hotel_id,
      habitacion_id,
      fecha_inicio,
      fecha_fin,
      precio_total,
    });

    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
