const { Schema, model } = require('mongoose');

const asientoSchema = new Schema({
    numeroAsiento: Number,
    hora_entrada: String,
    hora_salida: String,
}); 

module.exports = model('asientos', asientoSchema);