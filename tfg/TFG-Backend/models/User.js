//Clase para crear el schema de Usuario
//Importamos mongoose

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Item = require("./Item")

const ProfileSchema = mongoose.Schema({
    image: String,
    description: String,
    twitter: String,
    instagram: String,
    facebook: String,
    publicaciones: { type: Number,
        default: 0,},
    intercambios: { type: Number,
        default: 0,},
    compras:{ type: Number,
        default: 0,}
  });

//Creamos el schema
const UserSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: [true, "Introduzca un correo electrónico"],
        unique: [true, "El correo ya se encuentra registrado"],
    },

    password: {
        type: String,
        required: [true, "Introduce una contraseña"],
        unique: false,
    },

    name: {
        type: String,
        required: [true, "Introduzca un nombre"],
        unique: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },

    inventory: {
        type: [Schema.Types.ObjectId],
        ref: 'Items'

    },

    
    trading: {
        type: [Schema.Types.ObjectId],
        ref: 'Items'
    },

    published: {
        type: [Schema.Types.ObjectId],
        ref: 'Items'
    },

    message:{
        type: [Schema.Types.ObjectId],
        ref: 'Trade'
    },

    tripPoints:{
        type: Number,
        default:0,
    },

    profile: ProfileSchema

   

})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);