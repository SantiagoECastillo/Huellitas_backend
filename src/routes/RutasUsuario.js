const express = require("express");
const router = express.Router();
const usurioController = require("../controllers/usuarioController");
/*AGREGAR VALIDACION DE SCHEMA */

router.get("/usuarios", usurioController.obtenerUsuarios);
router.post("/registro", usurioController.registrarUsuario);
router.post("/login", usurioController.loginUsuario);


module.exports = router;