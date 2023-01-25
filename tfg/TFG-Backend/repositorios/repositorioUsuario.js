const User = require("../models/User");
//Operaciones de creación

async function createUser(user) {
  //Creamos el usuario

  const newUser = new User(user);
  //Guardamos el usuario en la base de datos
  return await newUser.save();
}

//Operaciones de lectura
async function findUserById(id) {
  //Buscamos el usuario en la base de datos y lo devolvemos

  return await User.findById(id);
}

async function findUserByEmail(email) {
  return await User.findOne({ email: email });
}

async function findUserPopulated(name) {
  return await User.findOne({ name: name })
    .populate("inventory")
    .populate("trading")
    .exec();
}

async function findUserTradesPopulated(name) {
  return await User.findOne({ name: name }).populate([
    {
      path: "message",
      populate: {
        path: "itemComprador",
      },
    },
    {
      path: "message",
      populate: {
        path: "itemPropietario",
      },
    },
  ]);
  //.populate("message").exec()
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

async function findUserByName(username) {
  return await User.findOne({ name: username });
}

async function addPointsByName(username, points) {
  let user = await findUserByName(username);
  if (user.tripPoints == undefined) user.tripPoints = Number(points);
  else user.tripPoints += Number(points);

  if(user.tripPoints <0) user.tripPoints = 0;

  console.log(user.tripPoints);
  return await user.save();
}

async function updateUserProfileByName(username, newProfile) {
  console.log(newProfile);
  let user = await findUserByName(username);
  console.log(user);
  //newProfile = {...user.profile.toObject(),...newProfile}

  return await User.findOneAndUpdate(
    { name: username },
    { profile: newProfile },
    { setDefaultsOnInsert: true, new: true, upsert: true }
  ).exec();
}

async function findUserPublishedPopulated(username){

  return await User.findOne({ name: username })
  .populate("inventory")
  .populate("trading")
  .populate("published")
  .exec();


}



module.exports = {
  createUser,
  findUserById,
  findAllUsers,
  findUserByName,
  findUserPopulated,
  findUserTradesPopulated,
  findUserPublishedPopulated,
  deleteUserById,
  deleteUserByName,
  updateUser,
  updateUserProfileByName,
  addPointsByName,
  findUserByEmail,
};
