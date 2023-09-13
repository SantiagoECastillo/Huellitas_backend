const express = require("express");
const router = express.Router();
const turnosController = require("../controllers/turnosController")


//Rutas del GET
router.get("/turnos", turnosController.obtenerTurnos)

router.get("/turnos/:id", turnosController.obtenerTurnoPorId)

//Ruta del POST
router.post("/turno", turnosController.agendarTurno);

//Ruta del PUT
router.put("/turno/:id", turnosController.actualizarTurno);

//Ruta del DELETE
router.delete("/turno/:id", turnosController.borrarTurno);

module.exports = router;