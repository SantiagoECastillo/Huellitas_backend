const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        // mongoose.set('strictQuery', false); //soluciona error de strictQuery
        //await mongoose.connect("mongodb://127.0.0.1:27017/VeterinariaHuellitas", {
        //await mongoose.connect("mongodb://localhost:27017/VeterinariaHuellitas", {
        await mongoose.connect("mongodb+srv://huellitas:veterinariahuellitas@veterinariahuellitas.val3vvb.mongodb.net/VeterinariaHuellitas", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log("Error al conectar");
    }
};

module.exports = connectDb;