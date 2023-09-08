const express = require("express");
const router = express.Router();
const turnosControllers = require("../controllers/turnoController")


//Rutas del GET

router.get("/turnos",turnosControllers.obtenerTurnos)

router.get("/turnos/:id", turnosControllers.obtenerTurnoPorId)

//Ruta del POST
router.post("/turno", turnosControllers.agendarTurno);


module.exports = router;