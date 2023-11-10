const { Schema, model } = require('mongoose');
const Aula = require('./Aula').schema;

const escuelaSchema = new Schema({
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