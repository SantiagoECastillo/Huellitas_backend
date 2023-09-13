const express = require("express");
const app = express();
const connectDb = require("./src/db/mongodb");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
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
app.use("/api", require("./src/routes/RutasMascotas"));

// http://localhost:8080/api/mascotas