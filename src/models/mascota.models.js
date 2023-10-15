const mongoose = require("mongoose");
const { Schema } = mongoose;

const mascotaSchema = new Schema({
    nombreMascota: {
        type: String,
        required: true,
    },
    especie: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: true,
    },
    sexoMascota: {
        type: String,
        required: true,
    },
    edad: {
        type: String,
        required: true,
    }

}, { versionKey: false });

const MascotaModel = mongoose.model("mascotas", mascotaSchema);
module.exports = MascotaModel;