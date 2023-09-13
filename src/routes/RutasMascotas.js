const express = require("express");
const router = express.Router();
const mascotasController = require("../controllers/mascotasController")


//Rutas del GET
router.get("/mascotas", mascotasController.obtenerMascotas)

router.get("/mascotas/:id", mascotasController.obtenerMascotaPorId)

//Ruta del POST
router.post("/mascota", mascotasController.agregarMascota);

//Ruta del PUT
router.put("/mascota/:id", mascotasController.actualizarMascota);

//Ruta del DELETE
router.delete("/mascota/:id", mascotasController.borrarMascota);

module.exports = router;