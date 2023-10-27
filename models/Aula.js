const { Schema, model } = require('mongoose');
const Asiento = require('./Asiento');

const aulaSchema = new Schema({
    nombre: String,
    asientos: [Asiento]
});

module.exports = model('aulas', aulaSchema);