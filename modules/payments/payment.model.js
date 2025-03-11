const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
    reserva_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reservations",
      required: true,
    },
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    metodo_pago: {
      type: String,
      required: true,
    },
    fecha_pago: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["completado", "pendiente", "reembolsado"],
      required: true,
    },
});

const Payment = mongoose.model("payments", PaymentSchema);

module.exports = { Payment };
