import axios from "./components/axios";


//Función de registro
export function signUp(email, user, password) {
  //Petición post con axios

  return axios.post("/users", {
    email: email,
    user: user,
    password: password,
  });
}
//Función de login
export function login(email, password) {
  //Petición post con axios
  return axios.post("/users/login", {
    email: email,
    password: password,
  });
}
//Función para devolver toda la lista de items
export function getItems() {
  return axios.get("/items", {
    params: {
      name: getUsuario(),
    },
  });
}

export function addPoints(points){
    return axios.post("/user/tripPoints",{
      name: getUsuario(),
      points: points,
    })
}

export function substractPoints(points){
  return axios.post("/user/tripPoints",{
    name: getUsuario(),
    points: -points,
  })
}

export async function search(
  title,
  initialRange,
  finalRange,
  clients,
  trade,
  official,
  precioMinimo,
  precioMaximo,
) {


  //Petición get con axios
  return await axios.get("/items/search", {
    params:{
    titulo: title,
    fechaInicial: initialRange,
    fechaFinal: finalRange,
    personas: clients,
    intercambio: trade,
    oficial: official,
    token: getToken(),
    precioMaximo : precioMaximo,
    precioMinimo : precioMinimo
    }
  });
}

export async function searchUserItems(
  title,
  initialRange,
  finalRange,
  clients,
  trade,
  official,
  precioMinimo,
  precioMaximo,
  publicados,
) {


  //Petición post con axios
  return await axios.post(`/users/search`, {
    
    titulo: title,
    fechaInicial: initialRange,
    fechaFinal: finalRange,
    personas: clients,
    name: getUsuario(),
    intercambio: trade,
    oficial: official,
    token: getToken(),
    precioMaximo : precioMaximo,
    precioMinimo : precioMinimo,
    publicados: publicados
    
  });
}

export function getInventory(){

  return  axios.get(`/users/${getUsuario()}/items`,{
    params: {
        name: getUsuario(),
        token : getToken()
      }
    })
}

export function purchase(_id){

  return axios.post(`/users/items/`, {
    name: getUsuario(),
    _id: _id,
    token : getToken()
  })

}

export function setTrade(_id){
  return axios
  .post("/items/trade", {
    name: getUsuario(),
    _id: _id,
    token: getToken(),
  })
}

export function cancelTrade(_id){
  return axios
  .delete("/items/trade", {
    data:{
    name: getUsuario(),
    _id: _id,
    token: getToken()
    }
  })
}

export function proposeTrade(_idAnfitrion,_idPropuesto,host){

  return axios
  .post("/trades", {
    usuarioPropuesto: getUsuario(),
    _idAnfitrion: _idAnfitrion,
    _idPropuesto: _idPropuesto,
    usuarioAnfitrion: host,
    token: getToken(),
  })

}

export function itemsByPrice(price,_id){
  return axios
      .get(`/users/${getUsuario()}/items/${_id}`, {
        params: {
          name: getUsuario(),
          price: price,
          _id: _id,
          token: getToken()

        }})

}

export  function  getMessages(){

  return  axios.get("/users/" + getUsuario() + "/trades",{
    params: {
        name: getUsuario(),
        token: getToken()
      }
    })

}

export function aceptarIntercambio(trade){

  return axios.post("/trades/accept", {
      idTrade : trade._id
  })


}

export function rechazarIntercambio(trade){

 
  return axios.post("/trades/refuse", {
      idTrade : trade._id,
      token: getToken()
  })


}

export function getItem(id){
  return  axios.get("/items/" + id,{
    params: {
        id: id,
      
      }
    })
}

export function getUsuarioServidor(usuario){
  return axios.get("/user/" + usuario);
}

export function getUsuario() {
  //Obtenemos el usuario del almacenamiento local
  let user = localStorage.getItem("user");

  //Si es nulo lo cambiamos a vacío
  if (user === "null") {
    user = "";
  }
  return user;
}

export function updateUser(userdata){
  console.log(userdata.imageData)

  const formData = new FormData();
  
  formData.append('username', getUsuario())
  for (const property in userdata) {
    if(userdata[property] !== null)
    formData.append(property, userdata[property]);
  }

  
  
  return axios.put("/user",formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  
  
  )
}

export function uploadItem(item){
  
  
  const formData = new FormData();
  formData.append('propietario', getUsuario())
  formData.append('fechaFinal', item.fechaInicial.add(item.duracion,"day"))

  formData.append('tipo', "Oficial")
  for (const property in item) {
    if(item[property] !== null)
    formData.append(property, item[property]);
  }
  console.log(formData)

  
  
 
  return axios.post("/item", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  } )
}

export function uploadTradeItem(item){
  
  
  const formData = new FormData();
  formData.append('propietario', getUsuario())
  formData.append('fechaFinal', item.fechaInicial.add(item.duracion,"day"))

  formData.append('tipo', "Intercambio")
  for (const property in item) {
    if(item[property] !== null)
    formData.append(property, item[property]);
  }
  console.log(formData)

  
  
 
  return axios.post("/item", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  } )
}

export function getEmail() {
  //Obtenemos el email del almacenamiento local
  return localStorage.getItem("email");

  
}

export function getToken() {
  //Obtenemos el token del almacenamiento local
  return localStorage.getItem("token");

  
}
