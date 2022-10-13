const express = require("express");
const app = express();

//Importamos cors
const cors = require("cors");
//Importamos la conexion a la BD
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnect = require("./db/dbConnect")
const bodyParser = require('body-parser')

//Importamos el schema
const User =require("./models/User")
const Item = require("./models/Item")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//Conectamos con mongo

dbConnect();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: true, credentials: true  }));


//Inicio
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//Registro
app.post("/register", (request, response) => {
  bcrypt.hash(request.body.password, 10)
  .then((hashedPassword) => {
    console.log(request.body,hashedPassword)
    const user = new User({
      
      email: request.body.email,
      password: hashedPassword,
      name: request.body.name,
    })
    
    user.save().then((result) => {
      console.log("creando usuario")
      response.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    .catch((error) => {
      console.log("ERROR",error)
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    });
  }
  
  )
  .catch((e) => {
    response.status(500).send({
      message: "Password was not hashed successfully",
      e,
    })
  })
  });

  //Login

  app.post("/login", (request, response) => {
    User.findOne({ email: request.body.email})
    .then((user) =>{
          bcrypt.compare(request.body.password, user.password)
      .then( (passwordCheck) => {
  
        // check if password matches
        if(!passwordCheck) {
          return response.status(400).send({
            message: "Passwords does not match",
            
          })
        }
  
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          {expiresIn: "24h"}
        );
  
        // return success response
        response.status(200).send({
          message: "Login Successful",
          email: user.email,
          token,
        });
      })
      .catch((error) => {
        response.status(400).send({
          message: "Passwords does not match",
          error,
        })
      })
  })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      })
    })
  })

  //new Item
  app.post("/item", (request, response) => {

    const item = new Item({
      
      nombre: request.body.nombre,
      ubicacion: request.body.ubicacion,
      fechaInicio:request.body.fechaInicio,
      imagen:request.body.imagen,
      duracion: request.body.duracion,
      descripcion: request.body.descripcion
    })

    item.save().then((result) => {
      console.log("creando item")
      response.status(201).send({
        message: "Item Created Successfully",
        result,
      });
    })
    .catch((error) => {
      console.log("ERROR",error)
      response.status(500).send({
        message: "Error creating item",
        error,
      });
    });
  })
  //Repasar codigos de error
  //GetItems
  app.get("/item", (request, response) => {
    Item.find({}).then((items) => {return response.status(200).send(items)})

  })
  //Compra
  app.post("/purchase", (request, response) => {
    User.findOne({ email: request.body.usuario.email})
    .then((user) =>{
      user.inventory.unshift(request.body._id)
      user.save().then((result) => {
      response.status(201).send({
        message: "Purchase Created Successfully",
        result,
      });
    })
     
    })
  })

  //Recibir Items
  app.get("/inventory", (request, response) =>{

    User.findOne({email: request.query.email})
    .then((user) =>{
      let items;
      const ids = user.inventory
      Item.find().where('_id').in(ids).exec().then((result) => {
      items = result;
        console.log(result)
        return response.status(200).send({
          items
        })
  
      })
      
     
    })
  })

  ////Listener
  app.listen(port, () => console.log(`Listening on localhost: ${port}`))