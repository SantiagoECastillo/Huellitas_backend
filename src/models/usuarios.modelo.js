const mongoose = require("mongoose");
const {Schema} = mongoose;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        minLength: 8,
    },
    telefono: {
        type: Number,
        required: true,
        length: 8,
        trim: true
    }
},{versionKey: false});

const UsuarioModelo = mongoose.model("usuarios", usuarioSchema);

module.exports = UsuarioModelo;