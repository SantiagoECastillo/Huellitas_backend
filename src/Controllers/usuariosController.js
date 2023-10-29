const UsuarioModel = require("src/Models/usuario.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//GET

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.find();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json("Usuario no encontrado");
        res.status(500).json("Error en el servidor");
    };

};

//GET por ID

const obtenerUsuariosPorId = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await UsuarioModel.findById(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json("Usuario no encontrado");
        }
    } catch (error) {
        res.status(400).json("Usuarios no encontrados");
        res.status(500).json("Error en el servidor");
    };
};


//POST

const registrarUsuario = async (req, res) => {

    try {
        const { nombre, apellido, correo, password, telefono, rol } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const usuario = new UsuarioModel({
            nombre,
            apellido,
            correo,
            password: hash,
            telefono,
            rol,
        });
        await usuario.save();
        res.status(201).json(usuario);

    } catch (error) {
        res.status(400).json("Usuario no registrado");
        res.status(500).json("Error en el servidor");
    }
};


//PUT
const modificarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModel.findById(id);
        if (usuario) {
            usuario.nombre = req.body.nombre;
            usuario.apellido = req.body.apellido;
            usuario.correo = req.body.correo;
            usuario.password = req.body.password;
            usuario.telefono = req.body.telefono;
            usuario.rol = req.body.rol;
            await usuario.save();
            res.status(200).json("Usuario modificado");
        } else {
            res.status(404).json("Usuario no encontrado");
        }
    } catch (error) {
        res.status(400).json("Usuario no modificado");
        res.status(500).json("Error en el servidor");
    }
};


//DELETE

const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModel.findById(id);
        if (usuario) {
            await UsuarioModel.deleteOne({ _id: id });
            res.status(200).json("Usuario eliminado");
        } else {
            res.status(404).json("Usuario no encontrado");
        }
    } catch (error) {
        res.status(400).json("Usuario no eliminado");
        res.status(500).json("Error en el servidor");
    }
};

//LOGIN

const loginUsuario = async (req, res) => {
    const user = await UsuarioModel.findOne({ correo: req.body.correo });

    if (!user) {
        return res.status(400).json("suario y/o contraseña incorrectos");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
        return res.status(400).json("Usuario y/o contraseña incorrectos")
    }

    //Generar token

    const token = jwt.sign({
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol
    },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.header("auth-token", token).json({
        error: null,
        data: { token }
    });
    

};

module.exports = {
    obtenerUsuarios,
    obtenerUsuariosPorId,
    registrarUsuario,
    modificarUsuario,
    eliminarUsuario,
    loginUsuario
};