const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema({
    reserva_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserva",
        required: true
    },
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    metodo_pago: {
        type: String,
        required: true
    },
    fecha_pago: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        required: true
    }
});

const Pago = mongoose.model("Pago", PagoSchema);

module.exports = { Pago };