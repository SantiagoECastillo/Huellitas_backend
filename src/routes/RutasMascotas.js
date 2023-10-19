const express = require("express");
const router = express.Router();
const mascotasController = require("../controllers/mascotasController")


//Rutas del GET
router.get("/mascotas", mascotasController.obtenerMascotas)

router.get("/mascotas/:id", mascotasController.obtenerMascotasPorId)

//Ruta del POST
router.post("/mascota", mascotasController.registrarMascota);

//Ruta del PUT
router.put("/mascota/:id", mascotasController.modificarMascota);

//Ruta del DELETE
router.delete("/mascota/:id", mascotasController.eliminarMascota);

module.exports = router;