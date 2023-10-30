const { Schema, model } = require('mongoose');

const asientoSchema = new Schema({
    numeroAsiento: Number,
    fecha: Date,
    hora_entrada: String,
    hora_salida: String,
    estado: {
        type: String,
        enum: ['libre', 'ocupado', 'dudoso'],
        default: 'libre'
    },
    idAula: {
        type: String, 
        required: true
    }
}); 

module.exports = model('asientos', asientoSchema);