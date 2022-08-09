const express = require("express");
const app = express();

//Importamos cors
const cors = require("cors");
//Importamos la conexion a la BD
const bcrypt = require("bcrypt");
const dbConnect = require("./db/dbConnect")

//Importamos el schema
const User =require("./models/User")

//Conectamos con mongo

dbConnect();

const port = process.env.PORT || 5000;
app.use(cors({ origin: true, credentials: true  }));
app.use(express.json());


app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});


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
  
  app.listen(port)
/*
//Leemos la configuración 
const port = process.env.PORT || 5000;
app.use(cors({ origin: true, credentials: true  }));
app.use(express.json());
app.use(require("../routes/BD/record"));
// get driver connection
const dbo = require("./db/conn.js");
 
//Iniciamos el servidor de BD
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

*/