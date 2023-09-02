const express = require("express");
const app = express();
const conectarDb = require('./src/db/mongodb');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const valicadionToken = require("./src/middleware/validacionToken");

app.use(express.json()); //permite trabajar con documentos json
app.use(express.urlencoded({extended: true})) //habilita poder recibir parametros desde una url (los param)
app.use(cors());
app.use(cookieParser()); 
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
//app.use("/api", require("./src/routes/RutasUsuario"))
//app.use("/api", valicadionToken, require("./src/routes/RutasAdmin"));
app.use("/api", require("./src/routes/RutasMascotas"))


