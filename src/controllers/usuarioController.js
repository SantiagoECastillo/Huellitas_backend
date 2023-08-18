
const UsuarioModelo = require("../models/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* PROBAR ESTA EN CASO DE QUE LA CREARUSUARIO NON FUNCIONE*/


const registrarUsuario = async (req, res) => {
    try {
        const {nombre, apellido, correo, contrasena, telefono} = req.body;
        const hash = await bcrypt.hash(contrasena, 10)
        const usuario = new UsuarioModelo({
            nombre,
            apellido,
            correo,
            contrasena: hash,
            telefono
        })
        await usuario.save();
        res.status(201).json("El usuario fue creado con exito");
    } catch (error) {
        res.status(400).json("Usuario no creado");
        console.log(error);
    }
}

const obtenerUsuarios = async (req, res) => {
    try{
        const usuarios = await UsuarioModelo.find();
        res.json(usuarios);
    }catch (error) {
        res.status(400).json("Usuarios no encontrados");
        /*res.status(500).json("Error en el servidor");*/
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
            res.status(200).json("El usuario fue editado con exito");
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

const loginUsuario = async (req, res) => {
    const usuario = await UsuarioModelo.findOne({correo: req.body.correo});
    
    if(!usuario){
        return res.status(400).json("Usuario y/o Contraseña invalido");
    }else{
        const comprobarContrasena = await bcrypt.compare(req.body.contrasena, usuario.contrasena);
        if(!comprobarContrasena){
            return res.status(400).json("Usuario y/o Contraseña invalido");
        }
    }

    const token = jwt.sign({
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido
        //rol: usuario.rol /*ver como agregar rol */
    }, 
        process.env.SECRET_KEY,
        {expiresIn: "1d"}
    );
    
    res.header("auth-token", token).json({
        error: null,
        data: {token}
    })
    
    
}



module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    modificarUsuario,
    eliminarUsuario
}