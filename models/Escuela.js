const { Schema, model } = require('mongoose');
const Aula = require('./Aula').schema;

const escuelaSchema = new Schema({
    nombreEscuela: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: false
    },
    codigo_postal: {
        type: String,
        required: false
    },
    provincia: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    },
    aulas: [Aula],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('escuelas', escuelaSchema);