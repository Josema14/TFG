const Trade = require("./models/Trade");
const userService = require("./servicioUser")
const itemService = require("./servicioItem")


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

function newTrade(userHost,idHost,userClient,idClient){

    const trade = new Trade({
        propietario: userHost,
        comprador: userClient,
        itemPropietario: idHost,
        itemComprador: idClient,
        estado: "Pendiente",
        fechaSolicitud: Date.now(),
    })

    return trade.save()

}

//getTrade

function getTrade(idTrade){
    return Trade.findById(idTrade)
}

//Cancel Trades By Id

function cancelTradesByProduct(idTrade){
    return Trade.updateMany(
        { itemPropietario: idTrade },
        { estado: "Cancelado" })
}

//Cancel Trade
function cancelTrade(idTrade){

  return Trade.findOneAndUpdate({_id : idTrade},{estado: "Cancelado"});

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

module.exports = { getMessages, newTrade, getTrade, cancelTradesByProduct, acceptTrade,cancelTrade  };