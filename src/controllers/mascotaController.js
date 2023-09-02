const MascotaModel = require('../models/mascota.modelo.js');


const obtenerMascotas = async (req, res) => {
    try {
      const mascotas = await MascotaModel.find();
      res.json(mascotas);
    } catch (error) {
      res.status(400).json("Mascotas no encontradas");
    }
};
  
const obtenerMascotasPorDueño = async (req, res) => {
    try {
      const mascotas = await MascotaModel.find({
        dueno: req.user.id
      }).populate('dueno');
      res.json(mascotas);
    } catch (error) {
      res.status(400).json("Mascotas no encontradas");
    }
};
  
const obtenerMascotaPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const mascotaEncontrada = await MascotaModel.findById(id);
      if (mascotaEncontrada) {
        res.json(mascotaEncontrada);
      } else {
        res.status(404).json("La mascota no fue encontrada");
      }
    } catch (error) {
      res.status(400).json("La mascota no fue encontrada");
    }
};
  
  // Creacion de una cancha
const agregarMascota = async (req, res) => {
    try {
        const {nombreMascota, especieMascota, tipoDeRaza, sexoMascota, edadMascota} = req.body
        const nuevaMascota = new MascotaModel({
            nombreMascota,
            especieMascota,
            tipoDeRaza,
            sexoMascota,
            edadMascota,
            /*dueno: req.user.id*/
        })
        await nuevaMascota.save();
        res.status(201).json(nuevaMascota);
    } catch (error) {
        res.status(400).json("Mascota no creada");
    }
};
  

const actualizarMascota = async (req, res) => {
    try {
      const mascotaEncontrada = await MascotaModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (mascotaEncontrada) {
        console.log("sE ACTUALIZO");
        res.status(200).json("Mascota actualizada");
      } else {
        res.status(404).json("Mascota no encontrada");
      }
    } catch (error) {
      res.status(400).json("Datos de mascota no actualizados");
    }
};
  //Borrar una cancha
const borrarMascota = async (req, res) => {
    try {
      const id = req.params.id;
      const mascota = await MascotaModel.findById(id);
      if (mascota) {
        await MascotaModel.deleteOne({ _id: id });
        res.status(200).json("Mascota eliminada");
      } else {
        res.status(404).json("Mascota no encontrada");
      }
    } catch (error) {
      res.status(400).json("Mascota no eliminada");
    }
};
  
module.exports = {
    obtenerMascotas,
    obtenerMascotaPorId,
    obtenerMascotasPorDueño,
    agregarMascota,
    actualizarMascota,
    borrarMascota
};