const mongoose = require('mongoose');

const ViajeSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    usuario_name: {
        type: String
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true,
    },
    medio_name: {
        type: String
    },
    kms: {
        type: Number,
        required: true

    },
    numero_viajeros: {
        type: Number
    },
    ida_y_vuelta: {
        type: String,
        required: true
    },
    fecha_viaje: {
        type: Date,
        required: true
    },
    huella_carbono_total: {
        type: Number,
    }


});

module.exports = mongoose.model('viaje', ViajeSchema);