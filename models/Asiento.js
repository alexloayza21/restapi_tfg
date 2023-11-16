const { Schema, model } = require('mongoose');

const asientoSchema = new Schema({
    numeroAsiento: Number,
    hora_entrada: String,
    hora_salida: String,
    idAula: {
        type: Schema.Types.ObjectId,
        ref: 'aulas'
    }
}); 

module.exports = model('asientos', asientoSchema);