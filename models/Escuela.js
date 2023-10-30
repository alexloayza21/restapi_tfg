const { Schema, model } = require('mongoose');
const Aula = require('./Aula').schema;

const escuelaSchema = new Schema({
    idEscuela: {
        type: String,
        required: true
    },
    nombreEscuela: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    codigo_postal: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    aulas: [Aula]
});

module.exports = model('escuelas', escuelaSchema);