const TurnoModel = require("../models/turno.models");

// GET

const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await TurnoModel.find();
        res.json(turnos);
    } catch (error) {
        res.status(400).json("Turno no encontrado");
        res.status(500).json("Error en el servidor")
    }
};

const obtenerTurnoPorId = async (req, res) => {
    try {
        const id = req.params.id
        const turno = await TurnoModel.findById(id);
        if (cancha) {
            res.json(turno);
        } else {
            res.status(404).json("Turno no encontrado")
        }
    } catch (error) {
        res.status(400).json("Turnos no encontrados")
        res.status(500).json("Error en el servidor")
    }
};

//Creacion de un Turno

const agendarTurno = async (req, res) => {
    try {
        const turno = new TurnoModel(req.body);
        await turno.save();
        console.log("Turno Agendado");
    } catch (error) {
        res.status("Error al agendar el turno");
    }
};

module.exports = {
    obtenerTurnos,
    obtenerTurnoPorId,
    agendarTurno
};