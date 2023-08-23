const mongoose = require("mongoose");
const { Schema } = mongoose;

const mascotaSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  especie: {
    type: String,
    require: true,
    trim: true
  },
  raza: {
    type: String,
    require: true,
    trim: true,
    maxLength: 15
  },
  genero: {
    type: String,
    require: true,
    trim: true,
  },
  edad: {
    type: Number,
    require: true
  }
}, { versionKey: false });

const MascotaModel = mongoose.model("mascotas", mascotaSchema);

module.exports = MascotaModel;