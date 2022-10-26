const express = require("express");
const app = express();

//Importamos cors
const cors = require("cors");
//Importamos la conexion a la BD
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnect = require("./db/dbConnect");
const bodyParser = require("body-parser");

//Importamos el schema
const User = require("./models/User");
const Item = require("./models/Item");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//Conectamos con mongo

dbConnect();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

//Inicio
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//Registro
app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      console.log(request.body, hashedPassword);
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        name: request.body.user,
      });

      user
        .save()
        .then((result) => {
          console.log("creando usuario");
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          if (error.code === 11000)
            response.status(400).send({
              message: "Email already in use",
              error,
            });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//Login

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              type: 1,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
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
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "EmailError",
        type: 2,
        e,
      });
    });
});

//new Item
app.post("/item", (request, response) => {
  const item = new Item({
    titulo: request.body.titulo,
    ubicacion: request.body.ubicacion,
    fechaInicio: request.body.fechaInicio,
    imagen: request.body.imagen,
    fechaFinal: request.body.fechaFinal,
    descripcion: request.body.descripcion,
    tipo: request.body.tipo,
    personas: request.body.personas,
    precio: request.body.precio,
    propietario: request.body.propietario,
    cantidad: request.body.cantidad,
  });

  item
    .save()
    .then((result) => {
      console.log("creando item");
      response.status(201).send({
        message: "Item Created Successfully",
        result,
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
      response.status(500).send({
        message: "Error creating item",
        error,
      });
    });
});
//Repasar codigos de error
//GetItems
app.get("/item", (request, response) => {
  Item.find({}).then((items) => {
    return response.status(200).send(items);
  });
});


//Compra
app.post("/purchase", (request, response) => {

  console.log(request.body)
  User.findOne({ email: request.body.email }).then((user) => {
    Item.findById(request.body._id)
      .then((item) => {

        for(id in user.inventory){
          console.log(id)
          if(id === _id){
            response.status(500).send({
              message: "Ya posee este objeto",
              result,
            });
            return;
          }
        }
  

        item.cantidad = item.cantidad - 1;
        item.save();

        user.inventory.unshift(request.body._id);

        user.save().then((result) => {
          response.status(201).send({
            message: "Purchase Created Successfully",
            result,
          });
        });
      })
      .catch((error) => {
        console.log("ERROR", error);
        response.status(500).send({
          message: "No items left",
          error,
        });
      });
  });
});

//Recibir Items
app.get("/inventory", (request, response) => {
  User.findOne({ email: request.query.email }).then((user) => {
    let items;
    const ids = user.inventory;
    Item.find()
      .where("_id")
      .in(ids)
      .exec()
      .then((result) => {
        items = result;
        console.log(result);
        return response.status(200).send({
          items,
        });
      });
  });
});

//Búsqueda
app.post("/search", (request, response) => {
  let query = {};

  if (request.body.fechaInicial) {
    query.fechaInicio = { $gte: request.body.fechaInicial };
  }
  if (request.body.fechaFinal) {
    query.fechaFinal = { $lte: request.body.fechaFinal };
  }

  if (request.body.personas > 0) {
    query.personas = request.body.personas;
  }
  if (request.body.intercambio == false && request.body.oficial == false) {
    query.tipo = "none";
  } else if (request.body.intercambio != request.body.oficial) {
    if (request.body.intercambio == true) query.tipo = "intercambio";
    else query.tipo = "oficial";
  }

  console.log(query);

  Item.find({
    $and: [
      {
        $or: [
          { titulo: { $regex: ".*" + request.body.titulo + ".*" } },
          { ubicacion: { $regex: ".*" + request.body.titulo + ".*" } },
        ],
      },
      query,
    ],
  }).then((items) => {
    return response.status(200).send(items);
  });
});

////Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
