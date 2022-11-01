//Importamos mongoose
const mongoose = require("mongoose");

//Creamos el schema
const TradeSchema = new mongoose.Schema({

    propietario:{
        type: mongoose.ObjectId,
        required
    },
    comprador:{
        type: mongoose.ObjectId,
        required
    },
    itemPropietario:{
        type: mongoose.ObjectId,
        required
    },
    itemComprador:{
        type: mongoose.ObjectId,
        required
    }



})

module.exports = mongoose.model.Trades || mongoose.model("Trade", TradeSchema);