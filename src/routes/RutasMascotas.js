const express = require("express");
const router = express.Router();
const valicadionToken = require('../middleware/validacionToken');
const mascotaController = require("../controllers/mascotaController");


/*AGREGAR VALIDACION EN CASA CASO
1: PROBAR SI SIRVE LA MISMA TANTO PARA USU COMO ADMI
2: SINO HACER UNA PARA ADMIN */
router.get('/mascotas', valicadionToken, mascotaController.obtenerMascotas);
/*router.get('/mascotas/:id', valicadionToken, mascotaController.obtenerMascotaPorId);*/
router.get('/mascotas/:id', valicadionToken, mascotaController.obtenerMascotasPorDueño);

router.post('/mascotas', valicadionToken, mascotaController.agregarMascota);

router.put('/mascotas/:id', valicadionToken, mascotaController.actualizarMascota);

router.delete('/mascotas/:id', valicadionToken, mascotaController.borrarMascota);

module.exports = router;
