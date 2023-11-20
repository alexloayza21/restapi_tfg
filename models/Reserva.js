const { Schema, model } = require('mongoose');
const Asiento = require('./Asiento').schema;

const reservaSchema = new Schema({
    fecha: String,
    hora_entrada: String,
    hora_salida: String,
    nombreAula: String,
    asientos: [Asiento],
    username: String,
    nombreEscuela: String,
    idEscuela: {
        type: Schema.Types.ObjectId,
        ref: 'escuelas'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('reservas', reservaSchema);