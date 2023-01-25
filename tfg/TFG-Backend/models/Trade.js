//Importamos mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Item = require("./Item");

//Creamos el schema
const TradeSchema = new mongoose.Schema({

    propietario:{
        type: String,
        required: [true, "Introduzca un propietario"],
    },
    comprador:{
        type: String,
        required: [true, "Introduzca un comprador"],
    },
    tituloPropietario:{
        type: String,
        required: [true, "Introduzca un título de propietario"],
    },
    tituloCliente:{
        type: String,
        required: [true, "Introduzca un título de cliente"],
    },
    itemPropietario:{
        type: Schema.Types.ObjectId,
        ref: 'Items',
        required: [true, "Introduzca un itemPropietario"],
    },
    itemComprador:{
        type: Schema.Types.ObjectId,
        ref: 'Items',
        required: [true, "Introduzca un itemComprador"], 
    },

    fechaSolicitud: {
        type: Date,
        required: [true, "Introduzca una fecha inicial"]
    },

    estado: {
        type: String,
        required: [true, "Introduzca un estado"]
    }



})

module.exports = mongoose.model.Trades || mongoose.model("Trade", TradeSchema);