const mongoose = require("mongoose");
const { Schema } = mongoose;

const turnoSchema = new Schema({
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
        type:String,
        required: true,
    }

}, {versionKey: false});

const TurnoModel = mongoose.model("turnos-veterinariaHuellitas", turnoShema);
module.exports = TurnoModel;