const mongoose = require("mongoose");

//Concetar a la base de datos
const connectDb = async () =>{
    try {
        mongoose.set('strictQuery', false); //soluciona error de strictQuery
        await mongoose.connect('mongodb://127.0.0.1:27017/Huellitas_vet', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexion exitosa a la base de datos");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;