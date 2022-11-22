

const dbConnect = require("../db/dbConnect");
dbConnect().then( async () => {

const repositorioUsuario = require("./repositorioUsuario")

let user = {
    name: "TripTrada",
    email: "TripTrada@gmail.com",
    password: "pruebaaa"
}

let id = await repositorioUsuario.createUser(user)

console.log("usuario creado : " + id)

console.log(await repositorioUsuario.findUserById(id))
await repositorioUsuario.deleteUserById(id)







})


