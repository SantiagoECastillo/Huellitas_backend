const TurnoModel = require("src/Models/turno.models.js");

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

const obtenerTurnosPorId = async (req, res) => {
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
        res.status(201).json("Turno Agendado");
    } catch (error) {
        res.status(409).json("Error al agendar el turno");
    }
};

//Actualizar un turno

const modificarTurno = async (req, res) => {
    try {
        const id = req.params.id;
        const turno = await TurnoModel.findById(id);
        if (turno) {
            turno.fecha = req.body.fecha;
            turno.hora = req.body.hora;
            turno.plan = req.body.plan;
            await turno.save();
            res.status(200).json("Turno Actualizado")
        } else {
            res.status(404).json("Turno no encontrado");
        }
    } catch (error) {
        res.status(400).json("Turno no actualizado");
        res.status(500).json("Error en el servidor");
    }
};

//Borrar Turno

const borrarTurno = async (req, res) => {
    try {
        const id = req.params.id;
        const turno = await TurnoModel.findById(id);
        if (turno) {
            await TurnoModel.deleteOne({ _id: id });
            res.status(200).json("Turno eliminado");
        } else {
            res.status(404).json("Turno no encontrado");
        }
    } catch (error) {
        res.status(400).json("Turno no eliminado");
    }
};

module.exports = {
    obtenerTurnos,
    obtenerTurnosPorId,
    agendarTurno,
    modificarTurno,
    borrarTurno
};