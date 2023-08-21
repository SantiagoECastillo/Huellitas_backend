const z = require("zod");

const validacionRegistro =  z.object({
    nombre: z.string({
        required_error: 'El nombre es requerido'
    }),
    apellido: z.string({
        required_error: 'El apellido es requerido'
    }),
    correo: z.string({
        required_error: 'El correo es requerido'
    }).email({
        required_error: 'correo invalido'
    }),
    contrasena: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener un minimo de 6 caracteres'
    })
})


const validacionLogin = z.object({
    correo: z.string({
        required_error: 'Correo requerido'
    }).email({
        message: 'Correo no valido'
    }),
    contrasena: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener un minimo de 6 caracteres'
    })

})

module.exports = {
    validacionRegistro,
    validacionLogin
}