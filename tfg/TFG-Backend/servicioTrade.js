const Trade = require("./models/Trade");
const userService = require("./servicioUser")
const itemService = require("./servicioItem")
const jwt = require("jsonwebtoken");

const repositorioTrade = require("./repositorios/repositorioTrades")
//Consigue todos los mensajes de un usuario
function getMessages(ids){

    return Trade.find()
      .where("_id")
      .in(ids)
      .populate("itemPropietario")
      .populate("itemComprador")
      .exec()
      
}

//New Trade

async function newTrade(userHost,idHost,userClient,idClient,token, tituloPropietario, tituloCliente){

  //Comprobar token

  let decoded = await jwt.decode(token);
  
  if(decoded.username !== userClient) return null;

 
  
    const trade = {
      propietario: userHost,
      comprador: userClient,
      tituloPropietario: tituloPropietario,
      tituloCliente: tituloCliente,
      itemPropietario: idHost,
      itemComprador: idClient,
      estado: "Pendiente",
      fechaSolicitud: Date.now(),
    }

    let result = await repositorioTrade.createTrade(trade);

    if(result) return result
    else return {
      message: "Internal Server Error"
    }

}

//getTrade

function getTrade(idTrade){
    return Trade.findById(idTrade)
}

//Cancel Trades By Id

async function cancelTradesByProduct(trade){

  //Obtenemos el trade y modificamos los items para que sean oficiales si son intercambios

  if(trade.itemPropietario.tipo === "Intercambio"){
    trade.itemPropietario.tipo = "Oficial";
    trade.itemPropietario.cantidad = 0;
  }
 
  if(trade.itemComprador.tipo === "Intercambio"){
  trade.itemComprador.tipo = "Oficial";
  trade.itemComprador.cantidad = 0;
  }

  await trade.itemPropietario.save()
  await trade.itemComprador.save()

  //Una vez modificado ambos viajes, si ambos son items de intercambio, cancelamos todos sus intercambios
  await repositorioTrade.cancelAllTrades(trade.itemPropietario._id,trade._id)
  await repositorioTrade.cancelAllTrades(trade.itemComprador._id,trade._id)
}

async function getTradePopulated(idTrade){
  return await repositorioTrade.getTradePopulated(idTrade);
}

async function endTrade(trade){
  
  trade.estado = "Aceptado";
  return await trade.save()
}

//Cancel Trade
async function cancelTrade(idTrade, token){
  //Comprobamos si el token funciona
  let decoded = await jwt.decode(token);
 
  if(decoded === null) return null;

  return await repositorioTrade.refuseTrade(idTrade)


}

async function cancelAllTradesById(idItem){

  return await  repositorioTrade.cancelAllTradesById(idItem);
}

//Accept Trade

async function acceptTrade(trade) {

 
    //Asignación de variables
    let user1 = trade.propietario;
    let user2 = trade.comprador;
    let _id1 = trade.itemPropietario;
    let _id2 = trade.itemComprador;


    let anfitrion = await userService.getUsuarioByName(user1);

    let cliente = await userService.getUsuarioByName(user2);
    let itemAnfitrion = await itemService.getItem(_id1);
    let itemOriginalID = itemAnfitrion.original;
  
    //Lo borramos del usuarioPropietario
  
    for (let i = 0; i < anfitrion.trading.length; i++) {
      
      if (anfitrion.trading[i].equals(_id1)) {
        anfitrion.trading.splice(i, 1);
      }
    }
    
    anfitrion.inventory.unshift(_id2);
  
    //Lo mismo con el cliente
  
    for (let i = 0; i < cliente.inventory.length; i++) {
      console.log(cliente.inventory + " " + _id2);
      if (cliente.inventory[i].equals(_id2)) {
        cliente.inventory.splice(i, 1);
      }
    }
  
    cliente.inventory.unshift(itemOriginalID);
    trade.estado = "Aceptado";
    trade.itemPropietario = itemOriginalID;
  
    await trade.save();
    await anfitrion.save();
    await cliente.save();
  
    itemService.deleteItemById(_id1)
  }

module.exports = { getMessages, newTrade, getTrade, cancelTradesByProduct, acceptTrade,cancelTrade,endTrade, getTradePopulated,cancelAllTradesById  };