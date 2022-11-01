//Importamos mongoose
const mongoose = require("mongoose");

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
    itemPropietario:{
        type: mongoose.ObjectId,
        required: [true, "Introduzca un itemPropietario"],
    },
    itemComprador:{
        type: mongoose.ObjectId,
        required: [true, "Introduzca un itemComprador"], 
    }



})

module.exports = mongoose.model.Trades || mongoose.model("Trade", TradeSchema);