const MascotaModel = require("../Models/mascota.model");

// GET

const obtenerMascotas = async (req, res) => {
    try {
        const mascotas = await MascotaModel.find();
        res.json(mascotas);
    } catch (error) {
        res.status(400).json("Mascota no encontrada");
       // res.status(500).json("Error en el servidor")
    }
};

const obtenerMascotasPorId = async (req, res) => {
    try {
        const id = req.params.id
        const mascota = await MascotaModel.findById(id);
        if (mascota) {
            res.json(mascota);
        } else {
            res.status(404).json("Mascota no encontrada")
        }
    } catch (error) {
        //res.status(400).json("Mascotas no encontradas")
        res.status(500).json("Error en el servidor")
    }
};

//Creacion de Mascota

const registrarMascota = async (req, res) => {
    try {
        const mascota = new MascotaModel(req.body);
        await mascota.save();
        res.status(201).json("Mascota Agregada");
    } catch (error) {
        res.status(404).json("Error al agregar la mascota");
    }
};

//Actualizar Mascota

const modificarMascota = async (req, res) => {
    try {
        const id = req.params.id;
        const mascota = await MascotaModel.findById(id);
        if (mascota) {
            mascota.fecha = req.body.fecha;
            mascota.hora = req.body.hora;
            mascota.plan = req.body.plan;
            const mascotaActualizada = await mascota.save();
            res.status(200).json("Mascota Actualizada")
            res.json(mascotaActualizada)
        } else {
            res.status(404).json("Mascota no encontrada");
        }
    } catch (error) {
       // res.status(400).json("Mascota no actualizada");
        res.status(500).json("Error en el servidor");
    }
};

//Borrar Mascota

const eliminarMascota = async (req, res) => {
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
        res.status(400).json("Mascota no eliminado");
    }
};

module.exports = {
    obtenerMascotas,
    obtenerMascotasPorId,
    registrarMascota,
    modificarMascota,
    eliminarMascota
};