const mongoose = require("mongoose");

// Definir el esquema para el modelo
const esquemaModelo = new mongoose.Schema(
  {
    // Definir aquí los campos del modelo, con su tipo y opciones
    // Ejemplo:
    // campo1: { type: String, required: true },
    // campo2: { type: Number, default: 0 },
    // campo3: { type: Date, required: true }
  },
  {
    timestamps: true, 
  }
);

// Crear el modelo con el esquema definido
const NombreModelo = mongoose.model("NombreModelo", esquemaModelo);

module.exports = NombreModelo;
