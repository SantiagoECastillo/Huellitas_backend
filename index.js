const express = require("express");
const app = express();
const connectDb = require("./src/db/mongodb");
const cors = require("cors");
require("dotenv").config()
const comprobacionJwt = require("./src/middleware/comprobacionJwt");


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

const PORT = process.env.PORT || 3000;
const initApp = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor puesto en marcha en el puerto ${PORT}`);
        });
        await connectDb();
    } catch (error) {
        console.log("Error al iniciar la aplicación");
    }
};

initApp();

app.use("/api", require("./src/routes/RutasUsuarios"));
app.use("/api", require("./src/routes/RutasMascotas"));
app.use("/api", require("./src/routes/RutasTurnos"));
app.use("/protegida", comprobacionJwt, require("./src/routes/RutasAdmin"));

// http://localhost:8080/api/usuarios