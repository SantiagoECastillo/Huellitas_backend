
const UsuarioModelo = require("../models/usuarios.modelo");
const bcrypt = require("bcrypt");
const CrearTokenAcceso = require("../libs/jwt");


const registrarUsuario = async (req, res) => {
    try {
        const {nombre, apellido, correo, contrasena, telefono, rol} = req.body;
        
        const verificarCorreo = await UsuarioModelo.findOne({correo});
        if(verificarCorreo){
            return res.status(400).json(["El correo ingresado ya tiene una cuenta"]);
        }

        const hash = await bcrypt.hash(contrasena, 10)
        const nuevoUsuario = new UsuarioModelo({
            nombre,
            apellido,
            correo,
            contrasena: hash,
            telefono,
            rol
        })
        await nuevoUsuario.save();

        /*----------datos que usara el frontend----------- */
        const token = await CrearTokenAcceso({id: nuevoUsuario._id})
        res.cookie('token', token)

        res.status(200).json({
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            correo: nuevoUsuario.correo,
            rol: nuevoUsuario.rol
        });
        /*--------------------- */
    } catch (error) {
        res.status(400).json("Usuario no creado");
        console.log(error);
    }
}

const loginUsuario = async (req, res) => {
    const {correo, contrasena} = req.body;
    try {
        const usuarioEncontrado = await UsuarioModelo.findOne({correo});
        if(!usuarioEncontrado){
            return res.status(400).json(["Usuario y/o Contraseña invalido"]);
        }
        
        const comprobarContrasena = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
        if(!comprobarContrasena){
            return res.status(400).json(["Usuario y/o Contraseña invalido"]);
        }
        
        /*Genero el token */
        const token = await CrearTokenAcceso({id: usuarioEncontrado._id})
        res.cookie('token', token)

        /*VER DE SACAR ESTO MAS ADELANTE, COMPROBAR SI CON LOS DATOS ENVIADO POR EL TOKEN BASTA */
        res.status(200).json({
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
    
}

const obtenerUsuarios = async (req, res) => {
    try{
        const usuarios = await UsuarioModelo.find();
        res.json(usuarios);
    }catch (error) {
        res.status(400).json("Usuarios no encontrados");
    }
}

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModelo.findById(id);
        if(usuario){
            res.json(usuario);
        }else{
            res.status(404).json("Usuario no encontrado")
        }
    } catch (error) {
        console.log(error);
    }
}

const modificarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModelo.findById(id);
        if(usuario){
            usuario.nombre = req.body.nombre;
            usuario.apellido = req.body.apellido;
            usuario.correo = req.body.correo;
            usuario.contrasena = req.body.contrasena;
            usuario.telefono = req.body.telefono;
            const usuarioEditado = usuario.save();
            /*res.status(200).json("El usuario fue editado con exito");*/
            res.json(usuarioEditado);
        }else{
            res.status(404).json("Usuario no encontrado");
        }
    } catch (error) {
        res.status(400).json("Usuario no actualizado");
        /*res.status(500).json("Error en el servidor");*/
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModelo.findById(id);
        if(usuario){
            await UsuarioModelo.deleteOne({_id: id});
            res.status(200).json("Usuario eliminado");
        }else{
            res.status(404).json("Usuario no encontrado")
        }
    } catch (error) {
        res.status(400).json("Usuario no eliminado")
    }
}


module.exports = {
    registrarUsuario,
    loginUsuario,
    logout,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario
}