const Item = require("./models/Item");
const DIFF_MONEY = 100;
function getItems(name) {
  if (name !== "")
    return Item.find({ propietario: { $regex: "^((?!" + name + ").)*$" } });
  else return Item.find();
}

//GetItem
 function getItem(id) {
    return Item.findById(id)
}

 function deleteItemById(id) {
    return  Item.findByIdAndDelete(id);
}

async function getOriginalId(id) {
  return await getItem(id)
}

function newItem(item) {
  const newItem = new Item({
    titulo: item.titulo,
    ubicacion: item.ubicacion,
    fechaInicio: item.fechaInicio,
    imagen: item.imagen,
    fechaFinal: item.fechaFinal,
    descripcion: item.descripcion,
    tipo: item.tipo,
    personas: item.personas,
    precio: item.precio,
    propietario: item.propietario,
    cantidad: item.cantidad,
  });
  return newItem.save();
}

function getInventory(user) {
  let inventario = user.inventory;
 
  return inventario.concat(user.trading);
}

async function getValidInventory(inventory, price,_id) {
  let validItems = [];
  let repeatedItem = false;
  let dateNow = Date.now();

 let tradeItem = await getItem(_id)
  
  for (let item of inventory) {
 
    if (
      item.precio >= (Number(price) - DIFF_MONEY)&&
      item.precio <= (Number(price) + DIFF_MONEY)
    ) {
      let diffTime = Math.abs(dateNow - item.fechaInicio);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
      if(tradeItem.original.equals(item._id)){
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

async function  purchaseItem(_id){
  
  getItem(_id).then( (item) => {
   
    //Si no quedan items lanzamos excepcion
    if (item.cantidad <= 0 ) throw 'No items left'

    //Si quedan items restamos uno

    item.cantidad = item.cantidad - 1;
    item.save().then( (result) => {
      return result
    }
     
    )
    
    
  })
}

async function searchItems(params){

  let query = {};

  if (params.name !== null)
      query.propietario = { $regex: "^((?!" + params.name + ").)*$" };

    if (params.fechaInicial) {
      query.fechaInicio = { $gte: params.fechaInicial };
    }
    if (params.fechaFinal) {
      query.fechaFinal = { $lte: params.fechaFinal };
    }

    if (params.personas > 0) {
      query.personas = params.personas;
    }
    if (params.intercambio == false && params.oficial == false) {
      query.tipo = "none";
    } else if (params.intercambio != params.oficial) {
      if (params.intercambio == true) query.tipo = "Intercambio";
      else query.tipo = "oficial";
    }

    query.precio = {$lte: params.precioMaximo, $gte: params.precioMinimo}

   
    return Item.find({
      $and: [
        {
          $or: [
            { titulo: { $regex: ".*" + params.titulo + ".*" } },
            { ubicacion: { $regex: ".*" + params.titulo + ".*" } },
          ],
        },
        query,
      ],
    })
}

async function setTrade(_id, userName){
 
  let itemOriginal = await Item.findById(_id)

  const item = new Item({
    titulo: itemOriginal.titulo,
    ubicacion: itemOriginal.ubicacion,
    fechaInicio: itemOriginal.fechaInicio,
    imagen: itemOriginal.imagen,
    fechaFinal: itemOriginal.fechaFinal,
    descripcion: itemOriginal.descripcion,
    tipo: "Intercambio",
    personas: itemOriginal.personas,
    precio: itemOriginal.precio,
    propietario: userName,
    cantidad: 1,
    original: itemOriginal._id,
  });
  return item.save()
  
       
        
          
            

}

module.exports = { getItems, newItem, getInventory, getValidInventory, getItem, deleteItemById,purchaseItem, searchItems , setTrade, getOriginalId };
