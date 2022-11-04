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

export function search(
  title,
  initialRange,
  finalRange,
  clients,
  trade,
  official
) {

  let email = getEmail();
  //Petición post con axios
  return axios.post("/search", {
    titulo: title,
    fechaInicial: initialRange,
    fechaFinal: finalRange,
    personas: clients,
    intercambio: trade,
    oficial: official,
    email
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
    email: getEmail(),
    _id: _id,
  })

}

export function setTrade(_id){
  return axios
  .post("/setTrade", {
    email: getEmail(),
    _id: _id,
  })
}

export function cancelTrade(_id){
  return axios
  .post("/cancelTrade", {
    email: getEmail(),
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

export function itemsByPrice(price){
  return axios
      .get("/inventoryByPrice", {
        params: {
          name: getUsuario(),
          price: price,
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

export function getUsuario() {
  //Obtenemos el usuario del almacenamiento local
  let user = localStorage.getItem("user");

  //Si es nulo lo cambiamos a vacío
  if (user === "null") {
    user = "";
  }
  return user;
}

export function getEmail() {
  //Obtenemos el email del almacenamiento local
  return localStorage.getItem("email");

  
}
