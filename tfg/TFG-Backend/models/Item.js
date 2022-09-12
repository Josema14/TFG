//Clase para crear el schema de Usuario
//Importamos mongoose
const mongoose = require("mongoose");

//Creamos el schema
const ItemSchema = new mongoose.Schema({
    //Los campos de un item son: Ubicación, nombre, Fecha de inicio, Duración,Intercambio u oficial e imagen
    nombre: {
        type: String,
        required: [true, "Introduzca un nombre"],
        unique: [true, "Introduzca un nombre único"],
    },

    ubicacion: {
        type: String,
        required: [true, "Introduce una ubicación"],
        unique: false,
    },

    duracion:{
        type: Number,
        required: [true, "Introduce una duración"]
    },

    descripcion:{
        type:String,
        required : [true, "Introduce una descripción"]
    },

    fechaInicio: {
        type: Date,
        required: [true, "Introduzca una fecha de inicio"],
        unique: false,
    },
    intercambio: {
        type: Boolean,
        default: false,
    },

    imagen: {
        type: String,
        unique:false,
    }



   

})

module.exports = mongoose.model.Items || mongoose.model("Items", ItemSchema);