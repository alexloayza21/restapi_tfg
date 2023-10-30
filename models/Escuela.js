const { Schema, model } = require('mongoose');
const Aula = require('./Aula').schema;

const escuelaSchema = new Schema({
    idEscuela: {
        type: String,
        required: true
    },
    nombreEscuela: String,
    direccion: String,
    ciudad: String,
    codigo_postal: String,
    provincia: String,
    aulas: [Aula]
});

module.exports = model('escuelas', escuelaSchema);