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

async function deleteItemById(id) {
    return await Item.findByIdAndDelete(id);
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

function getValidInventory(inventory, price) {
  let validItems = [];
  let dateNow = Date.now();
  for (let item of inventory) {
    if (
      item.precio >= price - DIFF_MONEY &&
      item.precio <= price + DIFF_MONEY
    ) {
      let diffTime = Math.abs(dateNow - item.fechaInicio);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 14) {
        validItems.push(item);
      }
    }
  }

  console.log(validItems);
  return validItems;
}

module.exports = { getItems, newItem, getInventory, getValidInventory, getItem, deleteItemById };
