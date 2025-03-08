const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  historial_reservas: [
    { type: mongoose.Schema.Types.ObjectId, ref: "reservations" },
  ],
});

const User = mongoose.model("users", UserSchema);

module.exports = { User };
