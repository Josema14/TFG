const User = require("./models/User");
const repositorioUsuario = require("./repositorios/repositorioUsuario")
function getUsuarioByName(user) {
  return User.findOne({ name: user });
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

  
  if (url != "" && url!= undefined) data.image = url;
  let username = data.username;
  delete data.username;
  delete data.img;
  try{
  
  await repositorioUsuario.updateUserProfileByName(username,data)
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
  getUsuarioByName,
  getUsuarioPopulated,
  saveTradeUsers,
  addItem,
  addTradeItem,
  cancelTrade,
  updateProfile
};
