const mongoose = require("mongoose");
const { Schema } = mongoose;

const turnoSchema = new Schema({
    nombre: {
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
    fecha: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type: String,
        required: true,
    }

}, { versionKey: false });

const TurnoModel = mongoose.model("turnos", turnoSchema);
module.exports = TurnoModel;