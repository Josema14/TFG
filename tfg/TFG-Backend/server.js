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
const Trade = require("./models/Trade");

//Servicios

const itemService = require("./servicioItem");
const userService = require("./servicioUser");
const tradeService = require("./servicioTrade");
const { get } = require("mongoose");
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
            user: user.name,
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
  //Comprobar bad request

  itemService
    .newItem(request.body)
    .then((result) => {
      console.log("creando item");
      response.status(201).send({
        message: "Item Created Successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error creating item",
        error,
      });
    });
});

//GetItems
app.get("/item", (request, response) => {
  itemService
    .getItems(request.query.name)
    .then((items) => {
      response.status(200).send(items);
    })
    .catch((e) => {
      //Solo puede ocurrir un error de servidor
      response.status(500).send({
        message: "Internal Server Error",
      });
    });
});

//Recibir inventario
app.get("/inventory", (request, response) => {
  userService
    .getUsuarioPopulated(request.query.name)
    .then((resultado) => {
      let items = itemService.getInventory(resultado);
      return response.status(200).send({
        items,
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
      response.status(500).send({
        message: "Internal Server Error",
        error,
      });
    });
});

//getInventoryByMoneyandTime
//Comprobar que hace bien la fecha
app.get("/inventoryByPrice", (request, response) => {
  userService.getUsuarioPopulated(request.query.name).then((result) => {
    console.log(request.query.name + " " + request.query.price);
    let items = itemService.getValidInventory(
      result.inventory,
      request.query.price
    );
    return response.status(200).send({
      items,
    });
  });
});

//Mensajes de intercambio
app.get("/messages", (request, response) => {
  userService
    .getUsuarioByName(request.query.name)
    .then((result) => {
      tradeService
        .getMessages(result.message)
        .then((result) => {
          console.log(result);
          return response.status(200).send({
            result,
          });
        })
        .catch((error) => {
          //Fallo con los mensajes
          console.log("ERROR", error);
          return response.status(500).send({
            message: "Internal Server Error",
            error,
          });
        });
    })
    .catch((error) => {
      //Fallo con el usuario

      console.log("ERROR", error);
      return response.status(404).send({
        message: "User Not Found",
        error,
      });
    });
});

//proponerTrade
app.post("/proposeTrade", (request, response) => {
  
  tradeService.newTrade(request.body.usuarioAnfitrion,request.body._idAnfitrion,request.body.usuarioPropuesto,   request.body._idPropuesto)
  .then( (result) => {
    userService.saveTradeUsers(result.propietario,result.comprador,result._id)
    return response.status(200).send();
  }).catch( (error) => {
    //Error interno, si ha llegado hasta aquí no puede ser otro fallo
    console.log("ERROR", error);
      return response.status(500).send({
        message: "Internal Server Error",
        error,
      });
  })

  
});

app.post("/acceptTrade", (request, response) => {


  tradeService.getTrade(request.body.idTrade).then(
    (trade) => {
      tradeService.cancelTradesByProduct(trade.itemPropietario).then(
        () => {
          tradeService.acceptTrade(trade)
        }
      ).catch( (error) => {

      })
    }
  ).catch( (error) => {

  })



/*
  Trade.findById(request.body.idTrade).then((result) => {
    let trade = result;
    Trade.updateMany(
      { itemPropietario: trade.itemPropietario },
      { estado: "Cancelado" }
    )
      .then(() => {
        acceptTrade(
          trade.propietario,
          trade.comprador,
          trade.itemPropietario,
          trade.itemComprador,
          trade
        );

        return response.status(200).send();
      })
      .catch();
  });*/
});

app.post("/refuseTrade", (request, response) => {
  console.log(request.body.idTrade);
  Trade.findById(request.body.idTrade)
    .then((result) => {
      console.log(result);
      let trade = result;

      trade.estado = "Cancelado";
      trade.save().then(() => {
        return response.status(200).send();
      });
    })
    .catch();
});

//Compra
app.post("/purchase", (request, response) => {
  console.log(request.body);
  User.findOne({ email: request.body.email }).then((user) => {
    Item.findById(request.body._id)
      .then((item) => {
        console.log(user.inventory);
        for (id of user.inventory) {
          console.log(id);
          if (id.equals(item._id)) {
            response.status(500).send({
              message: "Ya posee este objeto",
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

//Búsqueda
app.post("/search", (request, response) => {
  let query = {};

  User.findOne({ email: request.body.email }).then((user) => {
    if (user !== null)
      query.propietario = { $regex: "^((?!" + user.name + ").)*$" };

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
      if (request.body.intercambio == true) query.tipo = "Intercambio";
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
});

//setChange

app.post("/setTrade", (request, response) => {
  //Hacer códigos de error

  User.findOne({ email: request.body.email })
    .then((user) => {
      //Buscamos el item original
      Item.findById(request.body._id)
        .then((itemOriginal) => {
          //Registramos el nuevo item

          const item = new Item({
            titulo: itemOriginal.titulo,
            ubicacion: itemOriginal.ubicacion,
            fechaInicio: itemOriginal.fechaInicio,
            imagen: itemOriginal.imagen,
            fechaFinal: itemOriginal.fechaFinal,
            descripcion: itemOriginal.descripcion,
            tipo: "Intercambio",
            personas: itemOriginal.personas,
            precio: itemOriginal.precio,
            propietario: user.name,
            cantidad: 1,
            original: itemOriginal._id,
          });

          //Guardamos el nuevo item

          item
            .save()
            .then((result) => {
              console.log("creando item");
              response.status(201).send({
                message: "Item Created Successfully",
                result,
              });

              //Se lo añadimos al usuario en la lista de intercambios
              user.trading.unshift(item._id);

              for (var i = 0; i < user.inventory.length; i++) {
                if (user.inventory[i].equals(itemOriginal._id)) {
                  console.log(user.inventory[i] + " " + itemOriginal._id);
                  user.inventory.splice(i, 1);
                }
              }

              user.save();
            })
            .catch((error) => {
              //console.log("ERROR", error);
              response.status(500).send({
                message: "Error creating item",
                error,
              });
            });
        })
        //Error item no existe
        .catch();
    })
    //Error usuario no existe
    .catch();
});

app.post("/cancelTrade", (request, response) => {
  //Hacer códigos de error

  User.findOne({ email: request.body.email })
    .then((user) => {
      //Buscamos el item original
      Item.findById(request.body._id)
        .then((item) => {
          //Obtenemos el objeto original
          itemOriginal = item.original;
          itemAnterior = item._id;

          //Lo borramos del usuario

          for (var i = 0; i < user.trading.length; i++) {
            if (user.trading[i].equals(itemAnterior._id)) {
              user.trading.splice(i, 1);
            }
          }
          user.inventory.unshift(item.original);
          user.save();

          item
            .delete()
            .then((result) => {
              response.status(201).send({
                message: "Item Deleted Successfully",
                result,
              });
            })
            .catch((error) => {
              //console.log("ERROR", error);
              response.status(500).send({
                message: "Error deleting item",
                error,
              });
            });
        })
        //Error item no existe
        .catch();
    })
    //Error usuario no existe
    .catch();
});



async function acceptTrade(user1, user2, _id1, _id2, trade) {
  let anfitrion = await User.findOne({ name: user1 });
  let cliente = await User.findOne({ name: user2 });
  let itemAnfitrion = await Item.findById(_id1);
  let itemOriginalID = itemAnfitrion.original;

  //Lo borramos del usuarioPropietario

  for (let i = 0; i < anfitrion.trading.length; i++) {
    console.log(anfitrion.trading[i] + " " + _id1);
    if (anfitrion.trading[i].equals(_id1)) {
      anfitrion.trading.splice(i, 1);
    }
  }
  console.log(anfitrion.trading);
  anfitrion.inventory.unshift(_id2);

  //Lo mismo con el cliente

  for (let i = 0; i < cliente.inventory.length; i++) {
    console.log(cliente.inventory + " " + _id2);
    if (cliente.inventory[i].equals(_id2)) {
      cliente.inventory.splice(i, 1);
    }
  }

  cliente.inventory.unshift(itemOriginalID);
  trade.estado = "Aceptado";
  trade.itemPropietario = itemOriginalID;

  await trade.save();
  await anfitrion.save();
  await cliente.save();

  await Item.findByIdAndDelete(_id1);
}

////Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
