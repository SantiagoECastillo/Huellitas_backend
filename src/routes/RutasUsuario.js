const express = require("express");
const router = express.Router();
const usurioController = require("../controllers/usuarioController");

router.get("/usuarios", usurioController.obtenerUsuarios);
router.post("/registro", usurioController.registrarUsuario);
router.post("/login", usurioController.loginUsuario);
/*
router.get("/usuarios/:id", usurioController.obtenerUsuarioPorId);
router.post("/registro", usurioController.crearUsuario);
router.put("/usuarios/:id", usurioController.modificarUsuario);
router.delete("/usuarios/:id", usurioController.eliminarUsuario);*/

module.exports = router;