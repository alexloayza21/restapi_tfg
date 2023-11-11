const { Schema, model } = require('mongoose');
const User = require('./User');
const Asiento = require('./Asiento').schema;

const reservaSchema = new Schema({
    fecha: String,
    hora_entrada: String,
    hora_salida: String,
    nombreAula: String,
    asientos: [Asiento],
    user: User
});

module.exports = model('reservas', reservaSchema);