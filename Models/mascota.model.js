const mongoose = require("mongoose");
const { Schema } = mongoose;

const mascotaSchema = new Schema({
    nombreDueno: {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 2,
        trim: true
    },
    correoDueno: {
        type: String,
        required: true,
        maxLength: 80,
        minLength: 7,
        trim: true
    },
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