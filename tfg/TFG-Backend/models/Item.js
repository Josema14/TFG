//Clase para crear el schema de Usuario
//Importamos mongoose
const mongoose = require("mongoose");

//Creamos el schema
const ItemSchema = new mongoose.Schema({
    //Los campos de un item son: Ubicación, nombre, Fecha de inicio, Duración,Intercambio u oficial e imagen
    titulo: {
        type: String,
        required: [true, "Introduzca un nombre"],
        
    },

    ubicacion: {
        type: String,
        required: [true, "Introduce una ubicación"],
        unique: false,
    },

    fechaFinal:{
        type: Date,
        required: [true, "Introduce una fecha de finalización"]
    },

    descripcion:{
        type:String,
        required : [true, "Introduce una descripción"]
    },

    fechaInicio: {
        type: Date,
        required: [true, "Introduzca una fecha de inicio"],
       
    },
    tipo: {
        type: String,
        required: [true, "Introduzca un tipo de paquete"],
    },

    imagen: {
        type: String,
        unique:false,
    },

    personas: {
        type: Number,
        unique: false,
    },

    precio: {
        type: Number,
        unique: false,
    },

    propietario: {
        type: String,
        unique:false,
    },

    cantidad: {
        type: Number,
    }






   

})

module.exports = mongoose.model.Items || mongoose.model("Items", ItemSchema);