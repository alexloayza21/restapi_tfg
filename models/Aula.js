const { Schema, model } = require('mongoose');
const Asiento = require('./Asiento').schema;

const aulaSchema = new Schema({
    idAula: String,
    nombreAula: String,
    idEscuela: {
        type: String,
        required: true
    },
    asientos: [Asiento]
});

module.exports = model('aulas', aulaSchema);