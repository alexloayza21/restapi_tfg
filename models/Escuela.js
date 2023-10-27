const { Schema, model } = require('mongoose');
const Aula = require('./Aula');

const escuelaSchema = new Schema({
    nombre: String,
    direccion: String,
    ciudad: String,
    codigo_postal: String,
    provincia: String,
    aulas: [Aula]
});

module.exports = model('escuelas', escuelaSchema);