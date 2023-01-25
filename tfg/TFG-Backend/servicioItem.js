const Item = require("./models/Item");
const DIFF_MONEY = 1000;
const repositorioItem = require("./repositorios/repositorioItem")

const jwt = require("jsonwebtoken");

function getItems(name) {
  if (name !== "")
    return Item.find({ propietario: { $regex: "^((?!" + name + ").)*$" },
    cantidad: { $gt: "0"},
   });
  else return Item.find({cantidad: { $gt: 0}});
}

//GetItem
 async function getItem(id) {

    return await repositorioItem.findItemById(id);
}

 async function deleteItemById(id) {
    return await repositorioItem.deleteItemById(id);

}

async function cancelItem(id){
  let item = await repositorioItem.findItemById(id);

  item.cantidad = 0;

  return item.save()
}

async function getOriginalId(id) {
  let OriginalItem = await getItem(id)

  if(OriginalItem.original == null) return {
    id: null
  };
  return {
    id : OriginalItem.original,
  }
}

async function newItem(item,imagen) {

  
  let itemFinal = {
    titulo: item.titulo,
    ubicacion: item.ubicacion,
    fechaInicio: item.fechaInicial,
    imagen: imagen,
    fechaFinal: item.fechaFinal,
    descripcion: item.descripcion,
    tipo: item.tipo,
    personas: item.personas,
    precio: item.tripPoints,
    propietario: item.propietario,
    cantidad: item.cantidad,
  }

  console.log(itemFinal)
  return await repositorioItem.createItem(itemFinal);
  
 
}

function getInventory(user) {
  let inventario = user.inventory;
 
  return inventario.concat(user.trading);
}

async function getValidInventory(user, price,_id) {
  let validItems = [];
  let repeatedItem = false;
  let dateNow = Date.now();

 //Obtenemos el item
 let tradeItem = await getItem(_id)

 if(tradeItem.original!==undefined){
  for (let itemTrade of user.trading){

    
    if (
      itemTrade.precio >= (Number(price) - DIFF_MONEY)&&
      itemTrade.precio <= (Number(price) + DIFF_MONEY)
    ) {
      let diffTime = Math.abs(dateNow - itemTrade.fechaInicio);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      


  
    
    if(tradeItem.original?.equals(itemTrade.original)){
      
      repeatedItem = true
      break
    }
    else if (diffDays > 14) {
      validItems.push(itemTrade);
    }


  }

  
}
 }
  for (let item of user.inventory) {
  
    if (
      item.precio >= (Number(price) - DIFF_MONEY)&&
      item.precio <= (Number(price) + DIFF_MONEY)
    ) {
      let diffTime = Math.abs(dateNow - item.fechaInicio);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
      if(tradeItem.original!==undefined && (tradeItem.original?.equals(item._id) || tradeItem.original?.equals(item.original) )  ){
        repeatedItem = true
        break
      }
      else if (diffDays > 14) {
        validItems.push(item);
      }
      
    }
  }
  
 
  return{items: validItems, repeated: repeatedItem};
}

async function  purchaseItem(_id, tripPoints){

  //Obtenemos el item
  let item = await getItem(_id);

  //Si no quedan existencias lo indicamos
  if( item.cantidad <= 0){
    return {
      item: null,
      message:"No quedan existencias"
    }
  }
  console.log(item.precio + " " + tripPoints)
  //Si el usuario no tiene los tripPoints necesarios lo indicamos
  if( item.precio > tripPoints){

    return {
      item: null,
      message:"No tienes los suficientes TripPoints"
    }
  }

  //Bajamos la cantidad y guardamos
  item.cantidad = item.cantidad - 1;
  await item.save();

  //Devolvemos el item
  return {
    item: item
  }




  
}

async function searchItems(params){

  
  let decoded = await jwt.decode(params.token);

  let name = decoded.username;



  let query = {};

  if (name !== "")
      query.propietario = { $regex: "^((?!" + name + ").)*$" };

    if (params.fechaInicial) {
      query.fechaInicio = { $gte: new Date(params.fechaInicial) };
    }
    if (params.fechaFinal) {
      query.fechaFinal = { $lte: new Date(params.fechaFinal) };
    }

    if (params.personas > 0) {
      query.personas = params.personas;
    }
    if (params.intercambio === "false" && params.oficial === "false") {
      query.tipo = "none";
    } else if (params.intercambio != params.oficial) {
      if (params.intercambio === "true") query.tipo = "Intercambio";
      else query.tipo = "Oficial";
    }
    query.cantidad = { $gt: "0"}
    query.precio = {$lte: params.precioMaximo, $gte: params.precioMinimo}

   
    return Item.find({
      $and: [
        {
          $or: [
            { titulo: { $regex: ".*" + params.titulo + ".*" , $options : 'i'} },
            { ubicacion: { $regex: ".*" + params.titulo + ".*", $options : 'i' } },
          ],
        },
        query,
      ],
    })
}


async function searchUserItems(user, params){



  let query = {};
  let itemIds = []

    if (params.fechaInicial) {
      query.fechaInicio = { $gte: new Date(params.fechaInicial) };
    }
    if (params.fechaFinal) {
      query.fechaFinal = { $lte: new Date(params.fechaFinal) };
    }

    if (params.personas > 0) {
      query.personas = params.personas;
    }
    if (params.intercambio === true)itemIds = itemIds.concat(user.trading);
    if (params.oficial === true)itemIds = itemIds.concat(user.inventory);
    if (params.publicados === true)itemIds = itemIds.concat(user.published);

    console.log(user)

    query.precio = {$lte: params.precioMaximo, $gte: params.precioMinimo}

   
    return await Item.find({
      $and: [{ _id: { $in: itemIds } },
        {
          $or: [
            { titulo: { $regex: ".*" + params.titulo + ".*" , $options : 'i'} },
            { ubicacion: { $regex: ".*" + params.titulo + ".*", $options : 'i' } },
          ],
        },
        query,
      ],
    })
}


async function setTradeItem(userdata){

  //Decodificamos el token
  let decoded = await jwt.decode(userdata.token);


  //Si no es correcto envíamos null
  if(decoded.username !== userdata.name){
    return {
      item : null,
      message: "User missmatch",
    }
  }
 
  //Buscamos el item original
  let currentItem = await repositorioItem.findItemById(userdata._id);
  
  let itemOriginal = currentItem.original;
  if(itemOriginal===undefined) itemOriginal = currentItem._id;

  console.log(itemOriginal)
  //Construimos el nuevo item
  let item = {

    titulo: currentItem.titulo,
    ubicacion: currentItem.ubicacion,
    fechaInicio: currentItem.fechaInicio,
    imagen: currentItem.imagen,
    fechaFinal: currentItem.fechaFinal,
    descripcion: currentItem.descripcion,
    tipo: "Intercambio",
    personas: currentItem.personas,
    precio: currentItem.precio,
    propietario: userdata.name,
    cantidad: 1,
    original: itemOriginal,

  };

  //Se lo pasamos al repositorio y obtenemos el id
  let result = await repositorioItem.createItem(item);

  if(result){
    return {
      item: result,
    }
  }

  return {
    message: "Internal Server Error"
  }

  
 
  
       
        
          
            

}

module.exports = { getItems, newItem, getInventory, getValidInventory, getItem, deleteItemById,purchaseItem, searchItems , setTradeItem, getOriginalId, cancelItem, searchUserItems };
