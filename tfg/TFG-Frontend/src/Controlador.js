import axios from "./components/axios";


//Función de registro
export function signUp(email, user, password) {
  //Petición post con axios

  return axios.post("/register", {
    email: email,
    user: user,
    password: password,
  });
}
//Función de login
export function login(email, password) {
  //Petición post con axios
  return axios.post("/login", {
    email: email,
    password: password,
  });
}
//Función para devolver toda la lista de items
export function getItems() {
  return axios.get("/item", {
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

export function search(
  title,
  initialRange,
  finalRange,
  clients,
  trade,
  official,
  precioMinimo,
  precioMaximo,
) {

  
  //Petición post con axios
  return axios.post("/search", {
    titulo: title,
    fechaInicial: initialRange,
    fechaFinal: finalRange,
    personas: clients,
    intercambio: trade,
    oficial: official,
    name: getUsuario(),
    precioMaximo : precioMaximo,
    precioMinimo : precioMinimo
  });
}

export function getInventory(){

  return  axios.get("/inventory",{
    params: {
        name: getUsuario()
      }
    })
}

export function purchase(_id){

  return axios.post('/purchase', {
    name: getUsuario(),
    _id: _id,
  })

}

export function setTrade(_id){
  return axios
  .post("/setTrade", {
    name: getUsuario(),
    _id: _id,
  })
}

export function cancelTrade(_id){
  return axios
  .post("/cancelTrade", {
    name: getUsuario(),
    _id: _id,
  })
}

export function proposeTrade(_idAnfitrion,_idPropuesto,host){

  return axios
  .post("/proposeTrade", {
    usuarioPropuesto: getUsuario(),
    _idAnfitrion: _idAnfitrion,
    _idPropuesto: _idPropuesto,
    usuarioAnfitrion: host,
  })

}

export function itemsByPrice(price,_id){
  return axios
      .get("/inventoryByPrice", {
        params: {
          name: getUsuario(),
          price: price,
          _id: _id

        }})

}

export  function  getMessages(){

  return  axios.get("/messages",{
    params: {
        name: getUsuario()
      }
    })

}

export function aceptarIntercambio(trade){

  return axios.post("/acceptTrade", {
      idTrade : trade._id
  })


}

export function rechazarIntercambio(trade){

  console.log(trade)
  return axios.post("/refuseTrade", {
      idTrade : trade._id
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

export function getEmail() {
  //Obtenemos el email del almacenamiento local
  return localStorage.getItem("email");

  
}
