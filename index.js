const http = require("http");

// Crear servidor. Recibe un callback con dos parametros

// const servidor = http.createServer((req, res) => { //req ---> request, res ---> response
//     res.end("Hola desde node");
// });


// const PORT = 3000;

// servidor.listen(PORT, () =>{
//     console.log(`Servidor puesto en marcha en el puerto ${PORT}`);

// });

const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor puesto en marcha en el puerto ${PORT}`);
});

// Crear una ruta en express

app.get("/", (req, res) => {
    res.send("Hola mundo desde Express");
});

app.get("/api/turnos", (req, res) => {
    res.send(JSON.stringify(turnos));
});

app.get("/api/turnos:id", (req, res) => {
    let id = req.params.id;
    let turno = turnos.find((turno) => turno.id == id);
    if (turno) {
        res.send(turno);
    } else {
        res.status(404).send("Turno no encontrado")
    }
});