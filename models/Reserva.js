const { Schema, model } = require('mongoose');
const User = require('./User');
const Asiento = require('./Asiento').schema;

const reservaSchema = new Schema({
    fecha: String,
    hora_entrada: String,
    hora_salida: String,
    nombreAula: String,
    asientos: [Asiento],
    idEscuela: String,
    userName: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('reservas', reservaSchema);