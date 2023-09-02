const mongoose = require("mongoose");
const { Schema } = mongoose;

const mascotaSchema = new Schema({
  nombreMascota: {
    type: String,
    require: true,
    trim: true
  },
  especieMascota: {
    type: String,
    require: true,
    trim: true
  },
  tipoDeRaza: {
    type: String,
    require: true,
    trim: true,
    maxLength: 15
  },
  sexoMascota: {
    type: String,
    require: true,
    trim: true,
  },
  edadMascota: {
    type: Number,
    require: true
  },
  dueno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios',
    /*require: true*/
  }
}, { versionKey: false });

const MascotaModel = mongoose.model("mascotas", mascotaSchema);

module.exports = MascotaModel;

