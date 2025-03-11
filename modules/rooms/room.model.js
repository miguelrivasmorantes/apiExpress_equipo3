const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels",
    required: true,
  },
  tipo: String,
  capacidad: Number,
  precio_por_noche: Number,
  disponibilidad: Boolean,
});

const Room = mongoose.model("rooms", RoomSchema);

module.exports = { Room };
