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

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  historial_reservas: [
    { type: mongoose.Schema.Types.ObjectId, ref: "reservations" },
  ],
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await hashPassword(this.password);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    try {
      update.password = await hashPassword(update.password);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('users', UserSchema);
  
  module.exports = { User };
