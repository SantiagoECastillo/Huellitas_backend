/*const http = require("http")

const servidor = http.createServer((req, res) =>{
    res.end("Se inicio el servidor");
})

const PORT = 3000;

servidor.listen(PORT, () =>{
    console.log(`servido corriendo en el puerto ${PORT}`);
});*/

const express = require("express");
const app = express();
const conectarDb = require('./src/db/mongodb');


app.use(express.json()); //permite trabajar con documentos json
app.use(express.urlencoded({extended: true})) //habilita poder recibir parametros desde una url (los param)

const PORT = 8081;

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