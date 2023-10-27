const { Schema, model } = require('mongoose');
const User = require('./User');
const Asiento = require('./Asiento');

const reservaSchema = new Schema({
    fecha: Date,
    hora_entrada: String,
    hora_salida: String,
    asientos:[Asiento],
    child: User
});

module.exports = model('reservas', reservaSchema);