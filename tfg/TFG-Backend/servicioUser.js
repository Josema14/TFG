const User = require("./models/User");
const repositorioUsuario = require("./repositorios/repositorioUsuario")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function getUsuarioByName(user) {
  let userBD = await User.findOne({ name: user });

  //Procesamos la fecha:

  let month = userBD.date.getUTCMonth() + 1; //months from 1-12
let  day = userBD.date.getUTCDate();
let year = userBD.date.getUTCFullYear();

  newdate = day + "/" + month + "/" + year;
  let finalUser = {
    name:userBD.name,
    date: newdate,
    profile: userBD.profile

  }

  return finalUser
}

//Función para crear usuarios
async function createUser(userdata) {

  //Encriptamos la contraseña en la base de datos
  let hashedPassword = await bcrypt.hash(userdata.password, 10);

  //Una vez encriptada creamos el usuario que vamos a pasarle al repositorio
  let user = {
    email: userdata.email,
    password: hashedPassword,
    name: userdata.username,
  }
 
  //Lo enviamos al repositorio
  return await repositorioUsuario.createUser(user)
}

async function getUsuarioPopulated(user) {
  return await User.findOne({ name: user }).populate("inventory").populate("trading").exec();
}

async function saveTradeUsers(user1, user2, _id) {
  let anfitrion = await User.findOne({ name: user1 });
  let cliente = await User.findOne({ name: user2 });

  anfitrion.message.unshift(_id);
  cliente.message.unshift(_id);

  anfitrion.save();
  cliente.save();
}

async function updateProfile(data, url){

  console.log(data)
  if (url != "" && url!= undefined) data.image = url;
  let username = data.username;
  delete data.username;
  delete data.img;
  try{
  
  return await repositorioUsuario.updateUserProfileByName(username,data)
  } catch{
    (error) =>{
      console.log(error)
    }
  }
}

function addItem(user, _id) {
  console.log(user);
  user.inventory.unshift(_id);
  return user.save();
}

async function addTradeItem(user, _id, _idOriginal) {
 
  let result = await User.findOne({ name: user });

    console.log(_id)
    result.trading.unshift(_id);
    console.log(result.trading)
    for (var i = 0; i < result.inventory.length; i++) {
      if (result.inventory[i].equals(_idOriginal)) {
       
        result.inventory.splice(i, 1);
      }
    }
  
    return result.save();
  
}

async function addPoints(user, points) {
 
  return await repositorioUsuario.addPointsByName(user,points);
  
}

async function cancelTrade(userName, _id, _idOriginal){

    let user = await User.findOne({ name: userName })
   //Lo borramos del usuario

   for (var i = 0; i < user.trading.length; i++) {
    if (user.trading[i].equals(_id)) {
      user.trading.splice(i, 1);
    }
  }
  
  user.inventory.unshift(_idOriginal);
  
  return user.save();

}

module.exports = {
  createUser,
  getUsuarioByName,
  getUsuarioPopulated,
  saveTradeUsers,
  addItem,
  addTradeItem,
  cancelTrade,
  updateProfile,
  addPoints
};
