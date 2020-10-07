const mongoose = require('mongoose');

const MedioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    factor_de_conversion: {
        type: Number,
        required: true,
    }


});

module.exports = mongoose.model('medio', MedioSchema);