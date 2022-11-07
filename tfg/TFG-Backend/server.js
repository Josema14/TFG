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
  tradeService
    .newTrade(
      request.body.usuarioAnfitrion,
      request.body._idAnfitrion,
      request.body.usuarioPropuesto,
      request.body._idPropuesto
    )
    .then((result) => {
      userService.saveTradeUsers(
        result.propietario,
        result.comprador,
        result._id
      );
      return response.status(200).send();
    })
    .catch((error) => {
      //Error interno, si ha llegado hasta aquí no puede ser otro fallo
      console.log("ERROR", error);
      return response.status(500).send({
        message: "Internal Server Error",
        error,
      });
    });
});

app.post("/acceptTrade", (request, response) => {
  tradeService
    .getTrade(request.body.idTrade)
    .then((trade) => {
      tradeService
        .cancelTradesByProduct(trade.itemPropietario)
        .then(() => {
          tradeService.acceptTrade(trade);
        })
        .catch((error) => {});
    })
    .catch((error) => {});
});

//CancelTrade
app.post("/refuseTrade", (request, response) => {
  console.log(request.body.idTrade);

  //Cancelamos el trade
  tradeService
    .cancelTrade(request.body.idTrade)
    .then(() => {
      return response.status(200).send();
    }) //errores
    .catch((error) => {});
});

//Compra
app.post("/purchase", (request, response) => {
  //Obtenemos el usuario
  userService
    .getUsuarioByName(request.body.name)
    .then((user) => {
      //Comprobamos si ya tiene el paquete

      for (id of user.inventory) {
        if (id.equals(request.body._id)) {
          response.status(500).send({
            message: "Ya posee este objeto",
          });
          return;
        }
      }

      //Si no tiene el paquete, disminuimos la cantidad y se lo añadiremos

      //Disminuimos la cantidad del paquete

      itemService
        .purchaseItem(request.body._id)
        .then((result) => {
          console.log(result);
          //añadimos el paquete al usuario
          userService.addItem(user, request.body._id).then((result2) => {
            console.log(result2);
            response.status(201).send({
              message: "Purchase Created Successfully",
              result2,
            });
          });
        })
        .catch((error) => {});
    })
    .catch((error) => {});
});

//Búsqueda
app.post("/search", (request, response) => {
  console.log(request.body);
  itemService
    .searchItems(request.body)
    .then((result) => {
      //Devolvemos los items
      return response.status(200).send(result);
    }) //Error
    .catch((error) => {
      console.log(error);
    });
});

//setChange

app.post("/setTrade", (request, response) => {
  //Hacer códigos de error

  itemService.setTrade(request.body._id, request.body.name).then((result) => {
    userService
      .addTradeItem(request.body.name, result._id, result.original)
      .then((result) => {
        return response.status(201).send({
          message: "Item Created Successfully",
          result,
        });
      });
  });
});

app.post("/cancelTrade", (request, response) => {
  itemService.getOriginalId(request.body._id).then((result) => {
    userService.cancelTrade(
      request.body.name,
      request.body._id,
      result.original
    );
    itemService.deleteItemById(request.body._id).then((result) => {
      return response.status(201).send({
        message: "Item Deleted Successfully",
        result,
      });
    });
  });

  //Hacer códigos de error
});

////Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
