const mongoose = require("mongoose");

const {Schema} = mongoose;

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: Int32Array,
    telefono: Int32Array
});

const UsuarioModelo = mongoose.model("usuarios", usuarioSchema);

module.exports = UsuarioModelo