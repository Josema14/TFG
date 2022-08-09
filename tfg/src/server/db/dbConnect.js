//Importamos mongoose y dotenv

const mongoose = require("mongoose");
require('dotenv').config()

//Función que vamos a exportar donde nos conectamos a la base de datos
async function dbConnect() {


    mongoose.connect(
        process.env.ATLAS_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!")
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    });
}

module.exports = dbConnect;