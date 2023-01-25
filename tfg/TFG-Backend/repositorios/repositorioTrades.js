const Trade = require("../models/Trade");

async function createTrade(trade) {
    //Creamos el intercambio
  
    const newTrade = new Trade(trade);
    //Guardamos el usuario en la base de datos
    return await newTrade.save();
  }

async function refuseTrade(idTrade){
  return Trade.findOneAndUpdate({_id : idTrade},{estado: "Cancelado"});
}

async function getTradePopulated(idTrade){

  return await Trade.findById(idTrade).populate("itemPropietario")
  .populate("itemComprador")
  .exec();
   


}

async function cancelAllTrades(idItem,idTrade){
  return await Trade.updateMany(
    { itemPropietario: idItem,
    _id: { $ne: idTrade } },
    { estado: "Cancelado" })}


async function cancelAllTradesById(idItem){
  return await Trade.updateMany(
    { $or: [{ itemPropietario: idItem }, { itemComprador: idItem }]},
    { estado: "Cancelado" })
  }


  module.exports = {
    createTrade,
    refuseTrade,
    cancelAllTrades,
    getTradePopulated,
    cancelAllTradesById
  }