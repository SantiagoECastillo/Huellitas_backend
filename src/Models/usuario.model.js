const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 2,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 2,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        unique: true,
        maxLength: 80,
        minLength: 7,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    telefono: {
        type: Number,
        required: true,
        length: 8,
        trim: true
    },
    rol: {
        type: String,
        trim: true
    }
},
    { versionKey: false });

const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

module.exports = UsuarioModel