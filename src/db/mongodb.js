const mongoose = require("mongoose");

//Concetar a la base de datos
const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false); //soluciona error de strictQuery
        await mongoose.connect('mongodb://localhost:27017/Turnos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log("Error al conectar");
    }
}

module.exports = connectDb;