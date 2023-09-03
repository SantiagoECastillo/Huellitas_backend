const express = require("express");
const router = express.Router();
const usurioController = require("../controllers/usuarioController");
const validadorSchema = require("../middleware/validacionSchema");
const validar = require("../validatorSchema/usuarioSchema")


router.get("/usuarios", usurioController.obtenerUsuarios);
router.post("/registro", usurioController.registrarUsuario); /*validadorSchema(validar.validacionRegistro), */
router.post("/login",  usurioController.loginUsuario); /*validadorSchema(validar.validacionLogin),*/
router.put("/usuarios/:id",  usurioController.modificarUsuario);
router.delete("/usuarios/:id",  usurioController.eliminarUsuario);


module.exports = router;