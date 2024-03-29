const Item = require("../models/Item");
//Operaciones de creación
async function createItem(item) {
  //Creamos el item
  const newItem = new Item(item);
  //Guardamos el item en la base de datos
   await newItem.save();

  return newItem._id
}

//Operaciones de lectura
async function findItemById(id) {
  //Buscamos el item en la base de datos y lo devolvemos

  return await Item.findById(id);
}

async function findAllItems() {
  //Ejecutamos una consulta vacía para obtener todos los items
  return await Item.find().exec();
}
//Operaciones de borrado
function deleteItemById(id) {
  Item.deleteOne({ _id: id }).exec();
}

//Operaciones de modificación

function updateItem(item) {
  //Buscamos su id y actualizamos
  Item.updateOne({ _id: item._id }, item).exec();
}

module.exports = {
    createItem,findItemById,findAllItems,deleteItemById,updateItem
}