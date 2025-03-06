const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "El correo electrónico no es válido"], // Validación de email
    },
    phoneNumber: {
      type: String, // Cambiado a String para permitir números con formato internacional (+123456789)
      required: true,
      trim: true,
      match: [/^\+?\d{7,15}$/, "El número de teléfono no es válido"], // Validación básica de teléfono
    },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
