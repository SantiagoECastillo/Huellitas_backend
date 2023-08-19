const express = require("express");
const app = express();
const conectarDb = require('./src/db/mongodb');
const cors = require("cors");
const comprobacionJWT = require("./src/middleware/comprobacionJWT");

app.use(express.json()); //permite trabajar con documentos json
app.use(express.urlencoded({extended: true})) //habilita poder recibir parametros desde una url (los param)
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const initApp = async () => {
    try {
        app.listen(PORT, () =>{
            console.log(`servido corriendo en el puerto ${PORT}`);
        });
        await conectarDb();
    } catch (error) {
        console.log("Erro al iniciar aplicacion")
    }
}

initApp();

//Ingreso de las rutas
/*app.use("/api") /*Esta incompleto hay que agregar la ruta que usa ej: app.use("/api", usuarioRouter)  e importar el usuarioRouter de la carpeta routes*/
/*app.use("/api/usuarios", require("./src/routes/RutasUsuario"))*/
app.use("/api", require("./src/routes/RutasUsuario"))
app.use("/api/usuario", require("./src/routes/RutasUsuario"))
app.use("/prot", comprobacionJWT, require("./src/routes/RutasAdmin"));

