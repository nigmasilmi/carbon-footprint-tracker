const mongoose = require('mongoose');

const ViajeSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true,
    },
    medio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medios',
        required: true,
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
    factor_conversion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medios'
    },
    huella_carbono_total: {
        type: Number,
    }


});

module.exports = mongoose.model('viaje', ViajeSchema);