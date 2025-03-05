const express = require("express");
const router = express.Router();
const { Usuario, Hotel, Habitacion, Reserva } = require("../../models/reserva");

router.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate("usuario_id", "nombre email telefono")
      .populate("hotel_id", "nombre direccion telefono")
      .populate("habitacion_id", "tipo capacidad precio_por_noche");

    const reservasFormateadas = reservas.map((reserva) => ({
      _id: reserva._id,
      usuario: reserva.usuario_id,
      hotel: reserva.hotel_id,
      habitacion: reserva.habitacion_id,
      fecha_inicio: reserva.fecha_inicio,
      fecha_fin: reserva.fecha_fin,
      precio_total: reserva.precio_total,
      estado: reserva.estado,
    }));

    res.json(reservasFormateadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reservas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id)
      .populate("usuario_id", "nombre email telefono")
      .populate("hotel_id", "nombre direccion telefono")
      .populate("habitacion_id", "tipo capacidad precio_por_noche");

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const reservaFormateada = {
      _id: reserva._id,
      usuario: reserva.usuario_id,
      hotel: reserva.hotel_id,
      habitacion: reserva.habitacion_id,
      fecha_inicio: reserva.fecha_inicio,
      fecha_fin: reserva.fecha_fin,
      precio_total: reserva.precio_total,
      estado: reserva.estado,
    };

    res.json(reservaFormateada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reservas/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const reservas = await Reserva.find({ usuario_id: id })
      .populate("usuario_id", "nombre email telefono")
      .populate("hotel_id", "nombre direccion telefono")
      .populate("habitacion_id", "tipo capacidad precio_por_noche");

    if (reservas.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron reservas para este usuario" });
    }

    const reservasFormateadas = reservas.map((reserva) => ({
      _id: reserva._id,
      usuario: reserva.usuario_id,
      hotel: reserva.hotel_id,
      habitacion: reserva.habitacion_id,
      fecha_inicio: reserva.fecha_inicio,
      fecha_fin: reserva.fecha_fin,
      precio_total: reserva.precio_total,
      estado: reserva.estado,
    }));

    res.json(reservasFormateadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/reservas", async (req, res) => {
  try {
    const { usuario_id, hotel_id, habitacion_id, fecha_inicio, fecha_fin } =
      req.body;

    const usuarioExiste = await Usuario.findById(usuario_id);
    if (!usuarioExiste)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const hotelExiste = await Hotel.findById(hotel_id);
    if (!hotelExiste)
      return res.status(400).json({ error: "Hotel no encontrado" });

    const habitacionExiste = await Habitacion.findById(habitacion_id);
    if (!habitacionExiste)
      return res.status(400).json({ error: "Habitación no encontrada" });

    if (habitacionExiste.hotel_id.toString() !== hotel_id) {
      return res
        .status(400)
        .json({ error: "La habitación no pertenece al hotel indicado" });
    }

    const diasReserva = Math.ceil(
      (new Date(fecha_fin) - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24)
    );
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

    await Usuario.findByIdAndUpdate(usuario_id, {
      $push: { historial_reservas: nuevaReserva._id }
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
