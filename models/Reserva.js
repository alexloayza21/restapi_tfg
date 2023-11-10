const { Schema, model } = require('mongoose');
const User = require('./User').schema;
const Asiento = require('./Asiento').schema;

const reservaSchema = new Schema({
    fecha: String,
    hora_entrada: String,
    hora_salida: String,
    asientos: [Asiento],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('reservas', reservaSchema);