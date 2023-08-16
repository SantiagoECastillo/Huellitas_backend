const mongoose = require("mongoose");

//Concetar a la base de datos
const connectDb = async () =>{
    try {
        mongoose.set('strictQuery', false); //soluciona error de strictQuery
        await mongoose.connect('mongodb://0.0.0.0:27017/Huellitas_vet', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Concexion extiosa a la base de datos");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;