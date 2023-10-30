const { Schema, model } = require('mongoose');
const User = require('./User').schema;
const Asiento = require('./Asiento').schema;

const reservaSchema = new Schema({
    fecha: Date,
    hora_entrada: String,
    hora_salida: String,
    asientos: [Asiento],
    user: User
});

module.exports = model('reservas', reservaSchema);