const express = require("express");
const app = express(); //Inicializar express
const connectDb = require("./src/db/mongodb") //Importar la conexion a la base de datos
const cors = require('cors');

app.use(express.json()); //Permite recibir objetos en formato JSON
app.use(express.urlencoded({ extended: true})); //Permite recibir parametros y queris en las rutas
app.use(cors())

const PORT = 8080;

const initApp = async () => {
    try{
        app.listen(PORT, () => {
            console.log(`Servidor puesto en marcha en el puerto ${PORT}`);
    });
        await connectDb();
    }
    catch (error) {
        console.log("Error al iniciar la aplicación")
    }
};

initApp();

// Crear una ruta en express
app.use("/api", require("./src/routes/RutasTurnos"));

// http://localhost:8080/api/turnos