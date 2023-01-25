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

async function getFullUsuarioByName(user){
  return await User.findOne({ name: user });
}

//Función para crear usuarios
async function createUser(userdata) {

  //Encriptamos la contraseña en la base de datos
  let hashedPassword = await bcrypt.hash(userdata.password, 10);

  //Una vez encriptada creamos el usuario que vamos a pasarle al repositorio
  let user = {
    email: userdata.email,
    password: hashedPassword,
    name: userdata.user,
  }
 
  //Lo enviamos al repositorio
  return await repositorioUsuario.createUser(user)
}

async function userLogin(userdata){
  //Comprobamos si existe el usuario en la BD

  let user = await repositorioUsuario.findUserByEmail(userdata.email);

  
  //Si el usuario no es nulo, comprobamos que la contraseña es la misma
if(user != null){
 if(await bcrypt.compare(userdata.password, user.password)){

    //Devolvemos una versión simplificada del usuario.

    let image = "https://picsum.photos/200";
    if (user.profile?.image != undefined) image = user.profile.image;

    //Creamos un token con jwt

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
        username : user.name,
        tripPoints : user.tripPoints,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    //Información a devolver
    let result = {
      user : user.name,
      email : user.email,
      image : image,
      points : user.tripPoints,
      token : token,
    }

    //Devolvemos el resultado

    return result;
 }
 //Si la contraseña no es la misma devolvemos null
 else return null;
}
 //Si el usuario no existe devolvemos null
else {
  return null;
}

}

async function getUsuarioPopulated(userdata) {

  //Comprobamos si el token correcto

  let decoded = await jwt.decode(userdata.token);

  let user = await repositorioUsuario.findUserPopulated(decoded.username);


  if (user) return user;
  else return null;


  //return await User.findOne({ name: user }).populate("inventory").populate("trading").exec();
}

async function getUsuarioTradesPopulated( token){

    //Comprobamos si el token correcto

    let decoded = await jwt.decode(token);

    let user = await repositorioUsuario.findUserTradesPopulated(decoded.username);
  
  
    if (user) return user;
    else return null;
}


async function getUsuarioPublishedPopulated(token){

  //Comprobamos si el token correcto

  let decoded = await jwt.decode(token);

  let user = await repositorioUsuario.findUserPublishedPopulated(decoded.username);


  if (user) return user;
  else return null;
}

async function itemPurchased(userdata){

  //Comprobamos si existe y si existe que nos lo devuelva con todos sus items
  let user = await getUsuarioPopulated(userdata);

  if(user){
    //Comprobamos que no lo tenga en ninguna lista
   
    for (item of user.inventory) {
      if (item._id.equals(userdata._id)) {
        return {
          user: null,
          message: "Ya posee este objeto en su inventario"
        };
      }
    }

    for (item of user.trading) {
      if (item.original.equals(userdata._id)) {
        return {
          user: null,
          message: "Ya posee este objeto en su inventario"
        };
      }
    }

    return {
      user: user
    }
  }

  else {
    return {
      user: null,
      message: "Internal server error"
    };
  }

  
}

async function saveTradeUsers(user1, user2, _id) {
  let anfitrion = await repositorioUsuario.findUserByName(user1)
  let cliente = await repositorioUsuario.findUserByName(user2)



  anfitrion.message.unshift(_id);
  cliente.message.unshift(_id);

 await  anfitrion.save();
 await cliente.save();

 return true;
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

async function addItem(user, _id,precio) {
 
  //Añadimos el item y restamos del monedero de puntos
  user.inventory.unshift(_id);
  user.tripPoints = user.tripPoints - precio;
  user.profile.compras +=1;
  await user.save()
  return user.tripPoints;
}

async function addPublishedItem(username, _id) {
 
  let user = await repositorioUsuario.findUserByName(username);
  
  user.published.unshift(_id);
  user.profile.publicaciones +=1;

  return await user.save()
 
}

async function acceptTradeHost(username, itemToDelete, itemToAdd){
  //Obtenemos el usuario
  let user = await repositorioUsuario.findUserByName(username);
  //Eliminamos de la lista el item que vamos a reemplazar
  for (let i = 0; i < user.trading.length; i++) {
      
    if (user.trading[i].equals(itemToDelete)) {
      user.trading.splice(i, 1);
      break;
    }
  }
  //Añadimos el nuevo item
  user.inventory.unshift(itemToAdd);
  user.profile.intercambios +=1;

  await user.save()

  
  
}

async function acceptTradeClient(username, itemToDelete, itemToAdd,estado){
  //Obtenemos el usuario
  let user = await repositorioUsuario.findUserByName(username);
  //Eliminamos de la lista el item que vamos a reemplazar

  if (estado === "Oficial")
  for (let i = 0; i < user.inventory.length; i++) {
      
    if (user.inventory[i].equals(itemToDelete)) {
      user.inventory.splice(i, 1);
      break;
    }
  }

  else{
    for (let i = 0; i < user.trading.length; i++) {
      
      if (user.trading[i].equals(itemToDelete)) {
        user.trading.splice(i, 1);
        break;
      }
    }
  }
  //Añadimos el nuevo item
  user.inventory.unshift(itemToAdd);
  user.profile.intercambios +=1;
  await user.save()

  
  
}

async function addTradeItem(userdata, newId) {
 
  //Obtenemos el usuario
  let result = await User.findOne({ name: userdata.name });

     //Le añadimos el item de intercambio
    result.trading.unshift(newId);
  

    //Le eliminamos el viaje original
    for (var i = 0; i < result.inventory.length; i++) {
      if (result.inventory[i].equals(userdata._id)) {
       
        result.inventory.splice(i, 1);
      }
    }
  
    //Devolvemos el nuevo item
    return await result.save();
  
}

async function addNewTradeItem(username, newId) {
 
  //Obtenemos el usuario
  let result = await User.findOne({ name: username});

     //Le añadimos el item de intercambio
    result.trading.unshift(newId);
  
  
    //Devolvemos el resultado
    return await result.save();
  
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

async function deleteTradeItemOriginal(username, _id, _idOriginal){

  
  //Obtenemos el usuario
  let user = await repositorioUsuario.findUserByName(username)

  
 //Lo borramos del usuario

 for (var i = 0; i < user.trading.length; i++) {
  if (user.trading[i].equals(_id)) {
    user.trading.splice(i, 1);
  }
}
//Le añadimos el original
user.inventory.unshift(_idOriginal);

//Guardamos
return await user.save();
}

async function deleteTradeItem(username, _id){

 
  //Obtenemos el usuario
  let user = await repositorioUsuario.findUserByName(username)

  console.log(user)
 //Lo borramos del usuario

 for (var i = 0; i < user.trading.length; i++) {
  if (user.trading[i].equals(_id)) {
    user.trading.splice(i, 1);
  }
}

//Guardamos
return await user.save();
}



module.exports = {
  createUser,
  getUsuarioByName,
  getUsuarioPopulated,
  getUsuarioTradesPopulated,
  saveTradeUsers,
  getUsuarioPublishedPopulated,
  addItem,
  addPublishedItem,
  acceptTradeHost,
  acceptTradeClient,
  addTradeItem,
  getFullUsuarioByName,
  deleteTradeItem,
  deleteTradeItemOriginal,
  updateProfile,
  addPoints,
  addNewTradeItem,
  userLogin,
  itemPurchased
};
