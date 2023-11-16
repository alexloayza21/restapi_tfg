const { Schema, model } = require('mongoose');
const Aula = require('./Aula').schema;

const escuelaSchema = new Schema({
    nombreEscuela: String,
    direccion: String,
    ciudad: String,
    codigo_postal: String,
    provincia: String,
    imagen: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('escuelas', escuelaSchema);