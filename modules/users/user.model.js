const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

  nombre: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  telefono: {
    type: String,
    required: true,
  },

  historial_reservas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "reservations",
    required: true,
}],
});

const User = mongoose.model("users", UserSchema);

module.exports = { User };
