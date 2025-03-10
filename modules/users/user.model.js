const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

  password: {
  type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  const User = mongoose.model('users', UserSchema);
  
  module.exports = { User };