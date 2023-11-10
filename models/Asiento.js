const { Schema, model } = require('mongoose');

const asientoSchema = new Schema({
    numeroAsiento: Number,
    hora_entrada: String,
    hora_salida:String,
    idAula: {
        type: String, 
        required: true
    }
}); 

module.exports = model('asientos', asientoSchema);