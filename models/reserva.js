const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  historial_reservas: [
    { type: mongoose.Schema.Types.ObjectId, ref: "reservas" },
  ],
});

const HotelSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  email: String,
  descripcion: String,
  servicios: [String],
  estrellas: Number,
});

const HabitacionSchema = new mongoose.Schema({
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hoteles",
    required: true,
  },
  tipo: String,
  capacidad: Number,
  precio_por_noche: Number,
  disponibilidad: Boolean,
});

const ReservaSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hoteles",
    required: true,
  },
  habitacion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "habitaciones",
    required: true,
  },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  precio_total: { type: Number, required: true },
  estado: {
    type: String,
    enum: ["confirmada", "cancelada", "pendiente"],
    default: "pendiente",
  },
});

const Usuario = mongoose.model("usuarios", UsuarioSchema);
const Hotel = mongoose.model("hoteles", HotelSchema);
const Habitacion = mongoose.model("habitaciones", HabitacionSchema);
const Reserva = mongoose.model("reservas", ReservaSchema);

module.exports = { Usuario, Hotel, Habitacion, Reserva };
