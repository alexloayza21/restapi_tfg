const { Schema, model } = require('mongoose');
const Asiento = require('./Asiento').schema;

const aulaSchema = new Schema({
    nombreAula: String,
    hora_entrada: String,
    hora_salida: String,
    mediaHora: Boolean,
    idEscuela: String,
    asientos: [Asiento]
});

module.exports = model('aulas', aulaSchema);