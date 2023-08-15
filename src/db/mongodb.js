const mongoose = require("mongoose");

//Concetar a la base de datos
const connectDb = async () =>{
    try {
        mongoose.set('strictQuery', false); //soluciona error de strictQuery
        await mongoose.connect("mongodb://localhost:27017/Huellitas_vet", {
            useNewUrlParse: true,
            useUnifiedTopology: true,
        });
        console.log("Concexion extiosa a la base de datos");
    } catch (error) {
        console.log("error al conectar");
    }
}

module.exports = connectDb;