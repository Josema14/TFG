const User = require("./models/User");




 function getUsuarioByName(user) {
  return User.findOne({ name: user });
}

 function getUsuarioPopulated(user) {
  return User.findOne({ name: user }).populate("inventory").populate("trading");
}

async function saveTradeUsers(user1, user2, _id) {
    let anfitrion = await User.findOne({ name: user1 });
    let cliente = await User.findOne({ name: user2 });
  
    anfitrion.message.unshift(_id);
    cliente.message.unshift(_id);
  
    anfitrion.save();
    cliente.save();
  }





module.exports = { getUsuarioByName, getUsuarioPopulated,saveTradeUsers };
