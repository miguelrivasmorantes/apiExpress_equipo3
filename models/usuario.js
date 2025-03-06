const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: String,
    historial_reservas: [
      { type: mongoose.Schema.Types.ObjectId, ref: "reservas" },
    ],
  });

  const Usuario = mongoose.model("usuarios", UsuarioSchema);

  module.exports = { Usuario };