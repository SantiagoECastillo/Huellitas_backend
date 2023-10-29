const express = require("express");
const router = express.Router();
const usuariosController = require("src/Controllers/usuariosController.js")

//Rutas del GET
router.get("/usuarios", usuariosController.obtenerUsuarios);
router.get("/usuario/:id", usuariosController.obtenerUsuariosPorId);

//Rutas del POST
router.post("/usuario", usuariosController.registrarUsuario);

//Rutas del PUT
router.put("/usuario/:id", usuariosController.modificarUsuario);

//Rutas del DELETE
router.delete("/usuario/:id", usuariosController.eliminarUsuario);

//Rutas del LOGIN
router.post("/login", usuariosController.loginUsuario);

module.exports = router