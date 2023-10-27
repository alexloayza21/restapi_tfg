const { Schema, model } = require('mongoose');

const asientoSchema = new Schema({
    nombre: Number,
    fecha: Date,
    hora_entrada: String,
    hora_salida: String,
    estado: {
        type: String,
        enum: ['libre', 'ocupado', 'dudoso'],
        default: 'libre'
    }
});

module.exports = model('asientos', asientoSchema);