const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    email: {
        type: String,
        required: true,
        min: 1,
        trim: true
    },

    password:{
        type: String,
        required: true,
        min: 6,
        trim: true
    },

    admin: {
        type: Boolean,
        required: true
    }
});

//* encriptar contraseña
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

//* validar contraseña
userSchema.methods.validarPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('users', userSchema);