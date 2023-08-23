const express = require("express");
const router = express.Router();
const usurioController = require("../controllers/usuarioController");
const validadorSchema = require("../middleware/validacionSchema");
const validar = require("../validatorSchema/usuarioSchema")


router.get("/usuarios", usurioController.obtenerUsuarios);
router.post("/registro", validadorSchema(validar.validacionRegistro), usurioController.registrarUsuario);
router.post("/login", validadorSchema(validar.validacionLogin), usurioController.loginUsuario);


module.exports = router;