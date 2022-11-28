const User = require("../models/User");
//Operaciones de creación
function createUser(user) {
  //Creamos el usuario
  const newUser = new User(user);
  //Guardamos el usuario en la base de datos
  newUser.save();

  return newUser._id
}

//Operaciones de lectura
async function findUserById(id) {
  //Buscamos el usuario en la base de datos y lo devolvemos

  return await User.findById(id);
}

async function findAllUsers() {
  //Ejecutamos una consulta vacía
  return await User.find().exec();
}
//Operaciones de borrado
function deleteUserById(id) {
  User.deleteOne({ _id: id }).exec();
}

function deleteUserByName(userName) {
  User.deleteOne({ name: userName }).exec();
}
//Operaciones de modificación

function updateUser(user) {
  //Buscamos su id y actualizamos
  User.updateOne({ _id: user._id }, user).exec();
}

async function findUserByName(username){
  return await User.findOne({name:username});
}

async function addPointsByName(username,points){
 
  let user = await findUserByName(username);
  if (user.tripPoints == undefined) user.tripPoints = Number(points);
  else user.tripPoints += Number(points);

  console.log(user.tripPoints)
  return await user.save();
  

}

async function updateUserProfileByName(username,newProfile){
  console.log(newProfile)
  let user = await findUserByName(username);
 console.log(user)
  //newProfile = {...user.profile.toObject(),...newProfile}
  
  return await User.findOneAndUpdate({ name: username }, {profile: newProfile},{  setDefaultsOnInsert: true,new: true,upsert: true, }).exec();
}

module.exports = {
    createUser,findUserById,findAllUsers,deleteUserById,deleteUserByName,updateUser, updateUserProfileByName,addPointsByName
}