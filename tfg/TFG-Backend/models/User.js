//Clase para crear el schema de Usuario
//Importamos mongoose

const mongoose = require("mongoose");
const Item = require("./Item")
//Creamos el schema
const UserSchema = new mongoose.Schema({
    //Los campos de un usuario son: email, nombre, contraseña y fecha de creación
    email: {
        type: String,
        required: [true, "Introduzca un correo electrónico"],
        unique: [true, "El correo ya se encuentra registrado"],
    },

    password: {
        type: String,
        required: [true, "Introduce una contraseña"],
        unique: false,
    },

    name: {
        type: String,
        required: [true, "Introduzca un nombre"],
        unique: false,
    },
    date: {
        type: Date,
        default: new Date(),
    },

    inventory: {
        type: [mongoose.ObjectId]

    },

    
    trading: {
        type: [mongoose.ObjectId]

    },

    message:{
        type: [mongoose.ObjectId]
    }

   

})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);